'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';

/** Counts from 0 → value when scrolled into view. */
export default function Counter({
  value,
  suffix = '',
  prefix = '',
  className = '',
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, mv, prefix, suffix]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
