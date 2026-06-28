'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MenuSection } from '@/lib/data';

/** Filterable menu with animated reflow between categories. */
export default function MenuExplorer({ menu }: { menu: MenuSection[] }) {
  const cats = ['All', ...menu.map((s) => s.title)];
  const [active, setActive] = useState('All');

  const sections = active === 'All' ? menu : menu.filter((s) => s.title === active);

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-3">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            data-cursor
            className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
              active === c
                ? 'border-magma bg-magma text-obsidian'
                : 'border-ash/20 text-ash/70 hover:border-magma/60 hover:text-magma'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {sections.map((sec) => (
          <div key={sec.title}>
            <div className="mb-6 flex items-baseline gap-4">
              <h2 className="kinetic text-3xl text-magma-grad md:text-4xl">{sec.title}</h2>
              {sec.note && <p className="text-sm italic text-ash/50">{sec.note}</p>}
            </div>
            <motion.div layout className="grid gap-4 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {sec.items.map((it) => (
                  <motion.div
                    key={it.name}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="glass glitch rounded-xl p-5"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="kinetic text-xl text-ash">{it.name}</h3>
                      {it.price && (
                        <span className="kinetic text-lg text-magma-grad">${it.price}</span>
                      )}
                    </div>
                    {it.desc && (
                      <p className="mt-1 text-sm leading-snug text-ash/55">{it.desc}</p>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
