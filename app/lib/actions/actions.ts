'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { prisma } from '../db';

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type State2 = {
  errors?: {
    client_id?: string[];
    estimated_cost?: string[];
    status?: string[];
  };
  message?: string | null;
};


const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const QuoteFormSchema = z.object({
  id: z.number(),
  client_id: z.number({
    invalid_type_error: 'Please select a customer.',
  }), 
  name: z.string({
    invalid_type_error: 'Please select a name...',
  }),
  date: z.string(),
  ref_id: z.string(),
  estimated_cost: z.number({
    invalid_type_error: 'Please select cost',
  }), 
});



const CreateQuote = QuoteFormSchema.omit({ id: true, date: true });

/*
export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString()

  try {
    await prisma.invoices.create({
      data: {
        customer_id: customerId,
        amount: amountInCents,
        status,
        date,
      },
    });
  } catch (error) {

    return { message: 'Database Error: Failed to Create Invoice.' };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await prisma.invoices.update({
      where: { id },
      data: {
        customer_id: customerId,
        amount: amountInCents,
        status,
      },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}
 */

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


//orcarmento

export async function createQuote(prevState: State2, formData: FormData) {
  const validatedFields = CreateQuote.safeParse({
    client_id: Number(formData.get('client_id')),
    ref_id: formData.get('ref_id'),
    name: formData.get('name'),
    estimated_cost: Number(formData.get('estimated_cost')),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error); // Check the error object for more details
    return {
      
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  const { client_id, ref_id, name, estimated_cost } = validatedFields.data; 
  const date = new Date().toISOString()
  const status = 'Em Andamento';

  try {
    await prisma.quotes.create({
      data: {
        client_id: client_id,
        ref_id: ref_id,
        name: name,
        start_date: date,
        status: status,
        estimated_cost: estimated_cost
      }
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Create Orcamento.' };
  }
  revalidatePath('/dashboard/orcamentos');
  redirect('/dashboard/orcamentos');
}

//
export async function createMaterialQuote(prevState: State2, formData: FormData) {
  const validatedFields = CreateQuote.safeParse({
    client_id: Number(formData.get('client_id')),
    ref_id: formData.get('ref_id'),
    name: formData.get('name'),
    estimated_cost: Number(formData.get('estimated_cost')),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error); // Check the error object for more details
    return {
      
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  const { client_id, ref_id, name, estimated_cost } = validatedFields.data; 
  const date = new Date().toISOString()
  const status = 'Em Andamento';

  try {
    await prisma.quotes.create({
      data: {
        client_id: client_id,
        ref_id: ref_id,
        name: name,
        start_date: date,
        status: status,
        estimated_cost: estimated_cost
      }
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Create Orcamento.' };
  }
  revalidatePath('/dashboard/orcamentos');
  redirect('/dashboard/orcamentos');
}
