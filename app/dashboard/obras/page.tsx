import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/obras/table';
import { CreateProject } from '@/app/ui/obras/buttons';
import { lusitana } from '@/app/ui/fonts';
import { fetchProjectsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import ProjectsTable from '@/app/ui/obras/table';

export const metadata: Metadata = {
  title: 'Obras',
  description: 'Listagem de Obras',
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
  const totalPages = await fetchProjectsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Obras</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar obras..." />
        <CreateProject />
      </div>

      <ProjectsTable query={query} currentPage={currentPage} />

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
