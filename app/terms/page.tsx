import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/ui/reveal';

export const metadata = { title: 'Terms & Conditions' };

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using the Blossea website, you agree to be bound by these Terms & Conditions and all applicable laws. If you do not agree, please do not use the site.',
  },
  {
    title: '2. Products & Pricing',
    body: 'All products are subject to availability. We reserve the right to limit quantities and to change pricing without notice. Colors and fabrics may vary slightly from their on-screen representation.',
  },
  {
    title: '3. Orders',
    body: 'Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order. Accepted orders are confirmed by email. Each piece is hand-finished and may take 2–4 business days to dispatch.',
  },
  {
    title: '4. Shipping',
    body: 'Complimentary express shipping is included on every order. Delivery times are estimates and may vary by location. Risk of loss passes to the buyer upon delivery.',
  },
  {
    title: '5. Returns',
    body: 'Unworn pieces with tags intact may be returned within 30 days of delivery for a full refund. Please refer to our Return Policy for full details.',
  },
  {
    title: '6. Intellectual Property',
    body: 'All content on this site — including imagery, copy, logos and design — is the property of Blossea and may not be reproduced without written consent.',
  },
  {
    title: '7. Privacy',
    body: 'Your use of the site is also governed by our Privacy Policy, which describes how we collect and use your information.',
  },
  {
    title: '8. Modifications',
    body: 'We may update these terms at any time. Continued use of the site after changes constitutes acceptance of the revised terms.',
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms & Conditions" eyebrow="Legal" />
      <section className="container-luxe py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Reveal direction="up">
            <p className="text-sm text-warmgray">Last updated: August 2026</p>
          </Reveal>
          <div className="mt-10 space-y-10">
            {sections.map((s, i) => (
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
