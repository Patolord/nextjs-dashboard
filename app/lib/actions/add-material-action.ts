'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '../db';

export type MaterialState = {
  errors?: {
    name?: string[];
    unit?: string[];
    category?: string[];
    description?: string[];
  };
  message?: string | null;
};

const MaterialFormSchema = z.object({
  id: z.number(),
  name: z.string({ invalid_type_error: 'Please select a name' }).min(2, {
    message: 'Nome Inválido',
  }),
  unit: z.string({ invalid_type_error: 'Please select a name' }).min(2, {
    message: 'Nome Inválido',
  }),
  category: z.string(),
  description: z.string(),
});

const CreateMaterial = MaterialFormSchema.omit({ id: true });

export async function createMaterial(
  prevState: MaterialState,
  formData: FormData,
) {
  try {
    const validatedFields = await CreateMaterial.parseAsync({
      name: formData.get('name'),
      unit: formData.get('unit'),
      description: formData.get('description'),
      category: formData.get('category'),
    });

    const { name, unit, description, category } = validatedFields;

    await prisma.materials.create({
      data: {
        name: name,
        unit: unit,
        description: description,
        category: category,
      },
    });
  } catch (error: any) {
    return {
      errors: error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Material.',
    };
  }
  revalidatePath('/dashboard/materiais');
  redirect('/dashboard/materiais');
}
