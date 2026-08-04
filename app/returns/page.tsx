import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/ui/reveal';
import { RefreshCw, Truck, Package, ShieldCheck } from 'lucide-react';

export const metadata = { title: 'Return Policy' };

export default function ReturnsPage() {
  return (
    <>
      <PageHeader title="Return Policy" eyebrow="Easy Returns" />
      <section className="container-luxe py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <Reveal direction="up">
            <p className="font-serif text-2xl leading-relaxed text-ink-700 md:text-3xl">
              We want you to love every piece. If something isn&apos;t right, you have 30 days to
              return it — no questions asked.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: RefreshCw, title: '30 Days', desc: 'From delivery date' },
              { icon: Truck, title: 'Free Pickup', desc: 'Arranged at your door' },
              { icon: Package, title: 'Original Condition', desc: 'Unworn, tags intact' },
              { icon: ShieldCheck, title: 'Full Refund', desc: 'Within 5–7 business days' },
            ].map((item, i) => (
              <Reveal key={item.title} direction="up" delay={i * 0.08}>
                <div className="rounded-md border border-ink-900/10 bg-cream-50 p-6 text-center">
                  <item.icon className="mx-auto h-7 w-7 text-gold-400" />
                  <h3 className="mt-4 font-serif text-lg">{item.title}</h3>
                  <p className="mt-1 text-xs text-warmgray">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 space-y-8">
            {[
              { title: 'How to Return', body: 'Log in to your account, find the order, and click "Return Item". We\'ll arrange a free pickup at your chosen time. Alternatively, email returns@blossea.com with your order number.' },
              { title: 'Eligibility', body: 'Pieces must be unworn, unwashed, and returned with all original tags and packaging. Innerwear, altered pieces and final-sale items are not eligible for return.' },
              { title: 'Refunds', body: 'Once we receive and inspect your return, a refund is issued to the original payment method within 5–7 business days. Shipping charges are non-refundable.' },
              { title: 'Exchanges', body: 'Need a different size or colour? Return the original piece and place a new order — this is the fastest way to get what you want.' },
              { title: 'Damaged or Incorrect Items', body: 'If you receive a damaged or incorrect item, contact us within 48 hours and we\'ll make it right immediately.' },
            ].map((s, i) => (
              <Reveal key={i} direction="up" delay={i * 0.05}>
                <h2 className="font-serif text-2xl font-medium">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 md:text-base">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
