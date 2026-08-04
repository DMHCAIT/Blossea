import { Suspense } from 'react';
import { ProductListing } from '@/components/listing/product-listing';
import { PageHeader } from '@/components/layout/page-header';
import { collections } from '@/data/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const col = collections.find((c) => c.slug === params.slug);
  if (!col) return { title: 'Collection' };
  return { title: col.name, description: col.description };
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const col = collections.find((c) => c.slug === params.slug);
  if (!col) notFound();

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={col.image}
          alt={col.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink-900/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center text-cream-100">
          <p className="eyebrow text-gold-200">{col.tagline}</p>
          <h1 className="mt-3 font-serif text-5xl font-medium md:text-7xl">{col.name}</h1>
          <p className="mt-4 max-w-md text-sm text-cream-100/70">{col.description}</p>
        </div>
      </section>
      <Suspense fallback={<div className="container-luxe py-20">Loading…</div>}>
        <ProductListing
          title={col.name}
          eyebrow={col.tagline}
          filterCollection={col.slug}
        />
      </Suspense>
    </>
  );
}
