'use client';

import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteCustomer } from '@/app/lib/actions/actions';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { useState, useTransition } from 'react';
import {Toaster, toast} from 'sonner'

export function CreateClient() {
  return (
    <Link
      href="/dashboard/clientes/novo"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Novo Cliente</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCustomer({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/clientes/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCustomer({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

 // const deleteCustomerWithId = deleteCustomer.bind(null, id);

  return (<>
      <button
        disabled={isPending}
        onClick={() => startTransition(() => {
          return deleteCustomer(id).then((response) => {
            if (response.success === false) {
              toast.error('Cliente possui Projetos, Orçamentos ou Contratos!')
              return undefined;
            }
            toast.success('Cliente deletado com sucesso!')
            return undefined;
          });
        })}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        {isPending && (
          <TrashIcon className="w-5 text-red-500" />
        )}
        {!isPending && <span className="sr-only">Delete</span> && (
          <TrashIcon className="w-5" />
        )}
      </button>
      <div>
      <Toaster richColors position='top-right' />
      
    </div>
      
      </>
  
  );
}
