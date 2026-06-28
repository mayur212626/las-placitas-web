'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MenuSection, Item } from '@/lib/data';
import { useCart } from './cart/CartProvider';

/** Filterable menu with animated reflow between categories. */
export default function MenuExplorer({ menu }: { menu: MenuSection[] }) {
  const cats = ['All', ...menu.map((s) => s.title)];
  const [active, setActive] = useState('All');
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const addItem = (id: string, it: Item) => {
    if (!it.price) return;
    const num = parseFloat(it.price);
    if (Number.isNaN(num)) return;
    add({ id, name: it.name, price: num });
    setJustAdded(id);
    setTimeout(() => setJustAdded((c) => (c === id ? null : c)), 1000);
  };

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
                {sec.items.map((it) => {
                  const id = `${sec.title}-${it.name}`;
                  const added = justAdded === id;
                  const canAdd = !!it.price && !Number.isNaN(parseFloat(it.price));
                  return (
                    <motion.div
                      key={it.name}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                      onClick={() => addItem(id, it)}
                      role={canAdd ? 'button' : undefined}
                      tabIndex={canAdd ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (canAdd && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault();
                          addItem(id, it);
                        }
                      }}
                      data-cursor
                      className={`glass glitch rounded-xl p-5 transition-colors ${
                        canAdd ? 'cursor-pointer select-none hover:border-magma/40' : ''
                      }`}
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
                      {canAdd && (
                        <div className="mt-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-colors ${
                              added
                                ? 'border-acid bg-acid/15 text-acid'
                                : 'border-magma/50 text-magma'
                            }`}
                          >
                            {added ? '✓ Added to order' : '+ Add to order'}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
