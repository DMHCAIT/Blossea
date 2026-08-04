import { ProductDetails } from '@/components/product/product-details';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Product' };
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();
  return <ProductDetails />;
}
