'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

/** 3D parallax tilt toward the cursor, with a moving gloss highlight. */
export default function Tilt({
  children,
  className = '',
  max = 12,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 18,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 18,
  });
  const glx = useTransform(px, [0, 1], ['0%', '100%']);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`relative [transform-style:preserve-3d] ${className}`}
    >
      {children}
      <motion.div
        aria-hidden
        style={{ left: glx }}
        className="pointer-events-none absolute inset-y-0 -ml-24 w-24 bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </motion.div>
  );
}
