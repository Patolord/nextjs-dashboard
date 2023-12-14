import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/orcamentos/table';
import { CreateBudget } from '@/app/ui/orcamentos/buttons';
import { lusitana } from '@/app/ui/fonts';
import { fetchBudgetsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import BudgetsTable from '@/app/ui/orcamentos/table';

export const metadata: Metadata = {
  title: 'Orçamentos',
  description: 'Listagem de Orçamentos',
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
  const totalPages = await fetchBudgetsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Orçamentos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar orçamentos..." />
        <CreateBudget />
      </div>

      <BudgetsTable query={query} currentPage={currentPage} />

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
