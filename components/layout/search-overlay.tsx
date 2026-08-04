'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useShop } from '@/components/providers/shop-context';
import { products, categories, collections } from '@/data/products';

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!searchOpen) setQuery('');
  }, [searchOpen]);

  const results = query
    ? products
        .filter((p) =>
          (p.name + p.fabric + p.category + p.collections.join(' '))
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .slice(0, 5)
    : [];

  const trending = products.filter((p) => p.trending).slice(0, 4);

  const go = (href: string) => {
    setSearchOpen(false);
    router.push(href);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-cream-50/95 backdrop-blur-xl"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="container-luxe pt-28"
          >
            <div className="flex items-center justify-between">
              <p className="eyebrow">Search</p>
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (query) go(`/search?q=${encodeURIComponent(query)}`);
              }}
              className="mt-6 flex items-center gap-4 border-b border-ink-900/20 pb-4"
            >
              <Search className="h-6 w-6 text-warmgray" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full bg-transparent font-serif text-3xl text-ink-900 placeholder:text-warmgray/50 focus:outline-none md:text-5xl"
              />
            </form>

            {results.length > 0 ? (
              <div className="mt-8">
                <p className="eyebrow mb-4">Products</p>
                <ul className="divide-y divide-ink-900/10">
                  {results.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => go(`/product/${p.slug}`)}
                        className="flex w-full items-center justify-between py-3 text-left transition-colors hover:text-gold-400"
                      >
                        <span className="font-serif text-lg">{p.name}</span>
                        <span className="text-[11px] uppercase tracking-widest-2 text-warmgray">
                          {p.category.replace('-', ' ')}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
                <div>
                  <p className="eyebrow mb-4">Trending</p>
                  <ul className="space-y-2.5">
                    {trending.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => go(`/product/${p.slug}`)}
                          className="text-sm text-ink-700 transition-colors hover:text-gold-400"
                        >
                          {p.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-4">Categories</p>
                  <ul className="space-y-2.5">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/category/${c.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="text-sm text-ink-700 transition-colors hover:text-gold-400"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-4">Collections</p>
                  <ul className="space-y-2.5">
                    {collections.slice(0, 4).map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/collection/${c.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="text-sm text-ink-700 transition-colors hover:text-gold-400"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
