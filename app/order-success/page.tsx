import Link from 'next/link';
import { Check, Package, Truck, Mail } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { AnimatedText } from '@/components/ui/animated-text';

export const metadata = { title: 'Order Confirmed' };

export default function OrderSuccessPage() {
  const orderNo = 'AN-' + Math.random().toString(36).slice(2, 8).toUpperCase();

  return (
    <section className="container-luxe flex min-h-[80vh] flex-col items-center justify-center py-20 text-center">
      <Reveal direction="zoom">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-400/15">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-white">
            <Check className="h-7 w-7" />
          </div>
        </div>
      </Reveal>

      <AnimatedText
        as="h1"
        text="Thank you."
        className="mt-8 font-serif text-5xl font-medium md:text-7xl"
      />

      <Reveal direction="up" delay={0.2}>
        <p className="mt-4 max-w-md text-ink-600">
          Your order has been received and is now being crafted with care. A confirmation has been
          sent to your inbox.
        </p>
      </Reveal>

      <Reveal direction="up" delay={0.3}>
        <p className="mt-6 text-[11px] uppercase tracking-ultra-wide text-warmgray">
          Order Number
        </p>
        <p className="font-serif text-2xl">{orderNo}</p>
      </Reveal>

      <Reveal direction="up" delay={0.4}>
        <div className="mt-10 grid grid-cols-3 gap-6 border-y border-ink-900/10 py-6 text-center">
          {[
            { icon: Check, label: 'Confirmed' },
            { icon: Package, label: 'Crafting' },
            { icon: Truck, label: 'On the way' },
          ].map((s, i) => (
            <div key={s.label} className={i === 0 ? 'text-gold-400' : 'text-warmgray'}>
              <s.icon className="mx-auto h-5 w-5" />
              <p className="mt-2 text-[10px] uppercase tracking-widest-2">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.5}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/shop" className="btn-primary">Continue Shopping</Link>
          <Link href="/" className="btn-outline">Back to Home</Link>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.6}>
        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-warmgray">
          <Mail className="h-3.5 w-3.5" />
          Need help? contact@blossea.com
        </p>
      </Reveal>
    </section>
  );
}
