import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

//FIX THIS
export default function QuoteStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'Cancelado',
          'bg-yellow-500 text-white': status === 'Em Andamento',
          'bg-blue-500 text-white': status === 'Enviado',
          'bg-green-500 text-white': status === 'Aprovado',
        },
      )}
    >
      {status === 'Cancelado' ? (
        <>
          Cancelado
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'Em Andamento' ? (
        <>
          Em Andamento
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'Enviado' ? (
        <>
          Enviado
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'Aprovado' ? (
        <>
          Aprovado
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
