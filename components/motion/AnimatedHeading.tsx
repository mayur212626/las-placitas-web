'use client';

import { motion } from 'framer-motion';

/**
 * Word-by-word rise + blur reveal. Pass plain text; markup like <br/> is not
 * supported — use the `lines` prop for multi-line headings.
 */
export default function AnimatedHeading({
  text,
  lines,
  className = '',
  accentWords = [],
  delay = 0,
}: {
  text?: string;
  lines?: string[];
  className?: string;
  accentWords?: string[];
  delay?: number;
}) {
  const rows = lines ?? (text ? [text] : []);
  let idx = 0;

  return (
    <h1 className={className}>
      {rows.map((row, r) => (
        <span key={r} className="block overflow-hidden">
          {row.split(' ').map((word) => {
            const i = idx++;
            const accent = accentWords.includes(word.replace(/[.,]/g, ''));
            return (
              <motion.span
                key={`${word}-${i}`}
                initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.8,
                  delay: delay + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`mr-[0.25em] inline-block ${accent ? 'text-goldgrad' : ''}`}
              >
                {word}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
