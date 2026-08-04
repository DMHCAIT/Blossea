'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ui/product-card';
import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/ui/reveal';

export default function SearchPage() {
  const params = useSearchParams();
  const q = params.get('q') || '';

  const results = q
    ? products.filter((p) =>
        (p.name + p.fabric + p.category + p.collections.join(' ') + p.description)
          .toLowerCase()
          .includes(q.toLowerCase()),
      )
    : [];

  return (
    <>
      <PageHeader title={`Search: ${q || '—'}`} eyebrow="Results" />
      <section className="container-luxe py-10 md:py-14">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search className="h-12 w-12 text-warmgray" />
            <p className="mt-6 font-serif text-2xl">
              {q ? `No results for "${q}"` : 'Type something to search'}
            </p>
            <p className="mt-2 text-sm text-warmgray">
              Try a category, fabric, or product name.
            </p>
            <Link href="/shop" className="btn-primary mt-8">Browse All Products</Link>
          </div>
        ) : (
          <>
            <Reveal direction="up">
              <p className="text-sm text-warmgray">
                {results.length} result{results.length > 1 ? 's' : ''} for{' '}
                <span className="text-ink-900">&ldquo;{q}&rdquo;</span>
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} priority={i < 4} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
