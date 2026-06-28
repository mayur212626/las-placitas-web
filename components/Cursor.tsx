'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Soft gold glow that trails the pointer and swells over links/buttons. */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });
  const [hot, setHot] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // skip on touch / coarse pointers and when motion is reduced
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHot(!!t.closest('a, button, [data-cursor]'));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-[70] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
    >
      <motion.div
        animate={{ scale: hot ? 2.4 : 1, opacity: hot ? 0.9 : 0.6 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        className="h-7 w-7 rounded-full bg-magma blur-md"
      />
    </motion.div>
  );
}
