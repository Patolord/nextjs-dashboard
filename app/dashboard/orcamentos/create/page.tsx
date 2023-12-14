import Form from '@/app/ui/orcamentos/create-form';

import { fetchClientes } from '@/app/lib/data';
 
export default async function Page() {
  const clientes = await fetchClientes();
 
  return (
    <main>     
      <Form customers={clientes} />
    </main>
  );
}