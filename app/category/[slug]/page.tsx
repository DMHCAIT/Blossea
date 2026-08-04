import { Suspense } from 'react';
import { ProductListing } from '@/components/listing/product-listing';
import { PageHeader } from '@/components/layout/page-header';
import { categories } from '@/data/products';
import { notFound } from 'next/navigation';

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
      <PageHeader title={cat.name} eyebrow={cat.tagline} />
      <Suspense fallback={<div className="container-luxe py-20">Loading…</div>}>
        <ProductListing
          title={cat.name}
          eyebrow={cat.tagline}
          description={`Explore the full ${cat.name.toLowerCase()} edit from the house.`}
          filterCategory={cat.slug}
        />
      </Suspense>
    </>
  );
}
