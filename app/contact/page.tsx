'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/ui/reveal';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <PageHeader title="Contact" eyebrow="Get in Touch" />
      <section className="container-luxe py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <Reveal direction="up">
              <h2 className="font-serif text-3xl font-medium md:text-5xl">
                Let&apos;s talk.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-600 md:text-base">
                Questions about an order, a private fitting, or a press enquiry — we&apos;re here
                and we answer fast.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <ul className="mt-10 space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'contact@blossea.com' },
                  { icon: Phone, label: 'Phone', value: '+91 22 1234 5678' },
                  { icon: MapPin, label: 'Studio', value: 'Sultanpur, Delhi 110070' },
                  { icon: Clock, label: 'Hours', value: 'Mon–Sat, 10:00 — 19:00 IST' },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-cream-200 text-gold-400">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-ultra-wide text-warmgray">{item.label}</p>
                      <p className="mt-1 font-serif text-lg">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.2}>
            <form onSubmit={submit} className="rounded-md border border-ink-900/10 bg-cream-50 p-7 md:p-9">
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 rounded-md bg-gold-400/10 px-4 py-3 text-sm text-gold-600"
                >
                  Thank you — your message has been received. We&apos;ll reply within 24 hours.
                </motion.p>
              )}
              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest-2 text-warmgray">Name</span>
                  <input
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    required
                    className="mt-1.5 w-full border border-ink-900/15 bg-cream-100 py-3 text-sm focus:border-gold-400 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest-2 text-warmgray">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    required
                    className="mt-1.5 w-full border border-ink-900/15 bg-cream-100 py-3 text-sm focus:border-gold-400 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest-2 text-warmgray">Subject</span>
                  <input
                    value={form.subject}
                    onChange={(e) => set('subject', e.target.value)}
                    required
                    className="mt-1.5 w-full border border-ink-900/15 bg-cream-100 py-3 text-sm focus:border-gold-400 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest-2 text-warmgray">Message</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    required
                    rows={5}
                    className="mt-1.5 w-full resize-none border border-ink-900/15 bg-cream-100 py-3 text-sm focus:border-gold-400 focus:outline-none"
                  />
                </label>
                <button type="submit" className="btn-primary w-full">
                  Send Message <Send className="ml-2 h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
