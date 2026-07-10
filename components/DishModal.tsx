'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Item } from '@/lib/data';
import DishImage from './DishImage';
import { FavButton } from './FavoritesProvider';
import { useCart } from './cart/CartProvider';
import { useLang } from './i18n/LanguageProvider';

/** Quick-view: big photo, tags, description, quantity stepper, add to order. */
export default function DishModal({
  item,
  id,
  onClose,
}: {
  item: Item | null;
  id: string;
  onClose: () => void;
}) {
  const { addMany } = useCart();
  const { t, lang } = useLang();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (item) setQty(1);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  const price = item?.price ? parseFloat(item.price) : NaN;
  const canAdd = !!item && !Number.isNaN(price);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[92] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: 30, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="glass relative z-10 w-full max-w-lg overflow-hidden rounded-3xl"
          >
            <div className="relative aspect-[16/9] bg-coal">
              <DishImage
                photoKey={item.photo}
                alt={item.name}
                className="h-full w-full"
                sizes="(max-width: 768px) 100vw, 512px"
              />
              <button
                onClick={onClose}
                data-cursor
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-obsidian/70 text-ash transition hover:bg-magma hover:text-obsidian"
              >
                ✕
              </button>
              <div className="absolute left-4 top-4">
                <FavButton id={id} className="bg-obsidian/70" />
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="kinetic text-3xl text-ash">
                  {item.name}
                  {(item.tags?.length || item.spice) && (
                    <span className="ml-2 align-middle text-base" aria-hidden>
                      {item.tags?.includes('veg') && '🌱'}
                      {item.tags?.includes('seafood') && '🐟'}
                      {item.spice ? '🌶'.repeat(item.spice) : ''}
                    </span>
                  )}
                </h3>
                {item.price && (
                  <span className="kinetic text-3xl text-magma-grad">${item.price}</span>
                )}
              </div>
              {(lang === 'es' ? item.descEs || item.desc : item.desc) && (
                <p className="mt-2 text-sm leading-relaxed text-ash/60">
                  {lang === 'es' ? item.descEs || item.desc : item.desc}
                </p>
              )}

              {canAdd && (
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center gap-3 rounded-full border border-ash/20 px-3 py-2">
                    <button
                      onClick={() => setQty((n) => Math.max(1, n - 1))}
                      data-cursor
                      aria-label="Decrease"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ash/70 hover:text-magma"
                    >
                      −
                    </button>
                    <span className="w-6 text-center tabular-nums text-ash">{qty}</span>
                    <button
                      onClick={() => setQty((n) => n + 1)}
                      data-cursor
                      aria-label="Increase"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ash/70 hover:text-magma"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      addMany([{ id, name: item.name, price, qty }]);
                      onClose();
                    }}
                    data-cursor
                    className="flex-1 rounded-full bg-magma py-3 text-sm font-semibold uppercase tracking-widest text-obsidian transition-transform hover:scale-[1.02]"
                  >
                    {t('menu.add').replace('+ ', '')} · ${(price * qty).toFixed(2)}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
