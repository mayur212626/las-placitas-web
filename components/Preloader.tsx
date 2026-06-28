'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { prefersReducedMotion } from '@/lib/env';

/** Count-up intro that lifts away like a magma curtain. */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDone(true);
      return;
    }
    // lock scroll while loading
    document.body.style.overflow = 'hidden';
    const controls = animate(mv, 100, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setPct(Math.round(v)),
      onComplete: () => setTimeout(() => setDone(true), 350),
    });
    return () => controls.stop();
  }, [mv]);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-obsidian"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-magma/20 blur-[140px]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative text-center"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.5em] text-magma">
              Fire-Born Cuisine
            </p>
            <h1 className="kinetic text-magma-grad text-6xl glow-magma md:text-8xl">
              Las Placitas
            </h1>
          </motion.div>

          {/* progress */}
          <div className="relative mt-12 w-64">
            <div className="h-[2px] w-full bg-smoke">
              <motion.div
                className="h-full bg-gradient-to-r from-magma to-acid"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between text-xs uppercase tracking-widest text-ash/60">
              <span>Stoking the fire</span>
              <span className="tabular-nums text-acid">{pct}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
