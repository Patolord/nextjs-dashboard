import { fetchObraById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ver Obra',
  description: 'Ver Obra',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [obra] = await Promise.all([fetchObraById(id)]);

  if (!obra) {
    notFound();
  }
  return <main>{obra.name}</main>;
}
