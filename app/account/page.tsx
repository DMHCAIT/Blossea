'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, ShoppingBag, Heart, LogOut, Package } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-context';
import { useShop } from '@/components/providers/shop-context';
import { supabase } from '@/lib/supabase-client';
import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/ui/reveal';

export default function AccountPage() {
  const { user, loading } = useAuth();
  const { cart, wishlist } = useShop();
  const router = useRouter();
  const [tab, setTab] = useState<'overview' | 'orders' | 'wishlist'>('overview');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="container-luxe flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-warmgray">Loading…</p>
      </div>
    );
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <>
      <PageHeader title="My Account" eyebrow="Welcome back" />
      <section className="container-luxe py-10 md:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <aside>
            <div className="rounded-md border border-ink-900/10 bg-cream-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-cream-100">
                  <User className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-serif text-sm font-medium">
                    {user.user_metadata?.full_name || 'Member'}
                  </p>
                  <p className="truncate text-[10px] uppercase tracking-widest-2 text-warmgray">
                    {user.email}
                  </p>
                </div>
              </div>
              <nav className="mt-6 space-y-1">
                {[
                  { key: 'overview', label: 'Overview', icon: User },
                  { key: 'orders', label: 'Orders', icon: Package },
                  { key: 'wishlist', label: 'Wishlist', icon: Heart },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setTab(item.key as typeof tab)}
                    className={`flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm transition-colors ${
                      tab === item.key ? 'bg-ink-900 text-cream-100' : 'text-ink-700 hover:bg-cream-200'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm text-warmgray transition-colors hover:bg-cream-200"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          <div>
            {tab === 'overview' && (
              <Reveal direction="up">
                <h2 className="font-serif text-3xl font-medium">Hello, {user.user_metadata?.full_name?.split(' ')[0] || 'Member'}</h2>
                <p className="mt-2 text-sm text-warmgray">
                  Manage your orders, wishlist and account details from here.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    { label: 'Cart Items', value: cart.length, icon: ShoppingBag, href: '/cart' },
                    { label: 'Wishlist', value: wishlist.length, icon: Heart, href: '/wishlist' },
                    { label: 'Orders', value: 0, icon: Package, href: '/account' },
                  ].map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      className="group rounded-md border border-ink-900/10 bg-cream-50 p-6 transition-colors hover:border-gold-400"
                    >
                      <s.icon className="h-6 w-6 text-gold-400" />
                      <p className="mt-4 font-serif text-3xl">{s.value}</p>
                      <p className="text-[10px] uppercase tracking-widest-2 text-warmgray">{s.label}</p>
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}

            {tab === 'orders' && (
              <Reveal direction="up">
                <h2 className="font-serif text-3xl font-medium">Your Orders</h2>
                <div className="mt-8 flex flex-col items-center justify-center rounded-md border border-dashed border-ink-900/15 py-20 text-center">
                  <Package className="h-10 w-10 text-warmgray" />
                  <p className="mt-4 font-serif text-xl">No orders yet</p>
                  <p className="mt-1 text-sm text-warmgray">Your future orders will appear here.</p>
                  <Link href="/shop" className="btn-primary mt-6">Start Shopping</Link>
                </div>
              </Reveal>
            )}

            {tab === 'wishlist' && (
              <Reveal direction="up">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-3xl font-medium">Your Wishlist</h2>
                  <Link href="/wishlist" className="link-underline text-[11px] uppercase tracking-ultra-wide">
                    View all
                  </Link>
                </div>
                {wishlist.length === 0 ? (
                  <div className="mt-8 flex flex-col items-center justify-center rounded-md border border-dashed border-ink-900/15 py-20 text-center">
                    <Heart className="h-10 w-10 text-warmgray" />
                    <p className="mt-4 font-serif text-xl">No saved pieces yet</p>
                    <Link href="/shop" className="btn-primary mt-6">Discover Pieces</Link>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-warmgray">
                    You have {wishlist.length} piece{wishlist.length > 1 ? 's' : ''} saved.
                  </p>
                )}
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
