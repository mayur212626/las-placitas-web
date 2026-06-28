'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/** Translates its children on the Y axis relative to scroll for depth. */
export default function Parallax({
  children,
  speed = 60,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
