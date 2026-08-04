'use client';

import { motion } from 'framer-motion';
import { Sparkles, Award, Truck, RefreshCw, Package, Leaf } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';

const features = [
  {
    icon: Sparkles,
    title: 'Premium Fabrics',
    desc: 'Only the world\'s finest natural fibres — Egyptian cotton, Belgian linen, Japanese denim.',
  },
  {
    icon: Award,
    title: 'Luxury Finish',
    desc: 'Every seam is hand-finished. Every piece inspected against a 40-point checklist.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Complimentary express shipping on every order, delivered in 2–4 business days.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    desc: '30-day no-questions returns. We arrange pickup at your door, anywhere.',
  },
  {
    icon: Package,
    title: 'Premium Packaging',
    desc: 'Each order arrives in archival-grade packaging worthy of the piece inside.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Materials',
    desc: 'GOTS-certified organic cottons, closed-loop Tencel, and traceable wool.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="container-luxe py-12 md:py-16">
      <Reveal className="text-center" direction="up">
        <p className="eyebrow">Why Blossea</p>
        <h2 className="mt-3 font-serif text-4xl font-medium md:text-6xl">
          The difference is in the detail
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {features.map((f) => (
          <StaggerItem key={f.title}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group h-full bg-cream-100 p-8 md:p-10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-cream-100 transition-colors duration-500 group-hover:bg-gold-400">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-medium">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{f.desc}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
