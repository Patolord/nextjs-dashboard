import Form from '@/app/ui/orcamentos/create-form';

import { fetchClients } from '@/app/lib/data';
 
export default async function Page() {
  const clients = await fetchClients();
 
  return (
    <main>     
        aa
      <Form clients={clients} />
    </main>
  );
}