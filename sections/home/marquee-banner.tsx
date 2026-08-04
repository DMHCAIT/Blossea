'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';

const items = [
  'Complimentary Express Shipping',
  '30-Day Easy Returns',
  'Hand-Finished in Limited Runs',
  'GOTS-Certified Organic Cotton',
  'Carbon-Neutral Delivery',
  'Private Studio Appointments',
];

export function MarqueeBanner() {
  return (
    <div className="overflow-hidden border-y border-ink-900/10 bg-cream-100 py-4">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center text-[11px] uppercase tracking-ultra-wide text-ink-700"
          >
            {item}
            <span className="ml-12 text-gold-400">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
