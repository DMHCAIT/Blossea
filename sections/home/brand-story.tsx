'use client';

import Image from 'next/image';
import { motion, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Reveal } from '@/components/ui/reveal';
import { AnimatedText, RevealText } from '@/components/ui/animated-text';
import Link from 'next/link';
import { useScrollSafe } from '@/hooks/use-scroll-safe';

function BrandStoryContent() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScrollSafe({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '12%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink-900 py-16 text-cream-100 md:py-20 noise-overlay">
      <motion.div
        style={{ y }}
        className="absolute inset-0 scale-110"
        aria-hidden
      >
        <Image
          src="https://images.pexels.com/photos/36731337/pexels-photo-36731337.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Blossea workshop"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/70 to-transparent" />

      <div className="container-luxe relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal direction="up">
            <p className="eyebrow text-gold-200">The House</p>
          </Reveal>
          <AnimatedText
            as="h2"
            text="Built on patience, cut by hand."
            className="mt-5 font-serif text-4xl font-medium leading-tight md:text-6xl lg:text-7xl"
            delay={0.1}
          />
          <Reveal direction="up" delay={0.3}>
            <p className="mt-7 max-w-md text-sm leading-relaxed text-cream-100/70 md:text-base">
              Blossea was founded on a single belief — that menswear should be made the slow
              way. We source the world&apos;s finest natural fibres, cut in small runs, and finish
              every seam by hand. No seasons wasted. No shortcuts taken.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.4}>
            <div className="mt-9 flex flex-wrap gap-x-12 gap-y-6">
              {[
                { num: '12', label: 'Years of craft' },
                { num: '40k+', label: 'Men dressed' },
                { num: '100%', label: 'Natural fibres' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl text-gold-200 md:text-4xl">{stat.num}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-ultra-wide text-cream-100/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.5}>
            <Link href="/about" className="btn-luxe mt-10 border border-cream-100/40 text-cream-100 hover:bg-cream-100 hover:text-ink-900">
              Our Story
            </Link>
          </Reveal>
        </div>

        <Reveal direction="right" delay={0.2} className="relative hidden aspect-[4/5] overflow-hidden rounded-md lg:block">
          <Image
            src="https://images.pexels.com/photos/2974110/pexels-photo-2974110.jpeg?auto=compress&cs=tinysrgb&w=940&h=1180&fit=crop"
            alt="Blossea craft"
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 rounded-md bg-ink-900/70 p-5 backdrop-blur-md">
            <RevealText className="font-serif text-lg text-cream-100">
              Mumbai Studio
            </RevealText>
            <p className="mt-1 text-[10px] uppercase tracking-ultra-wide text-cream-100/60">
              Est. 2014
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function BrandStory() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <div className="py-16 md:py-20" />;
  return <BrandStoryContent />;
}
