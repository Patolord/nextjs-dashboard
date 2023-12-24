import { fetchQuoteById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { QuoteMaterials } from '@/app/ui/orcamentos/details/orcamentosmateriais';
import { formatCurrency } from '@/app/lib/utils';
import { CreateQuote } from '@/app/ui/orcamentos/buttons';

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
    <main className="rounded-lg bg-white p-6 shadow-md">
       <h1 className="text-xl font-semibold text-gray-800">
        {quote.name} | {quote.ref_id}PRC
      </h1>
      <div className="mt-4 flex items-center gap-3">
        <Image
          src={quote.Client.image_url}
          className="rounded-full"
          width={28}
          height={28}
          alt={`${quote.Client.name} 's profile picture`}
        />
        <p className="font-medium text-gray-600">{quote.Client.name}</p>
      </div>
     
      <p className="text-gray-600">{formattedStartDate}</p>

      <div className="mt-4">
        <p className="font-medium text-gray-700">{estimated_cost_formatted}</p>

        <p className="text-blue-500">{quote.status}</p>
        <div className="mt-4">
          <QuoteMaterials quote={quote as any} />
        </div>
        <CreateQuote />
      </div>
    </main>
  );
}
