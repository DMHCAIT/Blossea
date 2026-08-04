import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/ui/reveal';
import { AnimatedText } from '@/components/ui/animated-text';
import { Sparkles, Leaf, Award, Heart } from 'lucide-react';

export const metadata = { title: 'About Us', description: 'The story of Blossea.' };

export default function AboutPage() {
  return (
    <>
      <PageHeader title="The House" eyebrow="About Blossea" />

      <section className="container-luxe py-14 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal direction="right" className="relative aspect-[4/5] overflow-hidden rounded-md">
            <Image
              src="https://images.pexels.com/photos/4614235/pexels-photo-4614235.jpeg?auto=compress&cs=tinysrgb&w=940&h=1180&fit=crop"
              alt="Blossea craft"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <AnimatedText
              as="h2"
              text="Made the slow way."
              className="font-serif text-4xl font-medium leading-tight md:text-6xl"
            />
            <Reveal direction="up" delay={0.2}>
              <p className="mt-6 text-sm leading-relaxed text-ink-600 md:text-base">
                Blossea began in 2014 in a small Mumbai studio with one belief — that menswear
                should be made the slow way. We source the world&apos;s finest natural fibres, cut in
                small runs, and finish every seam by hand.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p className="mt-4 text-sm leading-relaxed text-ink-600 md:text-base">
                We don&apos;t chase trends. We make pieces designed to outlast them — garments that
                earn their place in a wardrobe over years, not seasons.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
                {[
                  { num: '2014', label: 'Founded' },
                  { num: '40k+', label: 'Men dressed' },
                  { num: '100%', label: 'Natural fibres' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-serif text-3xl text-gold-400 md:text-4xl">{s.num}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-ultra-wide text-warmgray">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink-900 py-20 text-cream-100 md:py-28 noise-overlay">
        <div className="container-luxe relative z-10">
          <Reveal className="text-center" direction="up">
            <p className="eyebrow text-gold-200">Our Principles</p>
            <h2 className="mt-3 font-serif text-4xl font-medium md:text-6xl">What we stand for</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Sparkles, title: 'Considered Design', desc: 'Every silhouette is sketched, draped and refined before a single cut is made.' },
              { icon: Award, title: 'Master Craft', desc: 'Our tailors train for years. Every seam is hand-finished and inspected.' },
              { icon: Leaf, title: 'Natural Fibres', desc: 'Egyptian cotton, Belgian linen, Japanese denim. Only the best of nature.' },
              { icon: Heart, title: 'Made to Last', desc: 'We design for years, not seasons. Every piece is built to be lived in.' },
            ].map((p, i) => (
              <Reveal key={p.title} direction="up" delay={i * 0.1}>
                <div className="rounded-md border border-cream-100/10 p-7">
                  <p.icon className="h-7 w-7 text-gold-400" />
                  <h3 className="mt-5 font-serif text-2xl">{p.title}</h3>
                  <p className="mt-3 text-sm text-cream-100/60">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luxe py-20 md:py-28">
        <Reveal className="text-center" direction="up">
          <p className="eyebrow">The Studio</p>
          <h2 className="mt-3 font-serif text-4xl font-medium md:text-6xl">Where it happens</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {[
            'https://images.pexels.com/photos/4614217/pexels-photo-4614217.jpeg?auto=compress&cs=tinysrgb&w=940&h=700&fit=crop',
            'https://images.pexels.com/photos/4614256/pexels-photo-4614256.jpeg?auto=compress&cs=tinysrgb&w=940&h=700&fit=crop',
            'https://images.pexels.com/photos/15059780/pexels-photo-15059780.jpeg?auto=compress&cs=tinysrgb&w=940&h=700&fit=crop',
          ].map((src, i) => (
            <Reveal key={i} direction="up" delay={i * 0.1} className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image src={src} alt={`Studio ${i + 1}`} fill sizes="33vw" className="object-cover" />
            </Reveal>
          ))}
        </div>
        <Reveal direction="up" delay={0.3} className="mt-12 text-center">
          <Link href="/shop" className="btn-primary">Explore the Collection</Link>
        </Reveal>
      </section>
    </>
  );
}
