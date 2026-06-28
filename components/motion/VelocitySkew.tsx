'use client';

import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from 'framer-motion';

/** Skews + nudges its children based on scroll velocity for a kinetic feel. */
export default function VelocitySkew({
  children,
  className = '',
  amount = 6,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 200, damping: 40 });
  const skewX = useTransform(smooth, [-2500, 0, 2500], [amount, 0, -amount], {
    clamp: true,
  });

  return (
    <motion.div style={{ skewX }} className={className}>
      {children}
    </motion.div>
  );
}
