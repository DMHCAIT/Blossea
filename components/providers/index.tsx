'use client';

import { ShopProvider } from './shop-context';
import { AuthProvider } from './auth-context';
import { SmoothScroll } from './smooth-scroll';
import { PageTransition } from '@/components/ui/page-transition';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/layout/cart-drawer';
import { SearchOverlay } from '@/components/layout/search-overlay';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ShopProvider>
      <AuthProvider>
        <SmoothScroll>
        <Navbar />
        <PageTransition>
          <main className="min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
        <CartDrawer />
        <SearchOverlay />
        </SmoothScroll>
      </AuthProvider>
    </ShopProvider>
  );
}
