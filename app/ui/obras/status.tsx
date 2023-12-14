import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function ProjectStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'Planning',
          'bg-blue-500 text-white': status === 'In Progress',
          'bg-green-500 text-white': status === 'Completed',
        },
      )}
    >
      {status === 'Planning' ? (
        <>
          Planejamento
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'In Progress' ? (
        <>
          Em Andamento
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'Completed' ? (
        <>
          Completa
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
