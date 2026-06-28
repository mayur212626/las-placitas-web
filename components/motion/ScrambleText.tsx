'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#%';

/** Characters decode/resolve into the final word when scrolled into view. */
export default function ScrambleText({
  text,
  className = '',
  speed = 2,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView) return;
    const len = text.length;
    const total = len * speed + 24;
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame++;
      let s = '';
      for (let i = 0; i < len; i++) {
        if (text[i] === ' ') s += ' ';
        else if (frame / speed > i) s += text[i];
        else s += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOut(s);
      if (frame < total) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {out}
    </span>
  );
}
