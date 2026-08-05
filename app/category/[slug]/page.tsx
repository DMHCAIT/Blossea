import { Suspense } from 'react';
import Image from 'next/image';
import { ProductListing } from '@/components/listing/product-listing';
import { categories } from '@/data/products';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) return { title: 'Category' };
  return { title: cat.name, description: cat.tagline };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) notFound();

  return (
    <>
      <section className="relative h-[340px] md:h-[420px] w-full overflow-hidden bg-ink-900">
        <div className="absolute inset-0">
          <Image src={cat.image} alt={cat.name} fill sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-ink-900/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-cream-100 px-6">
          {cat.tagline && <p className="eyebrow text-gold-200">{cat.tagline}</p>}
          <h1 className="mt-4 font-serif text-4xl font-medium md:text-6xl">{cat.name}</h1>
        </div>
      </section>

      <Suspense fallback={<div className="container-luxe py-20">Loading…</div>}>
        <ProductListing
          title={cat.name}
          eyebrow={cat.tagline}
          description={`Explore the full ${cat.name.toLowerCase()} edit from the house.`}
          hideHeader
          filterCategory={cat.slug}
        />
      </Suspense>
    </>
  );
}
