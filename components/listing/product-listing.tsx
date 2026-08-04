'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products as allProducts, categories, collections, fabrics, colorSwatches } from '@/data/products';
import { ProductCard } from '@/components/ui/product-card';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';
import type { Product, Category, Collection } from '@/types';

type SortKey = 'newest' | 'popular' | 'price-asc' | 'price-desc' | 'rating';

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'newest', label: 'Newest' },
  { key: 'popular', label: 'Popular' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'rating', label: 'Customer Rating' },
];

const sizesList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38'];

interface ProductListingProps {
  title: string;
  eyebrow?: string;
  description?: string;
  filterCategory?: Category;
  filterCollection?: Collection;
  baseProducts?: Product[];
}

export function ProductListing({
  title,
  eyebrow,
  description,
  filterCategory,
  filterCollection,
  baseProducts,
}: ProductListingProps) {
  const params = useSearchParams();
  const initialSort = (params.get('sort') as SortKey) || 'newest';

  const [sort, setSort] = useState<SortKey>(initialSort);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedCats, setSelectedCats] = useState<Category[]>(
    filterCategory ? [filterCategory] : [],
  );
  const [selectedCols, setSelectedCols] = useState<Collection[]>(
    filterCollection ? [filterCollection] : [],
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    if (filterCategory) setSelectedCats([filterCategory]);
    if (filterCollection) setSelectedCols([filterCollection]);
  }, [filterCategory, filterCollection]);

  const filtered = useMemo(() => {
    let list = (baseProducts ?? allProducts).filter((p) => {
      if (selectedCats.length && !selectedCats.includes(p.category)) return false;
      if (selectedCols.length && !selectedCols.some((c) => p.collections.includes(c))) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedColors.length && !p.colors.some((c) => selectedColors.includes(c.name))) return false;
      if (selectedSizes.length && !p.sizes.some((s) => selectedSizes.includes(s))) return false;
      if (selectedFabrics.length && !selectedFabrics.includes(p.fabric)) return false;
      if (inStockOnly && p.compareAt) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.reviewsCount - a.reviewsCount;
        default:
          return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      }
    });
    return list;
  }, [baseProducts, selectedCats, selectedCols, priceRange, selectedColors, selectedSizes, selectedFabrics, inStockOnly, sort]);

  const toggle = <T,>(arr: T[], val: T, set: (v: T[]) => void) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const clearAll = () => {
    setSelectedCats(filterCategory ? [filterCategory] : []);
    setSelectedCols(filterCollection ? [filterCollection] : []);
    setPriceRange([0, 400]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedFabrics([]);
    setInStockOnly(false);
  };

  const activeCount =
    selectedCats.length + selectedCols.length + selectedColors.length + selectedSizes.length + selectedFabrics.length + (inStockOnly ? 1 : 0);

  return (
    <div className="container-luxe py-10 md:py-14">
      <Reveal direction="up">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 font-serif text-4xl font-medium md:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-xl text-sm text-ink-600">{description}</p>}
      </Reveal>

      <div className="mt-8 flex items-center justify-between border-b border-ink-900/10 pb-4">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 text-[11px] uppercase tracking-ultra-wide"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-gold-400 px-1.5 text-[9px] text-white">{activeCount}</span>
          )}
        </button>

        <div className="flex items-center gap-4">
          <p className="hidden text-[11px] uppercase tracking-widest-2 text-warmgray sm:block">
            {filtered.length} pieces
          </p>
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-ultra-wide"
            >
              Sort: {sortOptions.find((o) => o.key === sort)?.label}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full z-20 mt-2 w-52 rounded-md border border-ink-900/10 bg-cream-50 py-2 shadow-lg"
                >
                  {sortOptions.map((o) => (
                    <li key={o.key}>
                      <button
                        onClick={() => {
                          setSort(o.key);
                          setSortOpen(false);
                        }}
                        className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-cream-200"
                      >
                        {o.label}
                        {sort === o.key && <Check className="h-3.5 w-3.5 text-gold-400" />}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <FilterPanel
            selectedCats={selectedCats}
            selectedCols={selectedCols}
            priceRange={priceRange}
            selectedColors={selectedColors}
            selectedSizes={selectedSizes}
            selectedFabrics={selectedFabrics}
            inStockOnly={inStockOnly}
            toggleCat={(c) => toggle(selectedCats, c, setSelectedCats)}
            toggleCol={(c) => toggle(selectedCols, c, setSelectedCols)}
            setPriceRange={setPriceRange}
            toggleColor={(c) => toggle(selectedColors, c, setSelectedColors)}
            toggleSize={(s) => toggle(selectedSizes, s, setSelectedSizes)}
            toggleFabric={(f) => toggle(selectedFabrics, f, setSelectedFabrics)}
            setInStockOnly={setInStockOnly}
            clearAll={clearAll}
            lockCategory={!!filterCategory}
            lockCollection={!!filterCollection}
          />
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="font-serif text-2xl">No pieces match your filters</p>
              <button onClick={clearAll} className="btn-outline mt-6">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ink-900/40 backdrop-blur-sm lg:hidden"
            onClick={() => setShowFilters(false)}
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-cream-100 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[11px] uppercase tracking-ultra-wide">Filters</h2>
                <button onClick={() => setShowFilters(false)} aria-label="Close filters">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-6">
                <FilterPanel
                  selectedCats={selectedCats}
                  selectedCols={selectedCols}
                  priceRange={priceRange}
                  selectedColors={selectedColors}
                  selectedSizes={selectedSizes}
                  selectedFabrics={selectedFabrics}
                  inStockOnly={inStockOnly}
                  toggleCat={(c) => toggle(selectedCats, c, setSelectedCats)}
                  toggleCol={(c) => toggle(selectedCols, c, setSelectedCols)}
                  setPriceRange={setPriceRange}
                  toggleColor={(c) => toggle(selectedColors, c, setSelectedColors)}
                  toggleSize={(s) => toggle(selectedSizes, s, setSelectedSizes)}
                  toggleFabric={(f) => toggle(selectedFabrics, f, setSelectedFabrics)}
                  setInStockOnly={setInStockOnly}
                  clearAll={clearAll}
                  lockCategory={!!filterCategory}
                  lockCollection={!!filterCollection}
                />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FilterPanelProps {
  selectedCats: Category[];
  selectedCols: Collection[];
  priceRange: [number, number];
  selectedColors: string[];
  selectedSizes: string[];
  selectedFabrics: string[];
  inStockOnly: boolean;
  toggleCat: (c: Category) => void;
  toggleCol: (c: Collection) => void;
  setPriceRange: (r: [number, number]) => void;
  toggleColor: (c: string) => void;
  toggleSize: (s: string) => void;
  toggleFabric: (f: string) => void;
  setInStockOnly: (v: boolean) => void;
  clearAll: () => void;
  lockCategory?: boolean;
  lockCollection?: boolean;
}

function FilterPanel(props: FilterPanelProps) {
  return (
    <div className="space-y-7 text-sm">
      <button onClick={props.clearAll} className="text-[11px] uppercase tracking-widest-2 text-warmgray hover:text-ink-900">
        Clear all
      </button>

      <FilterGroup title="Category">
        {categories.map((c) => (
          <CheckboxRow
            key={c.slug}
            label={c.name}
            checked={props.selectedCats.includes(c.slug)}
            disabled={props.lockCategory}
            onChange={() => props.toggleCat(c.slug)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Collection">
        {collections.map((c) => (
          <CheckboxRow
            key={c.slug}
            label={c.name}
            checked={props.selectedCols.includes(c.slug)}
            disabled={props.lockCollection}
            onChange={() => props.toggleCol(c.slug)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="px-1">
          <input
            type="range"
            min={0}
            max={33200}
            value={props.priceRange[1]}
            onChange={(e) => props.setPriceRange([props.priceRange[0], Number(e.target.value)])}
            className="w-full accent-gold-400"
          />
          <div className="mt-2 flex justify-between text-[11px] text-warmgray">
            <span>₹{props.priceRange[0].toLocaleString('en-IN')}</span>
            <span>Up to ₹{props.priceRange[1].toLocaleString('en-IN')}</span>
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2">
          {colorSwatches.map((c) => (
            <button
              key={c.name}
              onClick={() => props.toggleColor(c.name)}
              title={c.name}
              className={cn(
                'h-7 w-7 rounded-full border transition-all',
                props.selectedColors.includes(c.name)
                  ? 'ring-2 ring-gold-400 ring-offset-2 ring-offset-cream-100'
                  : 'border-ink-900/15',
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="grid grid-cols-4 gap-2">
          {sizesList.map((s) => (
            <button
              key={s}
              onClick={() => props.toggleSize(s)}
              className={cn(
                'border py-2 text-xs transition-colors',
                props.selectedSizes.includes(s)
                  ? 'border-ink-900 bg-ink-900 text-cream-100'
                  : 'border-ink-900/15 hover:border-ink-900/40',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Fabric">
        {fabrics.map((f) => (
          <CheckboxRow
            key={f}
            label={f}
            checked={props.selectedFabrics.includes(f)}
            onChange={() => props.toggleFabric(f)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Availability">
        <CheckboxRow
          label="In stock only"
          checked={props.inStockOnly}
          onChange={() => props.setInStockOnly(!props.inStockOnly)}
        />
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-ultra-wide text-ink-900">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className="flex w-full items-center gap-2.5 text-left disabled:opacity-50"
    >
      <span
        className={cn(
          'flex h-4 w-4 items-center justify-center border transition-colors',
          checked ? 'border-gold-400 bg-gold-400 text-white' : 'border-ink-900/25',
        )}
      >
        {checked && <Check className="h-3 w-3" />}
      </span>
      <span className="text-ink-700">{label}</span>
    </button>
  );
}
