'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';
import { Reveal } from '@/components/ui/reveal';

export function FeaturedCategories() {
  return (
    <section className="container-luxe py-12 md:py-16">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
        <Reveal direction="left">
          <p className="eyebrow">The Wardrobe</p>
          <h2 className="mt-3 font-serif text-4xl font-medium md:text-6xl">
            Four pillars of dressing
          </h2>
        </Reveal>
        <Reveal direction="right" delay={0.15}>
          <Link
            href="/shop"
            className="link-underline text-[11px] uppercase tracking-ultra-wide text-ink-700"
          >
            View all categories
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <Reveal key={cat.slug} direction="up" delay={i * 0.1}>
            <Link
              href={`/category/${cat.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-md bg-cream-200"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition-transform duration-1000 ease-luxury group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-cream-100">
                <p className="text-[10px] uppercase tracking-ultra-wide text-cream-100/70">
                  {cat.tagline}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-medium">{cat.name}</h3>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-100/15 backdrop-blur transition-all duration-500 group-hover:bg-gold-400 group-hover:text-ink-900">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <motion.div
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gold-400 transition-transform duration-700 ease-luxury group-hover:scale-x-100"
              />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
