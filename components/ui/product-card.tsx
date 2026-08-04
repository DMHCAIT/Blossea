'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useShop } from '@/components/providers/shop-context';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

export function ProductCard({
  product,
  index = 0,
  className,
  priority = false,
}: {
  product: Product;
  index?: number;
  className?: string;
  priority?: boolean;
}) {
  const { toggleWishlist, isWishlisted, addToCart } = useShop();
  const wishlisted = isWishlisted(product.id);
  const [hovered, setHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[Math.floor(product.sizes.length / 2)], product.colors[0].name, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn('group relative', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-cream-200">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, 25vw"
            priority={priority}
            className={cn(
              'object-cover transition-all duration-1000 ease-luxury',
              hovered && product.hoverImage ? 'scale-105 opacity-0' : 'scale-100 opacity-100',
            )}
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={product.name}
              fill
              sizes="(max-width:768px) 100vw, 25vw"
              className={cn(
                'absolute inset-0 object-cover transition-all duration-1000 ease-luxury',
                hovered ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
              )}
            />
          )}

          {product.badge && (
            <div className="absolute left-3 top-3 z-10">
              <span className="inline-block bg-ink-900/90 px-3 py-1 text-[9px] uppercase tracking-ultra-wide text-cream-100 backdrop-blur">
                {product.badge}
              </span>
            </div>
          )}

          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
              }}
              aria-label="Toggle wishlist"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur transition-all duration-300 hover:bg-white',
                wishlisted ? 'text-gold-400' : 'text-ink-900',
              )}
            >
              <Heart className={cn('h-4 w-4', wishlisted && 'fill-gold-400')} />
            </button>
          </div>

          <div
            className={cn(
              'absolute inset-x-3 bottom-3 z-10 flex translate-y-3 gap-2 opacity-0 transition-all duration-500 ease-luxury group-hover:translate-y-0 group-hover:opacity-100',
            )}
          >
            <button
              onClick={handleQuickAdd}
              className="flex flex-1 items-center justify-center gap-2 bg-ink-900/95 py-3 text-[10px] uppercase tracking-ultra-wide text-cream-100 backdrop-blur transition-colors hover:bg-gold-400"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Quick Add
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="flex items-center justify-center bg-white/90 px-4 text-ink-900 backdrop-blur transition-colors hover:bg-white"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest-2 text-warmgray">
              {product.fabric}
            </p>
            <h3 className="mt-1 truncate font-serif text-[15px] font-medium text-ink-900">
              {product.name}
            </h3>
            <div className="mt-1.5 flex items-center gap-1">
              <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
              <span className="text-[11px] text-ink-500">{product.rating}</span>
              <span className="text-[11px] text-warmgray">({product.reviewsCount})</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-serif text-[15px] font-medium text-ink-900">
              {formatPrice(product.price, product.currency)}
            </p>
            {product.compareAt && (
              <p className="text-[11px] text-warmgray line-through">
                {formatPrice(product.compareAt, product.currency)}
              </p>
            )}
          </div>
        </div>

        <div className="mt-2.5 flex gap-1.5">
          {product.colors.slice(0, 5).map((c) => (
            <span
              key={c.name}
              className="h-3 w-3 rounded-full border border-ink-900/10"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-[10px] text-warmgray">+{product.colors.length - 5}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
