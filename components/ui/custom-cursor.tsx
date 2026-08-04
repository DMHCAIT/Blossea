'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [variant, setVariant] = useState<'default' | 'hover'>('default');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target as HTMLElement;
      setVariant(
        target.closest('a, button, [data-cursor="hover"], input, label') ? 'hover' : 'default',
      );
    };
    const leave = () => setHidden(true);
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [x, y]);

  if (hidden && typeof window !== 'undefined') return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-ink-900/40"
          animate={{
            width: variant === 'hover' ? 44 : 28,
            height: variant === 'hover' ? 44 : 28,
            backgroundColor:
              variant === 'hover' ? 'rgba(182,138,53,0.12)' : 'rgba(11,11,11,0.04)',
            borderColor:
              variant === 'hover' ? 'rgba(182,138,53,0.8)' : 'rgba(11,11,11,0.4)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden md:block"
        style={{ x, y }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-ink-900" />
      </motion.div>
    </>
  );
}
