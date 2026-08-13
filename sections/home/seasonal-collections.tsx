'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { collections } from '@/data/products';
import { Reveal } from '@/components/ui/reveal';
import { useScrollSafe } from '@/hooks/use-scroll-safe';

export function SeasonalCollections() {
  const seasonal = collections.filter((c) => c.season !== 'all');
  return (
    <section className="container-luxe py-12 md:py-16">
      <Reveal className="text-center" direction="up">
        <p className="eyebrow">By Season</p>
        <h2 className="mt-3 font-serif text-4xl font-medium md:text-6xl">
          Dressed for the calendar
        </h2>
      </Reveal>

      <div className="mt-14 space-y-5 md:space-y-7">
        {seasonal.map((col, i) => (
          <SeasonalRow key={col.slug} collection={col} reverse={i % 2 === 1} index={i} />
        ))}
      </div>
    </section>
  );
}

function SeasonalRowContent({
  collection,
  reverse,
  index,
}: {
  collection: (typeof collections)[number];
  reverse: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScrollSafe({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <Reveal direction="up" delay={index * 0.05}>
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        <Link
          href={`/collection/${collection.slug}`}
          className="group grid grid-cols-1 overflow-hidden rounded-md bg-cream-200 lg:grid-cols-2"
        >
        <div
          className={`relative aspect-[4/3] overflow-hidden lg:aspect-auto ${
            reverse ? 'lg:order-2' : ''
          }`}
        >
          <motion.div style={{ y }} className="absolute inset-[-10%]">
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 ease-luxury group-hover:scale-105"
            />
          </motion.div>
        </div>
        <div
          className={`flex flex-col justify-center p-8 md:p-14 lg:p-20 ${
            reverse ? 'lg:order-1' : ''
          }`}
        >
          <p className="eyebrow">{collection.tagline}</p>
          <h3 className="mt-3 font-serif text-4xl font-medium md:text-5xl lg:text-6xl">
            {collection.name}
          </h3>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-600 md:text-base">
            {collection.description}
          </p>
          <div className="mt-8">
            <span className="btn-outline group-hover:bg-ink-900 group-hover:text-cream-100">
              Explore the Collection
            </span>
          </div>
        </div>
      </Link>
      </div>
    </Reveal>
  );
}

function SeasonalRow({
  collection,
  reverse,
  index,
}: {
  collection: (typeof collections)[number];
  reverse: boolean;
  index: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <div className="h-48" />;
  return <SeasonalRowContent collection={collection} reverse={reverse} index={index} />;
}
