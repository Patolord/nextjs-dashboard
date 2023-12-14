import Image from 'next/image';
import BudgetStatus from '@/app/ui/orcamentos/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredBudgets } from '@/app/lib/data';
import Link from 'next/link';
import { FolderOpenIcon } from '@heroicons/react/24/outline';

export default async function BudgetsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const budgets = await fetchFilteredBudgets(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {budgets?.map((budget) => (
              <div
                key={budget.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src=""
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={` client picture`}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      {budget.client_name}
                    </p>
                  </div>
                  <BudgetStatus status={budget.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/obras/${budget.id}`}>
                      <FolderOpenIcon className="w-6" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-5 font-medium sm:pl-6"
                >
                  Nº Orcamento
                </th>
                <th scope="col" className="px-5 py-5 font-medium">
                  Clientes
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nome
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-2 pr-3">
                  <span className="sr-only">Acessar Obra</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {budgets?.map((budget) => (
                <tr
                  key={budget.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{budget.ref_id}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={orcamento.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${orcamento.client_name} 's profile picture`}
                      />
                      <p>{orcamento.client_name}</p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{budget.name}</p>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <BudgetStatus status={budget.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <Link href={`/dashboard/obras/${budget.id}`}>
                        <FolderOpenIcon className="w-6" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
