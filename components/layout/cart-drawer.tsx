'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '@/components/providers/shop-context';
import { formatPrice } from '@/lib/format';

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useShop();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[80] bg-ink-900/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="fixed right-0 top-0 z-[81] flex h-full w-full max-w-md flex-col bg-cream-100"
          >
            <div className="flex items-center justify-between border-b border-ink-900/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <h2 className="text-[11px] uppercase tracking-ultra-wide">
                  Cart ({cartCount})
                </h2>
              </div>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart">
                <X className="h-5 w-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-200">
                  <ShoppingBag className="h-8 w-8 text-warmgray" />
                </div>
                <p className="mt-6 font-serif text-2xl">Your cart is empty</p>
                <p className="mt-2 text-sm text-warmgray">
                  Discover pieces worth the wait.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setCartOpen(false)}
                  className="btn-primary mt-8"
                >
                  Explore the Shop
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="space-y-5">
                    {cart.map((item) => (
                      <li
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        className="flex gap-4"
                      >
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setCartOpen(false)}
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
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <div>
                              <h3 className="font-serif text-sm font-medium">
                                {item.product.name}
                              </h3>
                              <p className="mt-0.5 text-[11px] text-warmgray">
                                {item.color} · {item.size}
                              </p>
                            </div>
                            <p className="font-serif text-sm">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-ink-900/15">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.size,
                                    item.color,
                                    item.quantity - 1,
                                  )
                                }
                                className="flex h-7 w-7 items-center justify-center"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-xs">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.size,
                                    item.color,
                                    item.quantity + 1,
                                  )
                                }
                                className="flex h-7 w-7 items-center justify-center"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() =>
                                removeFromCart(item.product.id, item.size, item.color)
                              }
                              className="text-[11px] uppercase tracking-widest-2 text-warmgray underline-offset-2 hover:text-ink-900 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-ink-900/10 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-ultra-wide">Subtotal</span>
                    <span className="font-serif text-xl">{formatPrice(cartTotal)}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-warmgray">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="btn-primary mt-4 w-full"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setCartOpen(false)}
                    className="mt-3 block text-center text-[11px] uppercase tracking-ultra-wide text-warmgray hover:text-ink-900"
                  >
                    View Full Cart
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
