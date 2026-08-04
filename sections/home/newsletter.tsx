'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <section className="relative overflow-hidden bg-ink-900 py-16 text-cream-100 md:py-20 noise-overlay">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-400/20 blur-[120px]"
      />
      <div className="container-luxe relative z-10 text-center">
        <Reveal direction="up">
          <p className="eyebrow text-gold-200">The Blossea Letter</p>
        </Reveal>
        <Reveal direction="up" delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight md:text-6xl lg:text-7xl">
            First in line for what comes next.
          </h2>
        </Reveal>
        <Reveal direction="up" delay={0.2}>
          <p className="mx-auto mt-5 max-w-md text-sm text-cream-100/60 md:text-base">
            Early access to limited drops, private events and house editorials. No noise, just craft.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <form
            onSubmit={submit}
            className="mx-auto mt-10 flex max-w-md items-center gap-3 border-b border-cream-100/20 pb-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-transparent py-3 text-center text-cream-100 placeholder:text-cream-100/40 focus:outline-none md:text-left"
            />
            <button
              type="submit"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-900 transition-colors hover:bg-cream-100"
              aria-label="Subscribe"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </Reveal>

        {done && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-sm text-gold-200"
          >
            Welcome to the house. Check your inbox.
          </motion.p>
        )}
      </div>
    </section>
  );
}
