import Image from 'next/image';
import ObraStatus from '@/app/ui/obras/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchMaterials } from '@/app/lib/data';
import Link from 'next/link';
import { FolderOpenIcon } from '@heroicons/react/24/outline';

export default async function MateriaisTable() {
  const materiais = await fetchMaterials();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {materiais?.map((material) => (
              <div
                key={material.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-2 flex items-center">                      
                    ID: {material.id} | {material.name}
                    </div>
                    <p className="text-sm text-gray-500"> {material.description} | {material.unit}</p>
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
                  ID
                </th>
                <th scope="col" className="px-5 py-5 font-medium">
                  Nome
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Unidade
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-3 py-5 font-medium"
                >
                  Descricão
                </th>
               
            
              </tr>
            </thead>
            <tbody className="bg-white">
              {materiais?.map((material) => (
                <tr
                  key={material.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{material.id}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                     
                      <p>{material.name}</p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{material.unit}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{material.description}</p>
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
