'use client';

import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { useState } from 'react';

const footerLinks = {
  Shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Shirts', href: '/category/shirts' },
    { label: 'T-Shirts', href: '/category/t-shirts' },
    { label: 'Pants', href: '/category/pants' },
    { label: 'Trousers', href: '/category/trousers' },
  ],
  Collections: [
    { label: 'Daily Wear', href: '/collection/daily-wear' },
    { label: 'Party Wear', href: '/collection/party-wear' },
    { label: 'Luxury Collection', href: '/collection/luxury-collection' },
    { label: 'Summer Collection', href: '/collection/summer-collection' },
    { label: 'Winter Collection', href: '/collection/winter-collection' },
    { label: 'Festive Collection', href: '/collection/festive-collection' },
  ],
  Client: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Returns', href: '/returns' },
    { label: 'Wishlist', href: '/wishlist' },
  ],
  Legal: [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Return Policy', href: '/returns' },
    { label: 'Shipping Info', href: '/faq' },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer className="relative overflow-hidden bg-ink-900 text-cream-100 noise-overlay">
      <div className="container-luxe relative z-10 pt-20">
        <div className="grid grid-cols-1 gap-12 pb-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4" direction="up">
            <Link href="/" className="font-serif text-2xl tracking-[0.3em]">
              BLOSSEA<span className="text-gold-400">·</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-100/60">
              A house of timeless menswear. Cut from the world's finest natural fibres and
              finished by hand in limited runs.
            </p>
            <div className="mt-7 flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/15 transition-colors hover:border-gold-400 hover:text-gold-400"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>

          {Object.entries(footerLinks).map(([title, links], i) => (
            <Reveal key={title} className="lg:col-span-2" direction="up" delay={0.1 + i * 0.05}>
              <p className="eyebrow mb-5 text-gold-200">{title}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream-100/70 transition-colors hover:text-gold-400 link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="border-t border-cream-100/10 py-10" direction="up">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-md">
              <p className="eyebrow text-gold-200">The House Letter</p>
              <p className="mt-2 font-serif text-xl">
                Early access to collections, private events and editorial.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full border-b border-cream-100/20 bg-transparent py-3 text-sm text-cream-100 placeholder:text-cream-100/40 focus:border-gold-400 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-luxe bg-gold-400 text-ink-900 hover:bg-cream-100"
              >
                {subscribed ? 'Welcome' : 'Subscribe'}
                {!subscribed && <ArrowUpRight className="ml-1 h-3.5 w-3.5" />}
              </button>
            </form>
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream-100/10 py-7 text-[11px] uppercase tracking-widest-2 text-cream-100/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Blossea. All rights reserved.</p>
          <p>Designed in Delhi · Crafted for the world</p>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-serif text-[22vw] leading-none text-cream-100/[0.03]"
      >
        BLOSSEA
      </div>
    </footer>
  );
}
