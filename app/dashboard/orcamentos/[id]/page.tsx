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
    <main>
      {quote.name} | ID: {quote.id} | Nº Orçamento: {quote.ref_id}
      <div>
        <p>{estimated_cost_formatted}</p>
        <p>{formattedStartDate}</p>
        <p>{quote.status}</p>
        <QuoteMaterials quote={quote as any} />
        <div className="flex items-center gap-3">
          <Image
            src={quote.Client.image_url}
            className="rounded-full"
            width={28}
            height={28}
            alt={`${quote.Client.name} 's profile picture`}
          />
          <p>{quote.Client.name}</p>
        </div>
      </div>
    </main>
  );
}
