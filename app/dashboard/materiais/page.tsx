import Table from '@/app/ui/materiais/table';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import MateriaisTable from '@/app/ui/materiais/table';

export const metadata: Metadata = {
  title: 'Materiais',
  description: 'Listagem de materiais',
};

export default async function Page() {

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Materiais</h1>
      </div>

      <MateriaisTable />
   
    </div>
  );
}
