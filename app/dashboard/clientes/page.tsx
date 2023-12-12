import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import ClientesTable from '@/app/ui/clientes/table';
import { CreateCliente } from '@/app/ui/clientes/buttons';
import { lusitana } from '@/app/ui/fonts';
import { fetchClientesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clientes',
  description: 'Listagem de Clientes',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchClientesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Clientes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar clientes..." />
        <CreateCliente />
      </div>

      <ClientesTable query={query} currentPage={currentPage} />

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
