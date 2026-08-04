import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/ui/reveal';
import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@/data/products';

export const metadata = { title: 'Collections' };

export default function CollectionsPage() {
  return (
    <>
      <PageHeader title="Collections" eyebrow="Curated Collections" />
      <section className="container-luxe py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, i) => (
            <Reveal key={collection.slug} direction="up" delay={i * 0.1}>
              <Link
                href={`/collection/${collection.slug}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-ink-900/20 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center text-cream-100">
                  <p className="text-[11px] uppercase tracking-ultra-wide text-gold-200">{collection.tagline}</p>
                  <h3 className="mt-3 font-serif text-2xl font-medium md:text-3xl">{collection.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed opacity-90">{collection.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
