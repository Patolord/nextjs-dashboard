'use client';

import Link from 'next/link';
import {
  IdentificationIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { updateCustomer } from '@/app/lib/actions/actions';
import { CustomerType } from '@/app/lib/definitions';	


import { useEffect } from 'react';

export default function EditCustomerForm({customer}: {customer: CustomerType}) {
    const initialState = {
        message: null,
        errors: {},
    };
    const updateCustomerWithId = updateCustomer.bind(null, customer.id)
    const [state, dispatch] = useFormState(updateCustomerWithId, initialState);
    const [cnpj, setCnpj] = useState<string>(customer.cnpj);

    useEffect(() => {
        let formattedInput = cnpj.replace(/\D/g, ''); // remove non-digits

        // existing formatting logic
        if (formattedInput.length <= 2) {
            formattedInput = formattedInput;
        } else if (formattedInput.length <= 5) {
            formattedInput = `${formattedInput.slice(0, 2)}.${formattedInput.slice(
                2,
            )}`;
        } else if (formattedInput.length <= 8) {
            formattedInput = `${formattedInput.slice(0, 2)}.${formattedInput.slice(
                2,
                5,
            )}.${formattedInput.slice(5)}`;
        } else if (formattedInput.length <= 12) {
            formattedInput = `${formattedInput.slice(0, 2)}.${formattedInput.slice(
                2,
                5,
            )}.${formattedInput.slice(5, 8)}/${formattedInput.slice(8)}`;
        } else if (formattedInput.length > 12) {
            formattedInput = `${formattedInput.slice(0, 2)}.${formattedInput.slice(
                2,
                5,
            )}.${formattedInput.slice(5, 8)}/${formattedInput.slice(
                8,
                12,
            )}-${formattedInput.slice(12, 14)}`;
        }

        setCnpj(formattedInput);
    }, [cnpj]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCnpj(event.target.value);
    };

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Client Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Insira o nome do cliente
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                required
                name="name"
                type="string"
                defaultValue={customer.name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Client CNPJ */}
        <div className="mb-4">
          <label htmlFor="cnpj" className="mb-2 block text-sm font-medium">
            Insira o CNPJ
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cnpj"
                name="cnpj"
                required
                type="string"
                value={cnpj}
                onChange={handleInputChange}
                defaultValue={customer.cnpj}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.cnpj &&
              state.errors.cnpj.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/clientes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Atualizar Cliente</Button>
      </div>
    </form>
  );
}


