'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Order = { no: string; date: number; items: { name: string; qty: number }[]; total: number };

const STAGES = [
  { label: 'Received', icon: '🧾', at: 0 },
  { label: 'Preparing', icon: '🔪', at: 25 },
  { label: 'On the fire', icon: '🔥', at: 70 },
  { label: 'Ready', icon: '✅', at: 150 },
];

function stageFor(placedAt: number, now: number) {
  const s = (now - placedAt) / 1000;
  return STAGES.reduce((acc, st, i) => (s >= st.at ? i : acc), 0);
}

/** Restaurant-side kitchen display: this device's orders moving through the line. */
export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const load = () => {
      try {
        setOrders(JSON.parse(localStorage.getItem('lp-orders') || '[]'));
      } catch {
        setOrders([]);
      }
      setNow(Date.now());
    };
    load();
    const id = setInterval(load, 2000);
    return () => clearInterval(id);
  }, []);

  const active = orders.filter((o) => (now - o.date) / 1000 < 1800);
  const done = orders.filter((o) => (now - o.date) / 1000 >= 1800);

  return (
    <main className="min-h-screen pb-28 pt-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-magma">Staff tools · Kitchen display</p>
            <h1 className="mt-3 kinetic text-5xl text-ash md:text-7xl">
              The <span className="text-magma-grad">Line</span>
            </h1>
          </div>
          <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-acid">
            <span className="h-2 w-2 animate-glowPulse rounded-full bg-acid" /> Live · updates every 2s
          </span>
        </div>
        <p className="mt-3 max-w-xl text-sm text-ash/50">
          Demo screen: shows orders placed from this device moving through the kitchen.
          Place an order from the menu and watch it appear here.
        </p>

        {active.length === 0 && (
          <div className="mt-16 rounded-3xl border border-dashed border-ash/20 p-16 text-center">
            <p className="text-5xl" aria-hidden>🍳</p>
            <p className="mt-4 kinetic text-2xl text-ash/60">No tickets on the line</p>
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {active.map((o) => {
            const st = stageFor(o.date, now);
            const mins = Math.floor((now - o.date) / 60000);
            return (
              <motion.article
                key={o.no}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass rounded-2xl p-5 ${st === 3 ? 'border-acid/50' : 'border-magma/25'}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="kinetic text-2xl text-magma-grad">{o.no}</span>
                  <span className="text-xs text-ash/45">{mins}m · ${o.total.toFixed(2)}</span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-ash/80">
                  {o.items.map((it, i) => (
                    <li key={i}>
                      <span className="text-magma">{it.qty}×</span> {it.name}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-1.5">
                  {STAGES.map((s, i) => (
                    <span
                      key={s.label}
                      className={`flex-1 rounded-full py-1 text-center text-[10px] uppercase tracking-wider ${
                        i < st
                          ? 'bg-magma/20 text-magma'
                          : i === st
                            ? `${st === 3 ? 'bg-acid text-obsidian' : 'bg-magma text-obsidian'} animate-glowPulse`
                            : 'bg-ash/5 text-ash/30'
                      }`}
                    >
                      {s.icon}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-center text-xs uppercase tracking-widest text-ash/55">
                  {STAGES[st].label}
                </p>
              </motion.article>
            );
          })}
        </div>

        {done.length > 0 && (
          <>
            <h2 className="mt-16 text-xs uppercase tracking-[0.3em] text-ash/40">Completed</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {done.map((o) => (
                <span key={o.no} className="rounded-full border border-ash/15 px-4 py-1.5 text-xs text-ash/50">
                  {o.no} · ${o.total.toFixed(2)}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
