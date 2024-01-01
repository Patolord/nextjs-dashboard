import Image from 'next/image';
import { fetchFilteredClients } from '@/app/lib/data';
import Link from 'next/link';
import { Cog6ToothIcon, TrashIcon } from '@heroicons/react/24/outline';
import { UpdateCustomer, DeleteCustomer } from './buttons';


export default async function ClientsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const clients = await fetchFilteredClients(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {clients?.map((client) => (
              <div
                key={client.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={client.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${client.name} client picture`}
                      />
                      {client.name}
                    </div>
                    <p className="text-sm text-gray-500">{client.cnpj}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                  <UpdateCustomer id={client.id} />
                  <DeleteCustomer id={client.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-5 py-5 font-medium">
                  Construtoras
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  CNPJ
                </th>

                <th scope="col" className="relative py-3 pl-2 pr-3">
                  <span className="sr-only">Acessar Cliente</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clients?.map((client) => (
                <tr
                  key={client.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={client.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${client.name}'s profile picture`}
                      />
                      <p>{client.name}</p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                  <p>{`${client.cnpj.toString().slice(0, 2)}.${client.cnpj.toString().slice(2, 5)}.${client.cnpj.toString().slice(5, 8)}/${client.cnpj.toString().slice(8, 12)}-${client.cnpj.toString().slice(12)}`}</p>
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCustomer id={client.id} />
                      <DeleteCustomer id={client.id} />
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
