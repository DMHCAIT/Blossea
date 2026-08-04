'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Lock, CreditCard, Truck, ArrowRight } from 'lucide-react';
import { useShop } from '@/components/providers/shop-context';
import { formatPrice } from '@/lib/format';
import { PageHeader } from '@/components/layout/page-header';
import { cn } from '@/lib/utils';

const steps = ['Contact', 'Shipping', 'Payment'];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useShop();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const shipping = cartTotal > 200 ? 0 : 15;
  const tax = Math.round(cartTotal * 0.08);
  const total = cartTotal + shipping + tax;

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    router.push('/order-success');
  };

  if (cart.length === 0) {
    return (
      <>
        <PageHeader title="Checkout" />
        <section className="container-luxe py-24 text-center">
          <p className="font-serif text-2xl">Your cart is empty</p>
          <Link href="/shop" className="btn-primary mt-6">Explore the Shop</Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Checkout" eyebrow="Secure Checkout" />
      <section className="container-luxe py-10 md:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
          <div>
            {/* Stepper */}
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={s} className="flex flex-1 items-center gap-2">
                  <div
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-full border text-xs transition-colors',
                      i <= step ? 'border-gold-400 bg-gold-400 text-white' : 'border-ink-900/20 text-warmgray',
                    )}
                  >
                    {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <span className={cn('text-[11px] uppercase tracking-widest-2', i <= step ? 'text-ink-900' : 'text-warmgray')}>
                    {s}
                  </span>
                  {i < steps.length - 1 && <div className="h-px flex-1 bg-ink-900/10" />}
                </div>
              ))}
            </div>

            <form onSubmit={placeOrder} className="mt-8 space-y-6">
              {step === 0 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <Field label="Email" type="email" value={form.email} onChange={(v) => set('email', v)} required />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name" value={form.firstName} onChange={(v) => set('firstName', v)} required />
                    <Field label="Last Name" value={form.lastName} onChange={(v) => set('lastName', v)} required />
                  </div>
                  <button type="button" onClick={next} className="btn-primary w-full">
                    Continue to Shipping <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <Field label="Address" value={form.address} onChange={(v) => set('address', v)} required />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="City" value={form.city} onChange={(v) => set('city', v)} required />
                    <Field label="ZIP / Postal Code" value={form.zip} onChange={(v) => set('zip', v)} required />
                  </div>
                  <Field label="Country" value={form.country} onChange={(v) => set('country', v)} required />
                  <div className="flex gap-3">
                    <button type="button" onClick={back} className="btn-outline">Back</button>
                    <button type="button" onClick={next} className="btn-primary flex-1">
                      Continue to Payment <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="flex items-center gap-2 rounded-md bg-cream-200/50 px-4 py-3 text-xs text-ink-600">
                    <Lock className="h-3.5 w-3.5 text-gold-400" />
                    Encrypted & secure. We never store your card details.
                  </div>
                  <Field label="Name on Card" value={form.cardName} onChange={(v) => set('cardName', v)} required />
                  <Field
                    label="Card Number"
                    value={form.cardNumber}
                    onChange={(v) => set('cardNumber', v)}
                    placeholder="1234 5678 9012 3456"
                    required
                    icon={<CreditCard className="h-4 w-4" />}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry" value={form.expiry} onChange={(v) => set('expiry', v)} placeholder="MM / YY" required />
                    <Field label="CVC" value={form.cvc} onChange={(v) => set('cvc', v)} placeholder="123" required />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={back} className="btn-outline">Back</button>
                    <button type="submit" className="btn-primary flex-1">
                      Place Order — {formatPrice(total)}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-md border border-ink-900/10 bg-cream-50 p-6">
            <h2 className="font-serif text-xl">Order Summary</h2>
            <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {cart.map((item) => (
                <li key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                  <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden rounded bg-cream-200">
                    <Image src={item.product.images[0]} alt="" fill sizes="56px" className="object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink-900 px-1 text-[10px] text-cream-100">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="font-serif text-sm">{item.product.name}</p>
                    <p className="text-warmgray">{item.color} · {item.size}</p>
                  </div>
                  <span className="text-xs">{formatPrice(item.product.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-ink-900/10 pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-warmgray">Subtotal</dt><dd>{formatPrice(cartTotal)}</dd></div>
              <div className="flex justify-between">
                <dt className="flex items-center gap-1 text-warmgray"><Truck className="h-3 w-3" /> Shipping</dt>
                <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between"><dt className="text-warmgray">Tax</dt><dd>{formatPrice(tax)}</dd></div>
              <div className="flex justify-between border-t border-ink-900/10 pt-2 font-serif text-lg">
                <dt>Total</dt><dd>{formatPrice(total)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest-2 text-warmgray">{label}</span>
      <div className="relative mt-1.5">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warmgray">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={cn(
            'w-full border border-ink-900/15 bg-cream-100 py-3 text-sm focus:border-gold-400 focus:outline-none',
            icon && 'pl-10',
          )}
        />
      </div>
    </label>
  );
}
