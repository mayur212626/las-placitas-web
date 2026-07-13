'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, type CartItem } from './CartProvider';
import { useLang } from '../i18n/LanguageProvider';
import { useToast } from '../ToastProvider';
import EmberBurst from '../EmberBurst';
import OrderTracker, { readActiveOrder, ACTIVE_KEY, type ActiveOrder } from '../OrderTracker';
import { locations, promoCodes } from '@/lib/data';

const TAX_RATE = 0.1;
const TIPS = [0, 0.15, 0.18, 0.2];
const ORDERS_KEY = 'lp-orders';

type PastOrder = { no: string; date: number; items: CartItem[]; total: number };

export default function CartDrawer() {
  const { items, total, count, isOpen, close, setQty, remove, clear, addMany, open } = useCart();
  const { t, lang } = useLang();
  const { toast } = useToast();
  const [view, setView] = useState<'cart' | 'checkout' | 'done' | 'track'>('cart');
  const [pickup, setPickup] = useState(locations[0].name);
  const [time, setTime] = useState('asap');
  const [tipPct, setTipPct] = useState(0.18);
  const [customTip, setCustomTip] = useState<string | null>(null); // null = percent mode
  const [orderNo, setOrderNo] = useState('');
  const [past, setPast] = useState<PastOrder[]>([]);
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState<{ code: string; pct: number } | null>(null);
  const [tracked, setTracked] = useState<ActiveOrder | null>(null);

  // the floating chip asks us to open in tracking view
  useEffect(() => {
    const onTrack = () => {
      const o = readActiveOrder();
      if (o) {
        setTracked(o);
        setView('track');
        open();
      }
    };
    window.addEventListener('lp:track', onTrack);
    return () => window.removeEventListener('lp:track', onTrack);
  }, [open]);

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    const def = promoCodes[code];
    if (!def || (def.min && total < def.min)) {
      toast(t('promo.invalid'), '✕');
      return;
    }
    setPromo({ code, pct: def.pct });
    toast(`${t('toast.promo')}: ${code} −${def.pct}%`, '🏷');
  };

  // refresh past orders whenever the drawer opens
  useEffect(() => {
    if (!isOpen) return;
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      setPast(raw ? JSON.parse(raw) : []);
    } catch {
      setPast([]);
    }
  }, [isOpen, view]);

  const discount = promo ? (total * promo.pct) / 100 : 0;
  const base = total - discount;
  const tax = base * TAX_RATE;
  const tip =
    customTip !== null ? Math.max(0, parseFloat(customTip) || 0) : base * tipPct;
  const grand = base + tax + tip;

  // pickup time options: ASAP + next few half-hour slots
  const slots = ['asap'];
  const now = new Date();
  for (let i = 1; i <= 5; i++) {
    const d = new Date(now.getTime() + i * 30 * 60000);
    slots.push(
      d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    );
  }

  const placeOrder = () => {
    const no = 'LP-' + Math.floor(1000 + Math.random() * 9000);
    setOrderNo(no);
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      const prev: PastOrder[] = raw ? JSON.parse(raw) : [];
      const next = [{ no, date: Date.now(), items, total: grand }, ...prev].slice(0, 5);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
      const active: ActiveOrder = { no, placedAt: Date.now(), total: grand };
      localStorage.setItem(ACTIVE_KEY, JSON.stringify(active));
      setTracked(active);
      window.dispatchEvent(new Event('lp:order'));
    } catch {
      /* ignore */
    }
    setPromo(null);
    setPromoInput('');
    setCustomTip(null);
    clear();
    setView('done');
  };

  const closeAll = () => {
    close();
    setTimeout(() => setView('cart'), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[88] bg-obsidian/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAll}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[89] flex h-full w-full max-w-md flex-col bg-coal shadow-2xl shadow-black/50"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <h2 className="kinetic text-2xl text-ash">
                {view === 'checkout' ? t('co.checkout') : t('cart.title')}{' '}
                {view === 'cart' && count > 0 && (
                  <span className="text-magma-grad">({count})</span>
                )}
              </h2>
              <button onClick={closeAll} data-cursor aria-label="Close" className="text-ash/60 transition hover:text-magma">
                ✕
              </button>
            </div>

            {view === 'done' ? (
              <div className="relative flex flex-1 flex-col items-center gap-4 overflow-y-auto p-8 text-center">
                <EmberBurst />
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-magma/15 text-2xl text-magma">
                  ✓
                </div>
                <h3 className="kinetic text-3xl text-ash">{t('cart.placed')}</h3>
                <div className="rounded-xl border border-magma/30 bg-magma/5 px-6 py-3">
                  <p className="text-xs uppercase tracking-widest text-ash/50">{t('co.orderNo')}</p>
                  <p className="kinetic text-3xl text-magma-grad">{orderNo}</p>
                </div>
                <p className="max-w-xs text-sm text-ash/60">{t('co.confirm')}</p>
                {tracked && (
                  <div className="mt-4 w-full rounded-2xl border border-white/10 bg-obsidian/40 p-5 text-left">
                    <OrderTracker order={tracked} />
                  </div>
                )}
                <button
                  onClick={closeAll}
                  data-cursor
                  className="mt-2 rounded-full bg-magma px-8 py-2.5 text-sm font-semibold uppercase tracking-widest text-obsidian"
                >
                  {t('order.done')}
                </button>
              </div>
            ) : view === 'track' && tracked ? (
              <div className="flex flex-1 flex-col overflow-y-auto p-8">
                <div className="rounded-2xl border border-white/10 bg-obsidian/40 p-5">
                  <OrderTracker order={tracked} />
                </div>
                <button
                  onClick={() => setView('cart')}
                  data-cursor
                  className="mt-6 w-full text-center text-xs uppercase tracking-widest text-ash/40 hover:text-magma"
                >
                  {t('co.back')}
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-1 flex-col overflow-y-auto p-8">
                <div className="flex flex-col items-center gap-3 text-center">
                  <p className="kinetic text-2xl text-ash/70">{t('cart.empty')}</p>
                  <p className="text-sm text-ash/50">{t('cart.emptySub')}</p>
                  <a
                    href="/menu"
                    onClick={closeAll}
                    className="mt-2 rounded-full border border-magma/50 px-6 py-2 text-xs uppercase tracking-widest text-magma hover:bg-magma hover:text-obsidian"
                  >
                    {t('cart.browse')}
                  </a>
                </div>

                {past.length > 0 && (
                  <div className="mt-10">
                    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-magma">
                      {t('ord.past')}
                    </p>
                    <ul className="space-y-3">
                      {past.map((o) => (
                        <li
                          key={o.no}
                          className="glass flex items-center justify-between gap-3 rounded-xl p-4"
                        >
                          <div className="min-w-0">
                            <p className="text-sm text-ash">
                              <span className="text-magma">{o.no}</span> ·{' '}
                              {new Date(o.date).toLocaleDateString(
                                lang === 'es' ? 'es' : 'en-US',
                                { month: 'short', day: 'numeric' }
                              )}
                            </p>
                            <p className="truncate text-xs text-ash/50">
                              {o.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}
                            </p>
                          </div>
                          <button
                            onClick={() => addMany(o.items)}
                            data-cursor
                            className="shrink-0 rounded-full bg-magma px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-obsidian transition-transform hover:scale-105"
                          >
                            {t('ord.reorder')}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : view === 'checkout' ? (
              <>
                <div className="flex-1 space-y-6 overflow-y-auto p-6">
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-ash/60">{t('co.pickup')}</span>
                    <select
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-ash/15 bg-obsidian/60 px-4 py-3 text-sm text-ash outline-none focus:border-magma"
                    >
                      {locations.map((l) => (
                        <option key={l.id}>{l.name}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-ash/60">{t('co.time')}</span>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-ash/15 bg-obsidian/60 px-4 py-3 text-sm text-ash outline-none focus:border-magma"
                    >
                      {slots.map((s) => (
                        <option key={s} value={s}>
                          {s === 'asap' ? t('co.asap') : s}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-ash/60">{t('co.tip')}</span>
                    <div className="mt-2 grid grid-cols-5 gap-2">
                      {TIPS.map((tp) => (
                        <button
                          key={tp}
                          onClick={() => {
                            setTipPct(tp);
                            setCustomTip(null);
                          }}
                          data-cursor
                          className={`rounded-lg border py-2 text-sm font-semibold transition-colors ${
                            customTip === null && tipPct === tp
                              ? 'border-magma bg-magma text-obsidian'
                              : 'border-ash/20 text-ash/70 hover:border-magma'
                          }`}
                        >
                          {tp === 0 ? '—' : `${tp * 100}%`}
                        </button>
                      ))}
                      <button
                        onClick={() => setCustomTip((c) => (c === null ? '' : c))}
                        data-cursor
                        className={`rounded-lg border py-2 text-xs font-semibold uppercase transition-colors ${
                          customTip !== null
                            ? 'border-magma bg-magma text-obsidian'
                            : 'border-ash/20 text-ash/70 hover:border-magma'
                        }`}
                      >
                        {t('co.customTip')}
                      </button>
                    </div>
                    {customTip !== null && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg text-ash/60">$</span>
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          autoFocus
                          value={customTip}
                          onChange={(e) => setCustomTip(e.target.value)}
                          placeholder="5.00"
                          className="w-full rounded-lg border border-ash/15 bg-obsidian/60 px-4 py-2.5 text-sm text-ash outline-none placeholder:text-ash/25 focus:border-magma"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-ash/60">{t('promo.label')}</span>
                    <div className="mt-2 flex gap-2">
                      <input
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="FUEGO10"
                        className="min-w-0 flex-1 rounded-lg border border-ash/15 bg-obsidian/60 px-4 py-2.5 text-sm uppercase text-ash outline-none placeholder:text-ash/25 focus:border-magma"
                      />
                      <button
                        onClick={applyPromo}
                        data-cursor
                        className="rounded-lg border border-magma/50 px-4 text-xs font-semibold uppercase tracking-widest text-magma hover:bg-magma hover:text-obsidian"
                      >
                        {t('promo.apply')}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
                    <Row label={t('cart.subtotal')} value={total} />
                    {promo && (
                      <div className="flex justify-between text-acid">
                        <span>
                          {t('promo.discount')} ({promo.code})
                        </span>
                        <span className="tabular-nums">−${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <Row label={`${t('co.tax')} (10%)`} value={tax} />
                    <Row label={t('co.tip')} value={tip} />
                  </div>
                </div>

                <div className="border-t border-white/10 p-6">
                  <div className="mb-4 flex items-baseline justify-between">
                    <span className="text-sm uppercase tracking-widest text-ash/60">{t('co.total')}</span>
                    <span className="kinetic text-3xl text-magma-grad">${grand.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={placeOrder}
                    data-cursor
                    className="w-full rounded-full bg-magma py-3 text-sm font-semibold uppercase tracking-widest text-obsidian transition-transform hover:scale-[1.02]"
                  >
                    {t('co.place')}
                  </button>
                  <button
                    onClick={() => setView('cart')}
                    data-cursor
                    className="mt-3 w-full text-center text-xs uppercase tracking-widest text-ash/40 hover:text-magma"
                  >
                    {t('co.back')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-white/5 overflow-y-auto">
                  {items.map((it) => (
                    <li key={it.id} className="flex items-center gap-3 p-5">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-body text-ash">{it.name}</p>
                        <p className="text-sm text-ash/50">${it.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setQty(it.id, it.qty - 1)} data-cursor aria-label="Decrease" className="flex h-7 w-7 items-center justify-center rounded-full border border-ash/20 text-ash/70 hover:border-magma hover:text-magma">−</button>
                        <span className="w-6 text-center tabular-nums text-ash">{it.qty}</span>
                        <button onClick={() => setQty(it.id, it.qty + 1)} data-cursor aria-label="Increase" className="flex h-7 w-7 items-center justify-center rounded-full border border-ash/20 text-ash/70 hover:border-magma hover:text-magma">+</button>
                      </div>
                      <button onClick={() => remove(it.id)} data-cursor aria-label="Remove" className="ml-1 text-ash/40 transition hover:text-blood">✕</button>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 p-6">
                  <div className="mb-4 flex items-baseline justify-between">
                    <span className="text-sm uppercase tracking-widest text-ash/60">{t('cart.subtotal')}</span>
                    <span className="kinetic text-3xl text-magma-grad">${total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => setView('checkout')}
                    data-cursor
                    className="w-full rounded-full bg-magma py-3 text-sm font-semibold uppercase tracking-widest text-obsidian transition-transform hover:scale-[1.02]"
                  >
                    {t('cart.checkout')}
                  </button>
                  <button onClick={clear} data-cursor className="mt-3 w-full text-center text-xs uppercase tracking-widest text-ash/40 hover:text-blood">
                    {t('cart.clear')}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-ash/70">
      <span>{label}</span>
      <span className="tabular-nums">${value.toFixed(2)}</span>
    </div>
  );
}
