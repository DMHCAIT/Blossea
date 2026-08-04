'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/products';
import { Reveal } from '@/components/ui/reveal';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const active = testimonials[index];

  return (
    <section className="relative overflow-hidden bg-cream-200/50 py-12 md:py-16">
      <div className="container-luxe">
        <Reveal className="text-center" direction="up">
          <p className="eyebrow">Worn & Loved</p>
          <h2 className="mt-3 font-serif text-4xl font-medium md:text-6xl">
            What our clients say
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote className="mx-auto h-10 w-10 text-gold-400/40" />
          <div className="relative mt-6 min-h-[220px] md:min-h-[200px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-md p-8 text-center md:p-12"
              >
                <p className="font-serif text-xl leading-relaxed text-ink-800 md:text-2xl">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <div className="mt-7">
                  <p className="font-serif text-lg font-medium">{active.author}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-ultra-wide text-warmgray">
                    {active.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => paginate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 transition-colors hover:bg-ink-900 hover:text-cream-100"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-8 bg-gold-400' : 'w-2 bg-ink-900/20'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 transition-colors hover:bg-ink-900 hover:text-cream-100"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
