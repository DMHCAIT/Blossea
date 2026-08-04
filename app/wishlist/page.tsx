'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useShop } from '@/components/providers/shop-context';
import { formatPrice } from '@/lib/format';
import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/ui/reveal';
import { motion } from 'framer-motion';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  return (
    <>
      <PageHeader title="Wishlist" eyebrow="Saved Pieces" />
      <section className="container-luxe py-10 md:py-14">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-200">
              <Heart className="h-8 w-8 text-warmgray" />
            </div>
            <p className="mt-6 font-serif text-2xl">Your wishlist is empty</p>
            <p className="mt-2 text-sm text-warmgray">
              Tap the heart on any piece to save it for later.
            </p>
            <Link href="/shop" className="btn-primary mt-8">
              Discover Pieces
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
            {wishlist.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link href={`/product/${p.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-cream-200">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="(max-width:768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(p);
                      }}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gold-400 backdrop-blur"
                      aria-label="Remove from wishlist"
                    >
                      <Heart className="h-4 w-4 fill-gold-400" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-[15px] font-medium">{p.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest-2 text-warmgray">{p.fabric}</p>
                    </div>
                    <span className="font-serif text-[15px]">{formatPrice(p.price)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(p, p.sizes[Math.floor(p.sizes.length / 2)], p.colors[0].name, 1);
                    }}
                    className="btn-outline mt-3 w-full"
                  >
                    Add to Cart
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
