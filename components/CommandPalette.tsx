'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menu } from '@/lib/data';
import { useCart } from './cart/CartProvider';
import { useLang } from './i18n/LanguageProvider';

type Entry =
  | { type: 'page'; label: string; href: string }
  | { type: 'dish'; label: string; sub?: string; price: number; id: string }
  | { type: 'action'; label: string; run: () => void };

/** Ctrl/Cmd+K command palette: jump to pages, add dishes, run actions. */
export default function CommandPalette() {
  const { add, open: openCart } = useCart();
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // open via Ctrl/Cmd+K or the navbar button (custom event)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('lp:palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('lp:palette', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const entries = useMemo<Entry[]>(() => {
    const pages: Entry[] = [
      { type: 'page', label: t('nav.home'), href: '/' },
      { type: 'page', label: t('nav.menu'), href: '/menu' },
      { type: 'page', label: t('nav.specials'), href: '/specials' },
      { type: 'page', label: t('nav.contact'), href: '/locations' },
    ];
    const dishes: Entry[] = menu.flatMap((s) =>
      s.items
        .filter((it) => it.price && !Number.isNaN(parseFloat(it.price)))
        .map((it) => ({
          type: 'dish' as const,
          label: it.name,
          sub: lang === 'es' ? it.descEs || it.desc : it.desc,
          price: parseFloat(it.price!),
          id: `${s.title}-${it.name}`,
        }))
    );
    const actions: Entry[] = [
      { type: 'action', label: t('pal.openCart'), run: () => openCart() },
      {
        type: 'action',
        label: t('pal.reserve'),
        run: () => (document.querySelector('[data-order]') as HTMLElement | null)?.click(),
      },
      { type: 'action', label: t('pal.lang'), run: () => setLang(lang === 'en' ? 'es' : 'en') },
    ];
    return [...pages, ...dishes, ...actions];
  }, [t, lang, openCart, setLang]);

  const q = query.trim().toLowerCase();
  const results = q
    ? entries.filter(
        (e) =>
          e.label.toLowerCase().includes(q) ||
          (e.type === 'dish' && e.sub?.toLowerCase().includes(q))
      )
    : entries;

  const select = (e: Entry) => {
    if (e.type === 'page') {
      setOpen(false);
      window.location.href = e.href;
    } else if (e.type === 'dish') {
      add({ id: e.id, name: e.label, price: e.price });
      setOpen(false);
    } else {
      setOpen(false);
      setTimeout(e.run, 80);
    }
  };

  const onKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[index]) {
      e.preventDefault();
      select(results[index]);
    }
  };

  const typeLabel = (tp: Entry['type']) =>
    tp === 'page' ? t('pal.pages') : tp === 'dish' ? t('pal.dishes') : t('pal.actions');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ y: -14, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="glass relative z-10 w-full max-w-lg overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-magma" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onKeyNav}
                placeholder={t('pal.placeholder')}
                className="w-full bg-transparent text-sm text-ash outline-none placeholder:text-ash/35"
              />
              <kbd className="hidden shrink-0 rounded border border-ash/20 px-1.5 py-0.5 text-[10px] text-ash/50 sm:block">
                ESC
              </kbd>
            </div>

            <ul className="max-h-[46vh] overflow-y-auto py-2">
              {results.length === 0 && (
                <li className="px-5 py-6 text-center text-sm text-ash/45">{t('pal.empty')}</li>
              )}
              {results.slice(0, 40).map((e, i) => (
                <li key={`${e.type}-${e.label}-${i}`}>
                  <button
                    onClick={() => select(e)}
                    onMouseEnter={() => setIndex(i)}
                    data-cursor
                    className={`flex w-full items-center justify-between gap-3 px-5 py-2.5 text-left transition-colors ${
                      i === index ? 'bg-magma/15' : ''
                    }`}
                  >
                    <span className="min-w-0">
                      <span className={`block truncate text-sm ${i === index ? 'text-magma' : 'text-ash'}`}>
                        {e.label}
                        {e.type === 'dish' && (
                          <span className="ml-2 text-magma-grad">${e.price.toFixed(2)}</span>
                        )}
                      </span>
                      {e.type === 'dish' && e.sub && (
                        <span className="block truncate text-xs text-ash/45">{e.sub}</span>
                      )}
                    </span>
                    <span className="shrink-0 rounded-full border border-ash/15 px-2 py-0.5 text-[9px] uppercase tracking-widest text-ash/40">
                      {typeLabel(e.type)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/10 px-5 py-2.5 text-[10px] uppercase tracking-widest text-ash/35">
              ↑↓ {t('pal.hint')}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
