import { Suspense } from 'react';
import { ProductListing } from '@/components/listing/product-listing';
import { PageHeader } from '@/components/layout/page-header';

export const metadata = { title: 'Shop All' };

export default function ShopPage() {
  return (
    <>
      <PageHeader />
      <Suspense fallback={<div className="container-luxe py-20">Loading…</div>}>
        <ProductListing
          title="The Complete Edit"
          eyebrow="Shop All"
          description="Every piece in the house, in one place. Filter by category, collection, fabric and fit to find your next staple."
        />
      </Suspense>
    </>
  );
}
