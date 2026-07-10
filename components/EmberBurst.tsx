'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#ff5e1a', '#ff9d2e', '#e11d62', '#b6ff2e', '#ffd27a'];

/** One-shot ember explosion, rendered inside a relative parent. No libs. */
export default function EmberBurst({ count = 36 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const parts: HTMLSpanElement[] = [];
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      const size = 4 + Math.random() * 6;
      s.style.cssText = `position:absolute;left:50%;top:50%;width:${size}px;height:${size}px;border-radius:9999px;background:${COLORS[i % COLORS.length]};pointer-events:none;`;
      host.appendChild(s);
      parts.push(s);

      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 130;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 40; // drift upward
      s.animate(
        [
          { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.2)`, opacity: 0 },
        ],
        { duration: 700 + Math.random() * 600, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }
      );
    }
    const tidy = setTimeout(() => parts.forEach((p) => p.remove()), 1600);
    return () => {
      clearTimeout(tidy);
      parts.forEach((p) => p.remove());
    };
  }, [count]);

  return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" />;
}
