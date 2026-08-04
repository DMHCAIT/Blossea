'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  Truck,
  RefreshCw,
  Ruler,
  Star,
  ChevronDown,
  Check,
  Minus,
  Plus,
  ArrowRight,
  X,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { useShop } from '@/components/providers/shop-context';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/ui/product-card';
import { Reveal } from '@/components/ui/reveal';

export function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const { addToCart, toggleWishlist, isWishlisted, addRecentlyViewed } = useShop();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>('description');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) addRecentlyViewed(product);
  }, [product, addRecentlyViewed]);

  useEffect(() => {
    setActiveImage(0);
    setSelectedColor(0);
    setSelectedSize(null);
    setQty(1);
  }, [slug]);

  if (!product) return null;

  const related = getRelatedProducts(product, 4);
  const wishlisted = isWishlisted(product.id);
  const sizeError = !selectedSize;

  const handleAdd = () => {
    if (!selectedSize) {
      setOpenSection('description');
      return;
    }
    addToCart(product, selectedSize, product.colors[selectedColor].name, qty);
  };

  const handleZoomMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-luxe py-8 md:py-12">
        <nav className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest-2 text-warmgray">
          <Link href="/" className="hover:text-ink-900">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="capitalize hover:text-ink-900">
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-ink-900">{product.name}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 md:flex-row">
            <div className="flex gap-3 md:flex-col">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    'relative aspect-[3/4] w-20 overflow-hidden rounded-md border transition-all md:w-24',
                    activeImage === i ? 'border-gold-400' : 'border-transparent opacity-60 hover:opacity-100',
                  )}
                >
                  <Image src={img} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
            <div
              ref={imgRef}
              className="relative flex-1 aspect-[3/4] overflow-hidden rounded-md bg-cream-200"
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onMouseMove={handleZoomMove}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                  style={
                    zoomed
                      ? {
                          transform: `scale(1.8)`,
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        }
                      : undefined
                  }
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300"
                  />
                </motion.div>
              </AnimatePresence>
              {product.badge && (
                <span className="absolute left-4 top-4 z-10 bg-ink-900/90 px-3 py-1 text-[9px] uppercase tracking-ultra-wide text-cream-100 backdrop-blur">
                  {product.badge}
                </span>
              )}
              <span className="absolute bottom-4 right-4 z-10 rounded-full bg-ink-900/60 px-3 py-1 text-[9px] uppercase tracking-ultra-wide text-cream-100 backdrop-blur">
                Hover to zoom
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="lg:py-4">
            <p className="text-[10px] uppercase tracking-ultra-wide text-warmgray">
              {product.fabric}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-medium md:text-5xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      'h-3.5 w-3.5',
                      s <= Math.round(product.rating)
                        ? 'fill-gold-400 text-gold-400'
                        : 'text-ink-900/20',
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-warmgray">
                {product.rating} · {product.reviewsCount} reviews
              </span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-medium">{formatPrice(product.price)}</span>
              {product.compareAt && (
                <span className="text-base text-warmgray line-through">
                  {formatPrice(product.compareAt)}
                </span>
              )}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-ink-600">{product.description}</p>

            {/* Color */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-ultra-wide">Color</p>
                <p className="text-xs text-warmgray">{product.colors[selectedColor].name}</p>
              </div>
              <div className="mt-3 flex gap-2.5">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(i)}
                    title={c.name}
                    className={cn(
                      'h-9 w-9 rounded-full border transition-all',
                      selectedColor === i
                        ? 'ring-2 ring-gold-400 ring-offset-2 ring-offset-cream-100'
                        : 'border-ink-900/15',
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-ultra-wide">Size</p>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest-2 text-warmgray hover:text-ink-900"
                >
                  <Ruler className="h-3.5 w-3.5" /> Size Guide
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={cn(
                      'min-w-12 border px-4 py-2.5 text-sm transition-all',
                      selectedSize === s
                        ? 'border-ink-900 bg-ink-900 text-cream-100'
                        : 'border-ink-900/15 hover:border-ink-900/50',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-xs text-red-600"
                >
                  Please select a size
                </motion.p>
              )}
            </div>

            {/* Qty + Add */}
            <div className="mt-7 flex gap-3">
              <div className="flex items-center border border-ink-900/20">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center"
                  aria-label="Decrease"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-12 w-12 items-center justify-center"
                  aria-label="Increase"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button onClick={handleAdd} className="btn-primary flex-1">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={cn(
                  'flex h-12 w-12 items-center justify-center border transition-colors',
                  wishlisted
                    ? 'border-gold-400 bg-gold-400 text-white'
                    : 'border-ink-900/20 hover:border-ink-900',
                )}
                aria-label="Wishlist"
              >
                <Heart className={cn('h-4 w-4', wishlisted && 'fill-white')} />
              </button>
            </div>

            {/* Assurances */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-ink-900/10 py-5 text-center">
              {[
                { icon: Truck, label: 'Free express shipping' },
                { icon: RefreshCw, label: '30-day returns' },
                { icon: Check, label: 'Hand-finished' },
              ].map((a) => (
                <div key={a.label} className="flex flex-col items-center gap-2">
                  <a.icon className="h-5 w-5 text-gold-400" />
                  <span className="text-[10px] uppercase tracking-widest-2 text-warmgray">
                    {a.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="mt-6 divide-y divide-ink-900/10">
              {[
                { key: 'description', label: 'Description', content: product.description },
                { key: 'fabric', label: 'Fabric Details', content: product.fabricDetails },
                { key: 'wash', label: 'Wash Instructions', content: product.washInstructions },
                { key: 'shipping', label: 'Shipping & Returns', content: product.shippingInfo },
              ].map((sec) => (
                <div key={sec.key}>
                  <button
                    onClick={() => setOpenSection(openSection === sec.key ? null : sec.key)}
                    className="flex w-full items-center justify-between py-4 text-left"
                  >
                    <span className="text-[11px] uppercase tracking-ultra-wide">{sec.label}</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        openSection === sec.key && 'rotate-180',
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openSection === sec.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 text-sm leading-relaxed text-ink-600">{sec.content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 md:mt-28">
            <Reveal direction="up">
              <h2 className="font-serif text-3xl font-medium md:text-4xl">You may also like</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky add to cart (mobile) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-ink-900/10 bg-cream-100/95 px-5 py-3 backdrop-blur lg:hidden"
      >
        <div>
          <p className="font-serif text-lg">{formatPrice(product.price)}</p>
          <p className="text-[10px] uppercase tracking-widest-2 text-warmgray">
            {product.colors[selectedColor].name} · {selectedSize || 'Select size'}
          </p>
        </div>
        <button onClick={handleAdd} className="btn-primary">
          Add to Cart
        </button>
      </motion.div>

      {/* Size guide modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-900/50 p-4 backdrop-blur"
            onClick={() => setShowSizeGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-md bg-cream-100 p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSizeGuide(false)}
                className="absolute right-4 top-4"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="font-serif text-2xl">Size Guide</h3>
              <p className="mt-2 text-sm text-warmgray">Measurements in inches.</p>
              <table className="mt-5 w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-900/15 text-left text-[11px] uppercase tracking-widest-2 text-warmgray">
                    <th className="py-2">Size</th>
                    <th className="py-2">Chest</th>
                    <th className="py-2">Waist</th>
                    <th className="py-2">Hip</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['S', 36, 30, 36],
                    ['M', 38, 32, 38],
                    ['L', 40, 34, 40],
                    ['XL', 42, 36, 42],
                    ['XXL', 44, 38, 44],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-ink-900/5">
                      {row.map((c, i) => (
                        <td key={i} className="py-2.5">{c}{i > 0 ? '"' : ''}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
