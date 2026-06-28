'use client';

import { useEffect, useRef, useState } from 'react';
import FoodArt, { type FoodKind } from './FoodArt';

const KINDS: { kind: FoodKind; accent: string }[] = [
  { kind: 'skillet', accent: '#ff5e1a' },
  { kind: 'steak', accent: '#e11d62' },
  { kind: 'fish', accent: '#b6ff2e' },
  { kind: 'nachos', accent: '#ff9d2e' },
  { kind: 'soup', accent: '#ff5e1a' },
  { kind: 'pupusa', accent: '#ff9d2e' },
];

type Item = { id: number; x: number; y: number; idx: number; rot: number };

/** Dish thumbnails trail behind the pointer, spawned every N pixels of travel. */
export default function ImageTrail() {
  const [items, setItems] = useState<Item[]>([]);
  const last = useRef({ x: 0, y: 0 });
  const id = useRef(0);
  const counter = useRef(0);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      if (Math.hypot(dx, dy) < 90) return; // spawn every ~90px of travel
      last.current = { x: e.clientX, y: e.clientY };
      const item: Item = {
        id: id.current++,
        x: e.clientX,
        y: e.clientY,
        idx: counter.current++ % KINDS.length,
        rot: (Math.random() - 0.5) * 28,
      };
      setItems((prev) => [...prev.slice(-9), item]);
      setTimeout(() => {
        setItems((prev) => prev.filter((it) => it.id !== item.id));
      }, 850);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[64] overflow-hidden">
      {items.map((it) => {
        const k = KINDS[it.idx];
        return (
          <div
            key={it.id}
            className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-magma/30 bg-coal/80 shadow-lg shadow-black/40 [animation:trailpop_0.85s_ease-out_forwards]"
            style={{ left: it.x, top: it.y, ['--rot' as string]: `${it.rot}deg` }}
          >
            <FoodArt kind={k.kind} accent={k.accent} className="h-full w-full" />
          </div>
        );
      })}
      <style>{`
        @keyframes trailpop {
          0%   { opacity: 0; transform: translate(-50%,-50%) scale(0.5) rotate(var(--rot)); }
          18%  { opacity: 1; transform: translate(-50%,-50%) scale(1) rotate(var(--rot)); }
          100% { opacity: 0; transform: translate(-50%,-90%) scale(0.85) rotate(var(--rot)); }
        }
      `}</style>
    </div>
  );
}
