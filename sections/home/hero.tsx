'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { RevealText } from '@/components/ui/animated-text';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[500px] md:h-[600px] w-full overflow-hidden bg-ink-900">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/31840917/pexels-photo-31840917.jpeg?auto=compress&cs=tinysrgb&w=1920&h=2400&fit=crop"
          alt="Blossea hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-ink-900/40" />
      <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay" />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-end pb-12 text-center text-cream-100 md:pb-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="eyebrow text-gold-200"
        >
          Autumn / Winter 2026
        </motion.p>

        <h1 className="mt-6 max-w-5xl px-4 font-serif text-[14vw] font-medium leading-[0.92] tracking-tight md:text-[10vw] lg:text-[8.5rem]">
          <RevealText>Dressed in</RevealText>
          <RevealText>
            <span className="italic text-gold-200">silence.</span>
          </RevealText>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-7 max-w-md text-sm leading-relaxed text-cream-100/70 md:text-base"
        >
          Editorial menswear cut from the world&apos;s finest natural fibres.
          Crafted in limited runs. Made to be lived in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link href="/shop" className="btn-luxe bg-cream-100 text-ink-900 hover:bg-gold-400 hover:text-ink-900">
            Shop the Collection
          </Link>
          <Link
            href="/collections"
            className="btn-luxe border border-cream-100/40 text-cream-100 hover:bg-cream-100 hover:text-ink-900"
          >
            Explore Collections
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-cream-100/60"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-ultra-wide">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
