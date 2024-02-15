import Table from '@/app/ui/materiais/table';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import MateriaisTable from '@/app/ui/materiais/table';
import { CreateMaterial } from '@/app/ui/materiais/buttons';
import Search from '@/app/ui/search';

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
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar materiais..." />
        <CreateMaterial />
      </div>

      <MateriaisTable />
   
    </div>
  );
}
