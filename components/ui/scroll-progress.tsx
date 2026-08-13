'use client';

import { motion, useSpring } from 'framer-motion';
import { useScrollSafe } from '@/hooks/use-scroll-safe';

export function ScrollProgress() {
  const { scrollYProgress } = useScrollSafe();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400"
    />
  );
}
