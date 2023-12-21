import { fetchQuoteById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ver Orçamento',
  description: 'Ver Orçamento',
};

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const [quote] = await Promise.all([fetchQuoteById(id)]);

  if (!quote) {
    notFound();
  }
  return <main>{quote.name}</main>;
}
