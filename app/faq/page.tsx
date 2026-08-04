'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

const faqs = [
  {
    cat: 'Orders & Shipping',
    items: [
      { q: 'How long does delivery take?', a: 'Complimentary express shipping delivers in 2–4 business days within India and 5–9 business days internationally. Each piece is hand-finished, so dispatch may take 1–3 business days.' },
      { q: 'Do you ship internationally?', a: 'Yes — we ship to over 60 countries. Duties and taxes are calculated at checkout for a hassle-free delivery.' },
      { q: 'Can I track my order?', a: 'Absolutely. A tracking link is emailed the moment your order ships, and is also available in your account under Orders.' },
      { q: 'Can I change or cancel my order?', a: 'Within 2 hours of placing it, yes. Contact us at orders@blossea.com and we\'ll do our best to intercept it before dispatch.' },
    ],
  },
  {
    cat: 'Returns & Exchanges',
    items: [
      { q: 'What is your return policy?', a: 'Unworn pieces with tags intact may be returned within 30 days for a full refund. Free pickup is arranged at your door — see our Return Policy page for details.' },
      { q: 'Can I exchange for a different size?', a: 'The fastest way is to return the original and place a new order. This avoids waiting for stock to arrive back at the studio.' },
      { q: 'When will I get my refund?', a: 'Refunds are processed within 5–7 business days of us receiving your return, to the original payment method.' },
    ],
  },
  {
    cat: 'Products & Care',
    items: [
      { q: 'How do I find my size?', a: 'Each product page has a size guide with measurements in inches and centimetres. If you\'re between sizes, we recommend sizing up for a relaxed fit or down for a tailored one.' },
      { q: 'How should I care for my pieces?', a: 'Care instructions are on every product page and on the care label inside each garment. Most pieces prefer cold washes and air drying.' },
      { q: 'Are your fabrics sustainable?', a: 'We use GOTS-certified organic cotton, closed-loop Tencel, and traceable wool. All our fibres are natural and biodegradable.' },
      { q: 'Do you make pieces in limited runs?', a: 'Yes. Every collection is produced in small batches to reduce waste and maintain quality. Once a run sells out, it rarely returns.' },
    ],
  },
  {
    cat: 'Account & Privacy',
    items: [
      { q: 'Do I need an account to order?', a: 'No, but an account lets you track orders, save your wishlist and check out faster. It takes seconds to create one.' },
      { q: 'How is my data protected?', a: 'We use industry-standard encryption and never sell your information. See our Privacy Policy for full details.' },
    ],
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>('0-0');

  return (
    <>
      <PageHeader title="FAQ" eyebrow="Help Centre" />
      <section className="container-luxe py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Reveal direction="up">
            <p className="font-serif text-xl text-ink-700 md:text-2xl">
              Answers to the questions we hear most.
            </p>
          </Reveal>

          <div className="mt-10 space-y-12">
            {faqs.map((group, gi) => (
              <Reveal key={group.cat} direction="up" delay={gi * 0.05}>
                <p className="eyebrow mb-4">{group.cat}</p>
                <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
                  {group.items.map((item, ii) => {
                    const key = `${gi}-${ii}`;
                    const isOpen = open === key;
                    return (
                      <div key={key}>
                        <button
                          onClick={() => setOpen(isOpen ? null : key)}
                          className="flex w-full items-center justify-between gap-4 py-5 text-left"
                        >
                          <span className="font-serif text-lg md:text-xl">{item.q}</span>
                          <ChevronDown
                            className={cn(
                              'h-5 w-5 flex-shrink-0 transition-transform duration-300',
                              isOpen && 'rotate-180 text-gold-400',
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="pb-5 text-sm leading-relaxed text-ink-600 md:text-base">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="up" delay={0.2} className="mt-14 rounded-md bg-cream-200/50 p-8 text-center">
            <p className="font-serif text-2xl">Still have questions?</p>
            <p className="mt-2 text-sm text-warmgray">We answer fast — usually within a few hours.</p>
            <a href="/contact" className="btn-primary mt-6 inline-block">Contact Us</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
