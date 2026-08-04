'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const labelMap: Record<string, string> = {
  '': 'Home',
  shop: 'Shop',
  collections: 'Collections',
  about: 'About',
  contact: 'Contact',
  wishlist: 'Wishlist',
  cart: 'Cart',
  checkout: 'Checkout',
  account: 'Account',
  login: 'Login',
  signup: 'Sign Up',
  'forgot-password': 'Forgot Password',
  search: 'Search',
  terms: 'Terms & Conditions',
  privacy: 'Privacy Policy',
  returns: 'Return Policy',
  faq: 'FAQ',
  category: 'Category',
  collection: 'Collection',
  product: 'Product',
  'order-success': 'Order Confirmed',
};

export function PageHeader({ title, eyebrow }: { title?: string; eyebrow?: string }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((seg, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/');
    const label = labelMap[seg] || decodeURIComponent(seg).replace(/-/g, ' ');
    return { href, label };
  });

  const pageTitle =
    title ||
    (segments.length === 0
      ? 'Home'
      : labelMap[segments[segments.length - 1]] ||
        decodeURIComponent(segments[segments.length - 1]).replace(/-/g, ' '));

  return (
    <section className="bg-cream-200/50 pt-28 pb-10 md:pt-32 md:pb-12">
      <div className="container-luxe">
        <nav className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest-2 text-warmgray">
          <Link href="/" className="hover:text-ink-900">Home</Link>
          {crumbs.map((c, i) => (
            <span key={c.href} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" />
              <Link
                href={c.href}
                className={`capitalize hover:text-ink-900 ${i === crumbs.length - 1 ? 'text-ink-900' : ''}`}
              >
                {c.label}
              </Link>
            </span>
          ))}
        </nav>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-serif text-4xl font-medium capitalize md:text-6xl"
        >
          {pageTitle}
        </motion.h1>
        {eyebrow && <p className="eyebrow mt-2">{eyebrow}</p>}
      </div>
    </section>
  );
}
