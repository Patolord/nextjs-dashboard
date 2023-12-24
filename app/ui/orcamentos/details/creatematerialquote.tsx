'use client';

import { ClientsField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CurrencyDollarIcon,
  NewspaperIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createQuote } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ clients }: { clients: ClientsField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createQuote, initialState);
  
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="client" className="mb-2 block text-sm font-medium">
            Selecione o cliente
          </label>
          <div className="relative">
            <select
              id="client"
              name="client_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="client-error"
            >
              <option value="" disabled>
                Selecione o cliente
              </option>
              {clients?.map((client) => (
                <option key={client.id} value={Number(client.id)}>
                  {client.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.client_id &&
              state.errors.client_id?.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error} 
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Insira o nome do orçamento
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"            
                placeholder="Insira o nome do orçamento"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <NewspaperIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="ref_id" className="mb-2 block text-sm font-medium">
          Insira o número do orçamento
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="ref_id"
                name="ref_id"
                type="string"
                placeholder="Insira o número do orçamento"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <NewspaperIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="estimated_cost" className="mb-2 block text-sm font-medium">
          Insira o custo do orçamento
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="estimated_cost"
                name="estimated_cost"
                type="number"
                step="0.01"
                placeholder="Insira o custo do orçamento"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
   
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/orcamentos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Criar Orçamento</Button>
      </div>
    </form>
  );
}
