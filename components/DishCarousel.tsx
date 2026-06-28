'use client';

import { useEffect, useRef, useState } from 'react';
import FoodArt, { type FoodKind } from './FoodArt';
import DrinkArt from './DrinkArt';

type Dish = { name: string; accent: string; kind?: FoodKind };

export default function DishCarousel({
  items,
  variant = 'navy',
  drink = false,
}: {
  items: Dish[];
  variant?: 'navy' | 'jungle';
  drink?: boolean;
}) {
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = items.length;

  const go = (d: number) => setI((p) => (p + d + n) % n);

  useEffect(() => {
    timer.current = setInterval(() => setI((p) => (p + 1) % n), 3500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [n]);

  const slot = (off: number) => items[(i + off + n) % n];

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-4 md:gap-6">
        {[-1, 0, 1].map((off) => {
          const d = slot(off);
          const center = off === 0;
          return (
            <div
              key={`${d.name}-${off}`}
              className={`glitch relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                center
                  ? 'w-[60%] scale-100 border-magma/60 opacity-100 shadow-2xl shadow-magma/20 md:w-[40%]'
                  : 'hidden w-[28%] scale-90 border-white/10 opacity-40 md:block'
              }`}
            >
              <div className={`aspect-[4/3] ${variant === 'jungle' ? 'bg-smoke' : 'bg-coal'}`}>
                {drink ? (
                  <DrinkArt accent={d.accent} className="h-full w-full" />
                ) : (
                  <FoodArt kind={d.kind ?? 'plate'} accent={d.accent} className="h-full w-full" />
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian to-transparent p-4">
                <span className="kinetic text-2xl text-ash md:text-3xl">{d.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => go(-1)}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-coal/70 p-3 text-2xl text-ash transition hover:bg-magma hover:text-obsidian"
      >
        ‹
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-coal/70 p-3 text-2xl text-ash transition hover:bg-magma hover:text-obsidian"
      >
        ›
      </button>

      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              idx === i ? 'w-6 bg-magma' : 'w-2.5 bg-ash/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
