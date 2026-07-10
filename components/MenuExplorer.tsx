'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MenuSection, Item } from '@/lib/data';
import { useCart } from './cart/CartProvider';
import { useLang } from './i18n/LanguageProvider';
import { useFavorites, FavButton } from './FavoritesProvider';

type Diet = 'veg' | 'seafood' | 'spicy' | 'favs';

/** Filterable menu with animated reflow between categories. */
export default function MenuExplorer({ menu }: { menu: MenuSection[] }) {
  const { t, lang } = useLang();
  const { has } = useFavorites();
  const cats = ['All', ...menu.map((s) => s.title)];
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState<Diet | null>(null);
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

  const matchesDiet = (secTitle: string, it: Item) => {
    if (!diet) return true;
    if (diet === 'spicy') return (it.spice ?? 0) > 0;
    if (diet === 'favs') return has(`${secTitle}-${it.name}`);
    return it.tags?.includes(diet) ?? false;
  };

  const base = active === 'All' ? menu : menu.filter((s) => s.title === active);
  const q = query.trim().toLowerCase();
  const sections = base
    .map((s) => ({
      ...s,
      items: s.items.filter(
        (it) =>
          matchesDiet(s.title, it) &&
          (!q ||
            it.name.toLowerCase().includes(q) ||
            (it.desc?.toLowerCase().includes(q) ?? false))
      ),
    }))
    .filter((s) => s.items.length > 0);
  const resultCount = sections.reduce((n, s) => n + s.items.length, 0);

  const dietChips: { key: Diet; label: string; icon: string }[] = [
    { key: 'veg', label: t('fl.veg'), icon: '🌱' },
    { key: 'seafood', label: t('fl.seafood'), icon: '🐟' },
    { key: 'spicy', label: t('fl.spicy'), icon: '🌶' },
    { key: 'favs', label: t('fl.favs'), icon: '♥' },
  ];

  return (
    <div>
      {/* search */}
      <div className="mb-6 relative max-w-md">
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('menu.search')}
          data-cursor
          className="w-full rounded-full border border-ash/15 bg-coal/60 py-3 pl-11 pr-10 text-sm text-ash outline-none placeholder:text-ash/30 focus:border-magma"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            data-cursor
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ash/50 hover:text-magma"
          >
            ✕
          </button>
        )}
      </div>

      <div className="mb-12 flex flex-wrap gap-3">
        {cats.map((c) => {
          const label =
            c === 'All'
              ? t('menu.all')
              : (lang === 'es' && menu.find((s) => s.title === c)?.titleEs) || c;
          return (
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
              {label}
            </button>
          );
        })}
      </div>

      {/* diet / spice / favorites filters */}
      <div className="-mt-6 mb-12 flex flex-wrap gap-2">
        {dietChips.map((d) => (
          <button
            key={d.key}
            onClick={() => setDiet((cur) => (cur === d.key ? null : d.key))}
            data-cursor
            aria-pressed={diet === d.key}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-colors ${
              diet === d.key
                ? 'border-acid bg-acid/15 text-acid'
                : 'border-ash/15 text-ash/55 hover:border-acid/50 hover:text-acid'
            }`}
          >
            <span aria-hidden>{d.icon}</span>
            {d.label}
          </button>
        ))}
      </div>

      {q && (
        <p className="mb-8 text-sm text-ash/50">
          {resultCount} {resultCount === 1 ? t('menu.resultFor') : t('menu.resultsFor')}{' '}
          &ldquo;{query}&rdquo;
        </p>
      )}

      {resultCount === 0 ? (
        <div className="py-20 text-center">
          <p className="kinetic text-3xl text-ash/70">{t('menu.none')}</p>
          <p className="mt-2 text-sm text-ash/50">{t('menu.noneSub')}</p>
          <button
            onClick={() => {
              setQuery('');
              setActive('All');
              setDiet(null);
            }}
            data-cursor
            className="mt-5 rounded-full border border-magma/50 px-6 py-2 text-xs uppercase tracking-widest text-magma hover:bg-magma hover:text-obsidian"
          >
            {t('menu.reset')}
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          {sections.map((sec) => (
          <div key={sec.title}>
            <div className="mb-6 flex items-baseline gap-4">
              <h2 className="kinetic text-3xl text-magma-grad md:text-4xl">
                {(lang === 'es' && sec.titleEs) || sec.title}
              </h2>
              {(lang === 'es' ? sec.noteEs : sec.note) && (
                <p className="text-sm italic text-ash/50">
                  {lang === 'es' ? sec.noteEs : sec.note}
                </p>
              )}
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
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="kinetic text-xl text-ash">
                          {it.name}
                          {(it.tags?.length || it.spice) && (
                            <span className="ml-2 align-middle text-sm" aria-hidden>
                              {it.tags?.includes('veg') && '🌱'}
                              {it.tags?.includes('seafood') && '🐟'}
                              {it.spice ? '🌶'.repeat(it.spice) : ''}
                            </span>
                          )}
                        </h3>
                        <div className="flex shrink-0 items-center gap-2">
                          {it.price && (
                            <span className="kinetic text-lg text-magma-grad">${it.price}</span>
                          )}
                          <FavButton id={id} />
                        </div>
                      </div>
                      {(lang === 'es' ? it.descEs || it.desc : it.desc) && (
                        <p className="mt-1 text-sm leading-snug text-ash/55">
                          {lang === 'es' ? it.descEs || it.desc : it.desc}
                        </p>
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
                            {added ? t('menu.added') : t('menu.add')}
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
      )}
    </div>
  );
}
