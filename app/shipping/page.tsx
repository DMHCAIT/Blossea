import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/ui/reveal';

export const metadata = { title: 'Shipping Information' };

export default function ShippingInfoPage() {
  return (
    <>
      <PageHeader title="Shipping Information" eyebrow="Delivery" />
      <section className="container-luxe py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <Reveal direction="up">
            <h2 className="font-serif text-3xl font-medium">Complimentary express shipping</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600 md:text-base">
              Every order ships free, worldwide. Each piece is hand-finished, so dispatch takes
              1–3 business days before your order begins its journey.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl font-medium">Delivery times</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-600 md:text-base">
              <li>• India: 2–4 business days</li>
              <li>• North America & Europe: 5–9 business days</li>
              <li>• Rest of world: 7–14 business days</li>
            </ul>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h2 className="font-serif text-3xl font-medium">Duties & taxes</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600 md:text-base">
              For international orders, duties and taxes are calculated and displayed at checkout,
              so there are no surprises on delivery.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
