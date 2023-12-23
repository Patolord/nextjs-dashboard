import { fetchQuoteById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { QuoteMaterials } from '@/app/ui/orcamentos/details/orcamentosmateriais';
import { formatCurrency } from '@/app/lib/utils';

export const metadata: Metadata = {
  title: 'Ver Orçamento',
  description: 'Ver Orçamento',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id: number = parseInt(params.id);
  const [quote] = await Promise.all([fetchQuoteById(id)]);

  if (!quote) {
    notFound();
  }

  const formattedStartDate = quote.start_date.toLocaleDateString('PT-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const estimated_cost_formatted = formatCurrency(quote.estimated_cost);

  return (
<main className="bg-white shadow-md rounded-lg p-6">

    <h1 className="text-xl font-semibold text-gray-800">{quote.name} | Nº Orçamento: {quote.ref_id}</h1>
    <div className="flex items-center gap-3 mt-4">
            <Image
                src={quote.Client.image_url}
                className="rounded-full"
                width={28}
                height={28}
                alt={`${quote.Client.name} 's profile picture`}
            />
            <p className="font-medium text-gray-800">{quote.Client.name}</p>
        </div>
    <div className="mt-4">
        <p className="text-gray-700 font-medium">{estimated_cost_formatted}</p>
        <p className="text-gray-600">{formattedStartDate}</p>
        <p className="text-blue-500">{quote.status}</p>
        <div className="mt-4">
            <QuoteMaterials quote={quote as any} />
        </div>
        
    </div>
</main>

  );
}
