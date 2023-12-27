'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '../db';


export type ClientState = {
    errors?: {
      name?: string[];
      cnpj?: string[];
    };
    message?: string | null;
  };
  
 const ClientFormSchema = z.object({
    id: z.number(),
    name: z.string({invalid_type_error: 'Please select a name'}).min(2, {
      message: 'Nome Inválido',
    }), 
    cnpj: z.string({invalid_type_error: 'Please Select a cnpj'}).refine((value) => {
      const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
      return cnpjRegex.test(value);
    }, {
      message: 'CNPJ Inválido.',
    }).refine(async (value) => {
      const existingClient = await prisma.clients.findFirst({
        where: {
          cnpj: value,
        },
      });
      return !existingClient;
    }, {
      message: 'CNPJ must be unique.',
    }),  
  });
  
  const CreateClient = ClientFormSchema.omit({ id: true});

export async function createClient(prevState: ClientState, formData: FormData) {
  
    try{
    const validatedFields = await CreateClient.parseAsync({
      name: formData.get('name'),
      cnpj: formData.get('cnpj'),
    
    });
  
    const { name, cnpj } = validatedFields;
    const cleanCNPJ = cnpj.replace(/[^\d]+/g,'');

    let image_url = '/clients/default.png';  
  
      await prisma.clients.create({
        data: {
          name: name,
          cnpj: cleanCNPJ,
          image_url: image_url,
        },
      });
    } catch (error: any) {
  
      return {
        errors: error.flatten().fieldErrors,      
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
    revalidatePath('/dashboard/clientes');
    redirect('/dashboard/clientes');
  }