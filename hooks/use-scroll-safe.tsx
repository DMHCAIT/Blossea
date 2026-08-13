'use client';

import { useScroll, useMotionValue } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';

type OffsetValue = [string, string] | string | undefined;

/**
 * Safe wrapper for useScroll that prevents SSR hydration errors.
 * Only initializes scroll tracking after component mount.
 */
export function useScrollSafe(options?: {
  target?: React.RefObject<HTMLElement>;
  offset?: OffsetValue;
}): {
  scrollYProgress: MotionValue<number>;
  scrollX?: MotionValue<number>;
  scrollXProgress?: MotionValue<number>;
  scrollY?: MotionValue<number>;
  ref: React.RefObject<HTMLElement>;
  isClient: boolean;
} {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const target = options?.target || ref;
  const fallbackMotionValue = useMotionValue(0);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  const safeOffset = (options?.offset ?? ['start start', 'end end']) as OffsetValue;

  const scrollData = useScroll({
    target: isMounted ? target : undefined,
    offset: safeOffset as any,
  });

  return {
    scrollYProgress: scrollData?.scrollYProgress ?? fallbackMotionValue,
    scrollX: scrollData?.scrollX,
    scrollXProgress: scrollData?.scrollXProgress,
    scrollY: scrollData?.scrollY,
    ref,
    isClient: isMounted,
  };
}

/**
 * Hook to defer rendering until client hydration and mount complete.
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
