'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useShop } from '@/components/providers/shop-context';
import { formatPrice } from '@/lib/format';
import { PageHeader } from '@/components/layout/page-header';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useShop();

  const shipping = cartTotal > 200 ? 0 : 15;
  const tax = Math.round(cartTotal * 0.08);
  const total = cartTotal + shipping + tax;

  return (
    <>
      <PageHeader title="Cart" eyebrow="Your Bag" />
      <section className="container-luxe py-10 md:py-14">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-200">
              <ShoppingBag className="h-8 w-8 text-warmgray" />
            </div>
            <p className="mt-6 font-serif text-2xl">Your cart is empty</p>
            <p className="mt-2 text-sm text-warmgray">Let&apos;s find something worth the wait.</p>
            <Link href="/shop" className="btn-primary mt-8">
              Explore the Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
            <div>
              <div className="hidden grid-cols-12 gap-4 border-b border-ink-900/10 pb-3 text-[10px] uppercase tracking-widest-2 text-warmgray md:grid">
                <span className="col-span-6">Product</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-center">Price</span>
                <span className="col-span-2 text-right">Total</span>
              </div>
              <ul className="divide-y divide-ink-900/10">
                {cart.map((item) => (
                  <li
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="grid grid-cols-2 gap-4 py-6 md:grid-cols-12 md:items-center"
                  >
                    <div className="col-span-2 flex gap-4 md:col-span-6">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="relative h-28 w-22 flex-shrink-0 overflow-hidden rounded-md bg-cream-200"
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="90px"
                          className="object-cover"
                        />
                      </Link>
                      <div>
                        <h3 className="font-serif text-lg font-medium">{item.product.name}</h3>
                        <p className="mt-1 text-[11px] uppercase tracking-widest-2 text-warmgray">
                          {item.color} · {item.size}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          className="mt-2 flex items-center gap-1 text-[11px] uppercase tracking-widest-2 text-warmgray hover:text-ink-900"
                        >
                          <X className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center md:col-span-2 md:justify-center">
                      <div className="flex items-center border border-ink-900/15">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-1 text-right md:col-span-2 md:text-center">
                      {formatPrice(item.product.price)}
                    </div>
                    <div className="col-span-2 text-right font-serif text-lg md:col-span-2">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between">
                <Link href="/shop" className="link-underline text-[11px] uppercase tracking-ultra-wide">
                  Continue shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-[11px] uppercase tracking-ultra-wide text-warmgray hover:text-ink-900"
                >
                  Clear cart
                </button>
              </div>
            </div>

            <aside className="h-fit rounded-md border border-ink-900/10 bg-cream-50 p-6 md:p-8">
              <h2 className="font-serif text-2xl">Order Summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-warmgray">Subtotal</dt>
                  <dd>{formatPrice(cartTotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-warmgray">Shipping</dt>
                  <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-warmgray">Estimated Tax</dt>
                  <dd>{formatPrice(tax)}</dd>
                </div>
                <div className="flex justify-between border-t border-ink-900/10 pt-3 font-serif text-lg">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>
              <Link href="/checkout" className="btn-primary mt-6 w-full">
                Checkout <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
              <p className="mt-3 text-center text-[10px] uppercase tracking-widest-2 text-warmgray">
                Complimentary shipping over {formatPrice(200)}
              </p>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
