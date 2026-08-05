'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useShop } from '@/components/providers/shop-context';
import { navLinks, categories, collections } from '@/data/products';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen, setMenuOpen, menuOpen } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 bg-cream-100/95 backdrop-blur-xl border-b border-ink-900/10"
      >
        <div className="container-luxe flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center gap-2 md:gap-6">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-ink-900 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) =>
                link.mega ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="text-[11px] uppercase tracking-ultra-wide transition-colors link-underline text-ink-900"
                    >
                      {link.label}
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-[11px] uppercase tracking-ultra-wide transition-colors link-underline text-ink-900',
                      pathname === link.href && 'text-gold-400',
                    )}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-sm md:text-xl tracking-[0.15em] md:tracking-[0.3em] transition-colors md:text-2xl text-ink-900"
          >
            BLOSSEA<span className="text-gold-400">·</span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4 lg:gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-ink-900 transition-colors"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative transition-colors text-ink-900"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-400 px-1 text-[9px] text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden sm:block transition-colors text-ink-900"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              className="relative transition-colors text-ink-900"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-400 px-1 text-[9px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-t border-ink-900/10 bg-cream-50/95 backdrop-blur-xl lg:block"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <div className="container-luxe grid grid-cols-12 gap-8 py-10">
                <div className="col-span-3">
                  <p className="eyebrow mb-4">Categories</p>
                  <ul className="space-y-3">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/category/${c.slug}`}
                          className="group flex items-baseline justify-between font-serif text-lg text-ink-900 transition-colors hover:text-gold-400"
                        >
                          {c.name}
                          <span className="text-[10px] uppercase tracking-widest-2 text-warmgray opacity-0 transition-opacity group-hover:opacity-100">
                            Shop →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-3">
                  <p className="eyebrow mb-4">Collections</p>
                  <ul className="space-y-3">
                    {collections.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/collection/${c.slug}`}
                          className="font-serif text-lg text-ink-900 transition-colors hover:text-gold-400"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-6">
                  <Link
                    href="/collections"
                    className="group relative block overflow-hidden rounded-md"
                  >
                    <div className="relative aspect-[16/9]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={collections[2].image}
                        alt={collections[2].name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-ink-900/30" />
                      <div className="absolute bottom-6 left-6 text-cream-100">
                        <p className="eyebrow text-gold-200">Featured</p>
                        <p className="font-serif text-2xl">{collections[2].name}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <input type="hidden" value={menuOpen ? 1 : 0} readOnly />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-ink-900 text-cream-100 lg:hidden"
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-serif text-xl tracking-[0.3em]">BLOSSEA<span className="text-gold-400">·</span></span>
            <button onClick={onClose} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="px-5 py-8">
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
              className="space-y-1"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'block border-b border-cream-100/10 py-4 font-serif text-3xl',
                      pathname === link.href && 'text-gold-400',
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <div className="mt-10 space-y-4">
              <p className="eyebrow text-gold-200">Categories</p>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="rounded-md border border-cream-100/15 px-4 py-3 text-sm"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
