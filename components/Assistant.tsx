'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menu, type Item } from '@/lib/data';
import { useCart } from './cart/CartProvider';
import { useLang } from './i18n/LanguageProvider';

type Hit = { id: string; item: Item };
type Msg = { from: 'user' | 'bot'; text: string; hits?: Hit[] };

/** Rule-based menu concierge: understands tags, spice, price caps and keywords. */
function search(query: string): Hit[] {
  const q = query.toLowerCase();
  const wantVeg = /\bveg|vegetarian|vegetariano|sin carne\b/.test(q);
  const wantSea = /seafood|marisco|fish|pescado|shrimp|camar/.test(q);
  const wantSpicy = /spicy|picante|hot\b/.test(q);
  const priceCap = (() => {
    const m = q.match(/(?:under|below|less than|menos de|bajo)\s*\$?\s*(\d+)/);
    return m ? parseFloat(m[1]) : null;
  })();
  const words = q
    .replace(/[^a-záéíóúñü\s]/gi, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3);

  const hits: { hit: Hit; score: number }[] = [];
  for (const sec of menu) {
    for (const it of sec.items) {
      if (!it.price) continue;
      const price = parseFloat(it.price);
      if (priceCap !== null && price > priceCap) continue;
      if (wantVeg && !it.tags?.includes('veg')) continue;
      if (wantSea && !it.tags?.includes('seafood')) continue;
      if (wantSpicy && !(it.spice && it.spice > 0)) continue;

      let score = 0;
      if (wantVeg || wantSea || wantSpicy || priceCap !== null) score += 1;
      const hay = `${it.name} ${it.desc ?? ''} ${it.descEs ?? ''}`.toLowerCase();
      for (const w of words) if (hay.includes(w)) score += 2;
      if (score > 0) hits.push({ hit: { id: `${sec.title}-${it.name}`, item: it }, score });
    }
  }
  return hits
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((h) => h.hit);
}

export default function Assistant() {
  const { add } = useCart();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && msgs.length === 0) setMsgs([{ from: 'bot', text: t('as.hello') }]);
  }, [open, msgs.length, t]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput('');
    const hits = search(q);
    setMsgs((p) => [
      ...p,
      { from: 'user', text: q },
      hits.length
        ? { from: 'bot', text: t('as.found'), hits }
        : { from: 'bot', text: t('as.none') },
    ]);
  };

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor
        aria-label={t('as.open')}
        className="fixed bottom-6 right-24 z-[60] flex h-12 items-center gap-2 rounded-full border border-magma/50 bg-coal/90 px-4 text-magma shadow-lg shadow-magma/20 backdrop-blur transition-transform hover:scale-105"
      >
        <span aria-hidden>💬</span>
        <span className="hidden text-xs font-semibold uppercase tracking-widest sm:inline">
          {t('as.open')}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="glass fixed bottom-24 right-4 z-[85] flex h-[28rem] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border-magma/25"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <span className="kinetic text-lg text-ash">
                🌶 <span className="text-magma-grad">{t('as.title')}</span>
              </span>
              <button onClick={() => setOpen(false)} data-cursor aria-label="Close" className="text-ash/50 hover:text-magma">
                ✕
              </button>
            </div>

            <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div key={i} className={m.from === 'user' ? 'flex justify-end' : ''}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                      m.from === 'user'
                        ? 'bg-magma text-obsidian'
                        : 'bg-obsidian/60 text-ash/85'
                    }`}
                  >
                    {m.text}
                    {m.hits && (
                      <div className="mt-2 space-y-2">
                        {m.hits.map(({ id, item }) => (
                          <div
                            key={id}
                            className="flex items-center justify-between gap-2 rounded-xl border border-ash/10 bg-coal/70 px-3 py-2"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm text-ash">
                                {item.name}{' '}
                                <span aria-hidden className="text-xs">
                                  {item.tags?.includes('veg') && '🌱'}
                                  {item.tags?.includes('seafood') && '🐟'}
                                  {item.spice ? '🌶'.repeat(item.spice) : ''}
                                </span>
                              </p>
                              <p className="text-xs text-magma-grad">${item.price}</p>
                            </div>
                            <button
                              onClick={() =>
                                add({ id, name: item.name, price: parseFloat(item.price!) })
                              }
                              data-cursor
                              className="shrink-0 rounded-full border border-magma/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-magma hover:bg-magma hover:text-obsidian"
                            >
                              +
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={send} className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('as.placeholder')}
                className="min-w-0 flex-1 rounded-full border border-ash/15 bg-obsidian/60 px-4 py-2.5 text-sm text-ash outline-none placeholder:text-ash/30 focus:border-magma"
              />
              <button
                type="submit"
                data-cursor
                aria-label="Send"
                className="shrink-0 rounded-full bg-magma px-4 text-sm font-bold text-obsidian"
              >
                →
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
