'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis with minimal blocking
    let lenis: Lenis | null = null;
    
    const initLenis = () => {
      try {
        lenis = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.5,
        });

        let rafId: number;
        function raf(time: number) {
          if (lenis) lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
          cancelAnimationFrame(rafId);
          lenis?.destroy();
        };
      } catch (error) {
        console.warn('Lenis initialization failed:', error);
        return undefined;
      }
    };

    const cleanup = initLenis();
    return cleanup;
  }, []);

  return <>{children}</>;
}
