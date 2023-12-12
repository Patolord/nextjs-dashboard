import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | RLP Dashboard',
    default: 'RLP Dashboard',
  },
  description: 'RLP Dashboard',
  robots: 'noindex, nofollow',
  metadataBase: new URL('https://app.rlpeng.com.br'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
