'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getBestSellers, getNewArrivals } from '@/data/products';
import { ProductCard } from '@/components/ui/product-card';
import { Reveal } from '@/components/ui/reveal';

export function BestSellers() {
  const products = getBestSellers().slice(0, 4);
  return (
    <section className="container-luxe py-12 md:py-16">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
        <Reveal direction="left">
          <p className="eyebrow">Loved by Many</p>
          <h2 className="mt-3 font-serif text-4xl font-medium md:text-6xl">Best sellers</h2>
        </Reveal>
        <Reveal direction="right" delay={0.1}>
          <Link
            href="/shop?sort=popular"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-ultra-wide text-ink-700"
          >
            Shop all bestsellers
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}

export function NewArrivals() {
  const products = getNewArrivals().slice(0, 8);
  return (
    <section className="bg-cream-200/40 py-12 md:py-16">
      <div className="container-luxe">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <Reveal direction="left">
            <p className="eyebrow">Just Landed</p>
            <h2 className="mt-3 font-serif text-4xl font-medium md:text-6xl">New arrivals</h2>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <Link
              href="/shop?sort=newest"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-ultra-wide text-ink-700"
            >
              View all new
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
