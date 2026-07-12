'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from './i18n/LanguageProvider';

export const ACTIVE_KEY = 'lp-active-order';

// stage start times in seconds since order placed (demo pacing)
const STAGES = [
  { key: 'trk.received', at: 0, icon: '🧾' },
  { key: 'trk.preparing', at: 25, icon: '🔪' },
  { key: 'trk.fire', at: 70, icon: '🔥' },
  { key: 'trk.ready', at: 150, icon: '✅' },
];
const EXPIRE_S = 1800; // drop tracked order after 30 min

export type ActiveOrder = { no: string; placedAt: number; total: number };

export function readActiveOrder(): ActiveOrder | null {
  try {
    const raw = localStorage.getItem(ACTIVE_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as ActiveOrder;
    if ((Date.now() - o.placedAt) / 1000 > EXPIRE_S) {
      localStorage.removeItem(ACTIVE_KEY);
      return null;
    }
    return o;
  } catch {
    return null;
  }
}

/** Domino's-style staged progress for the active order. */
export default function OrderTracker({ order }: { order: ActiveOrder }) {
  const { t } = useLang();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = (now - order.placedAt) / 1000;
  const stageIdx = STAGES.reduce((acc, s, i) => (elapsed >= s.at ? i : acc), 0);
  const last = STAGES[STAGES.length - 1];
  const progress = Math.min(1, elapsed / last.at);
  const etaMin = Math.max(0, Math.ceil((last.at - elapsed) / 60));

  return (
    <div className="w-full">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-[0.3em] text-magma">{t('trk.title')}</span>
        <span className="kinetic text-lg text-magma-grad">{order.no}</span>
      </div>

      {/* progress rail */}
      <div className="relative mt-4 h-1.5 rounded-full bg-ash/10">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-magma to-ember"
          animate={{ width: `${progress * 100}%` }}
          transition={{ ease: 'linear', duration: 0.9 }}
        />
      </div>

      <ol className="mt-5 space-y-3">
        {STAGES.map((s, i) => {
          const done = i <= stageIdx;
          const current = i === stageIdx && i < STAGES.length - 1;
          return (
            <li key={s.key} className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition-colors ${
                  done ? 'border-magma bg-magma/15' : 'border-ash/15 opacity-40'
                } ${current ? 'animate-glowPulse' : ''}`}
              >
                {s.icon}
              </span>
              <span className={`text-sm ${done ? 'text-ash' : 'text-ash/35'}`}>{t(s.key)}</span>
              {done && i === stageIdx && i === STAGES.length - 1 && (
                <span className="ml-auto text-xs font-semibold uppercase tracking-widest text-acid">✓</span>
              )}
            </li>
          );
        })}
      </ol>

      {stageIdx < STAGES.length - 1 && (
        <p className="mt-4 text-xs text-ash/50">
          {t('trk.eta')}: ~{etaMin} min
        </p>
      )}
    </div>
  );
}

/** Floating chip shown while an order is being tracked. */
export function TrackChip({ onClick }: { onClick: () => void }) {
  const { t } = useLang();
  const [active, setActive] = useState<ActiveOrder | null>(null);

  useEffect(() => {
    const check = () => setActive(readActiveOrder());
    check();
    const id = setInterval(check, 5000);
    window.addEventListener('lp:order', check);
    return () => {
      clearInterval(id);
      window.removeEventListener('lp:order', check);
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.button
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          onClick={onClick}
          data-cursor
          className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full border border-magma/50 bg-coal/90 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-magma shadow-lg shadow-magma/20 backdrop-blur transition-transform hover:scale-105"
        >
          <span className="h-2 w-2 animate-glowPulse rounded-full bg-magma" />
          {t('trk.chip')} · {active.no}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
