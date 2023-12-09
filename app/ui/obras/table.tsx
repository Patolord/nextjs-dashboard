import Image from 'next/image';
import ObraStatus from '@/app/ui/obras/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredObras } from '@/app/lib/data';

export default async function ObrasTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const obras = await fetchFilteredObras(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {obras?.map((obra) => (
              <div
                key={obra.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className="text-xl font-medium">{obra.project_name}</p>
                      <Image
                        src={obra.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${obra.project_name}'s profile picture`}
                      />
                      <p>{obra.client_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{obra.client_id}</p>
                  </div>
                  <ObraStatus status={obra.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(obra.date_of_start)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Construtoras
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nº de Obra
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nome
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Data de Inicio
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {obras?.map((obra) => (
                <tr
                  key={obra.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={obra.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${obra.client_name}'s profile picture`}
                      />
                      <p>{obra.client_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{obra.ref_id}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{obra.project_name}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{formatDateToLocal(obra.date_of_start)}</p>
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <ObraStatus status={obra.status} />
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
