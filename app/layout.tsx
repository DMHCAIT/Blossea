// @ts-ignore - CSS imports don't need type declarations in Next.js
import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://blossea.example'),
  title: {
    default: 'BLOSSEA — Luxury Men\'s Wear',
    template: '%s | BLOSSEA',
  },
  description:
    'Blossea is a premium men\'s fashion house crafting timeless, editorial-grade menswear. Shirts, trousers, tees and tailored pieces designed for the modern gentleman.',
  keywords: [
    'luxury menswear',
    'premium men\'s fashion',
    'designer shirts',
    'tailored trousers',
    'editorial menswear',
    'blossea',
  ],
  openGraph: {
    title: 'BLOSSEA — Luxury Men\'s Wear',
    description: 'Timeless, editorial-grade menswear for the modern gentleman.',
    type: 'website',
    siteName: 'Blossea',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
