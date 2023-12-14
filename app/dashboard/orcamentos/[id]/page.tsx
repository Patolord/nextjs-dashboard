import { fetchBudgetById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ver Orçamento',
  description: 'Ver Orçamento',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [budget] = await Promise.all([fetchBudgetById(id)]);

  if (!budget) {
    notFound();
  }
  return <main>{budget.name}</main>;
}
