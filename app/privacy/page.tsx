import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/ui/reveal';

export const metadata = { title: 'Privacy Policy' };

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly — such as name, email, shipping address and payment details when you place an order or create an account. We also collect usage data through cookies and similar technologies.',
  },
  {
    title: '2. How We Use Information',
    body: 'To process and ship orders, communicate with you about your purchases, improve the site, and — only with your consent — send marketing communications you may opt out of at any time.',
  },
  {
    title: '3. Cookies',
    body: 'We use cookies to remember your preferences, analyse site traffic and personalise content. You can control cookies through your browser settings.',
  },
  {
    title: '4. Data Sharing',
    body: 'We do not sell your personal information. We share data only with trusted partners who help us operate — payment processors, shipping carriers and analytics providers — all bound by confidentiality obligations.',
  },
  {
    title: '5. Data Security',
    body: 'We use industry-standard encryption and security measures to protect your information. Payment details are processed through certified PCI-compliant providers and never stored on our servers.',
  },
  {
    title: '6. Your Rights',
    body: 'You may access, correct or request deletion of your personal data at any time by contacting us at privacy@blossea.com.',
  },
  {
    title: '7. Children',
    body: 'The site is not intended for individuals under 16. We do not knowingly collect information from children.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" eyebrow="Legal" />
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
