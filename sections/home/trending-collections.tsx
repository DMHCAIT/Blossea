'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/products';
import { Reveal } from '@/components/ui/reveal';

export function TrendingCollections() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-25%']);

  return (
    <section className="overflow-hidden bg-ink-900 py-12 text-cream-100 md:py-16 noise-overlay">
      <div className="container-luxe relative z-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal direction="left">
            <p className="eyebrow text-gold-200">Trending Now</p>
            <h2 className="mt-3 font-serif text-4xl font-medium md:text-6xl">
              Collections in motion
            </h2>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <p className="max-w-sm text-sm text-cream-100/60">
              Six curated edits, each telling its own story of fabric, form and occasion.
            </p>
          </Reveal>
        </div>
      </div>

      <motion.div
        ref={trackRef}
        style={{ x }}
        className="mt-14 flex gap-5 pl-5 pr-[25%] md:pl-12 md:pr-[25%] lg:gap-7"
      >
        {collections.map((col, i) => (
          <Link
            key={col.slug}
            href={`/collection/${col.slug}`}
            className="group relative aspect-[4/5] w-[78vw] flex-shrink-0 overflow-hidden rounded-md sm:w-[52vw] md:w-[34vw] lg:w-[26vw]"
          >
            <Image
              src={col.image}
              alt={col.name}
              fill
              sizes="40vw"
              className="object-cover transition-transform duration-1000 ease-luxury group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-ink-900/10" />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <span className="self-end rounded-full bg-cream-100/15 px-3 py-1 text-[10px] uppercase tracking-ultra-wide backdrop-blur">
                0{i + 1}
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-ultra-wide text-gold-200">
                  {col.tagline}
                </p>
                <h3 className="mt-1 font-serif text-3xl font-medium">{col.name}</h3>
                <p className="mt-2 max-w-[14rem] text-xs text-cream-100/60 line-clamp-2">
                  {col.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-ultra-wide text-cream-100/80 transition-colors group-hover:text-gold-200">
                  Discover <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
