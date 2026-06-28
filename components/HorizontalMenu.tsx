'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FoodArt, { type FoodKind } from './FoodArt';
import AddToCart from './cart/AddToCart';

type Panel = { title: string; price?: string; desc?: string; kind: FoodKind; accent: string };

/** Pinned section that scrolls its panels sideways as you scroll down. */
export default function HorizontalMenu({ panels }: { panels: Panel[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  // travel: 0 → negative so the last card lands on screen
  const x = useTransform(scrollYProgress, [0, 1], ['2%', `-${(panels.length - 1) * 78 + 4}%`]);

  return (
    <section ref={ref} style={{ height: `${panels.length * 90}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* heading watermark */}
        <h2 className="pointer-events-none absolute left-6 top-16 z-0 kinetic text-outline text-[16vw] leading-none opacity-30">
          Menu
        </h2>

        <motion.div style={{ x }} className="flex gap-8 pl-[6vw] will-change-transform">
          {panels.map((p, i) => (
            <article
              key={p.title}
              className="glass glitch relative flex h-[62vh] w-[74vw] shrink-0 flex-col overflow-hidden rounded-3xl md:w-[44vw]"
            >
              <div className="relative flex-1 bg-coal">
                <FoodArt kind={p.kind} accent={p.accent} className="h-full w-full" />
                <span className="absolute left-5 top-5 rounded-full border border-ash/20 px-3 py-1 text-xs uppercase tracking-widest text-ash/70">
                  {String(i + 1).padStart(2, '0')} / {String(panels.length).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 p-7">
                <div>
                  <h3 className="kinetic text-3xl text-ash md:text-5xl">{p.title}</h3>
                  {p.desc && (
                    <p className="mt-2 max-w-md text-sm text-ash/60">{p.desc}</p>
                  )}
                  <div className="mt-4">
                    <AddToCart id={`signature-${p.title}`} name={p.title} price={p.price} />
                  </div>
                </div>
                {p.price && (
                  <span className="kinetic text-magma-grad text-4xl md:text-6xl">
                    ${p.price}
                  </span>
                )}
              </div>
            </article>
          ))}
        </motion.div>

        <div className="absolute bottom-8 right-8 z-10 text-xs uppercase tracking-[0.3em] text-ash/50">
          Scroll →
        </div>
      </div>
    </section>
  );
}
