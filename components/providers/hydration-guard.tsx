'use client';

import { useEffect, useState, type ReactNode } from 'react';

interface HydrationGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Ensures components only render after hydration is complete.
 * Prevents SSR/client mismatch errors.
 */
export function HydrationGuard({ children, fallback = null }: HydrationGuardProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return fallback;
  }

  return children;
}
