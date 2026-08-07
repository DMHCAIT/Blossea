// @ts-ignore - CSS imports don't need type declarations in Next.js
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
