import { fetchCustomerById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Form from '@/app/ui/clientes/edit-form';

export const metadata: Metadata = {
  title: 'Editar Cliente',
  description: 'Editar Cliente',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const [customer] = await Promise.all([fetchCustomerById(id)]);

  if (!customer) {
    notFound();
  }
  return <main><Form customer={customer}/></main>;
}
