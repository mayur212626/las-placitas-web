'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { locations, hours } from '@/lib/data';
import { useLang } from './i18n/LanguageProvider';

const todayISO = () => new Date().toISOString().slice(0, 10);

/** Half-hour seating slots for a date, from opening until 1h before close. */
function slotsFor(dateStr: string): string[] {
  const d = new Date(dateStr + 'T12:00:00');
  const day = hours[Number.isNaN(d.getDay()) ? new Date().getDay() : d.getDay()];
  const out: string[] = [];
  for (let h = day.open; h <= day.close - 1; h += 0.5) {
    const hr = Math.floor(h);
    const min = h % 1 ? '30' : '00';
    const period = hr >= 12 ? 'PM' : 'AM';
    const h12 = hr % 12 === 0 ? 12 : hr % 12;
    out.push(`${h12}:${min} ${period}`);
  }
  return out;
}

/** Reservation/order modal opened by any element with a [data-order] attribute. */
export default function OrderModal() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState('7:00 PM');
  const slots = slotsFor(date);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('[data-order]');
      if (t) {
        e.preventDefault();
        setSent(false);
        setOpen(true);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="glass relative z-10 w-full max-w-lg overflow-hidden rounded-3xl p-8"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-magma/20 blur-3xl" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              data-cursor
              className="absolute right-5 top-5 text-ash/60 transition hover:text-magma"
            >
              ✕
            </button>

            {!sent ? (
              <>
                <p className="text-xs uppercase tracking-[0.35em] text-magma">{t('order.kicker')}</p>
                <h3 className="mt-2 kinetic text-4xl text-ash">{t('order.title')}</h3>
                <form
                  className="mt-6 grid gap-4 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <input required placeholder={t('order.name')} className={inp} />
                  <input required placeholder={t('order.phone')} className={inp} />
                  <select className={inp} defaultValue={locations[0].name}>
                    {locations.map((l) => (
                      <option key={l.id}>{l.name}</option>
                    ))}
                  </select>
                  <select className={inp} defaultValue={`2 ${t('order.guests')}`}>
                    {[2, 4, 6, 8].map((g) => (
                      <option key={g}>
                        {g}
                        {g === 8 ? '+' : ''} {t('order.guests')}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={date}
                    min={todayISO()}
                    onChange={(e) => {
                      setDate(e.target.value || todayISO());
                      setTime('');
                    }}
                    className={inp}
                  />
                  <select
                    value={time || slots[Math.min(16, slots.length - 1)]}
                    onChange={(e) => setTime(e.target.value)}
                    aria-label={t('order.time')}
                    className={inp}
                  >
                    {slots.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    data-cursor
                    className="sm:col-span-2 rounded-full bg-magma px-6 py-3 text-sm font-semibold uppercase tracking-widest text-obsidian transition-transform hover:scale-[1.02]"
                  >
                    {t('order.request')}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-magma/15 text-3xl text-magma">
                  ✓
                </div>
                <h3 className="kinetic text-3xl text-ash">{t('order.thanks')}</h3>
                <p className="mt-3 kinetic text-xl text-magma-grad">
                  {date} · {time || slots[Math.min(16, slots.length - 1)]}
                </p>
                <p className="mt-2 text-ash/65">{t('order.confirm')}</p>
                <button
                  onClick={() => setOpen(false)}
                  data-cursor
                  className="mt-6 rounded-full border border-ash/30 px-6 py-2 text-sm uppercase tracking-widest text-ash hover:border-magma hover:text-magma"
                >
                  {t('order.done')}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inp =
  'rounded-lg border border-ash/15 bg-obsidian/60 px-4 py-3 text-sm text-ash outline-none placeholder:text-ash/30 focus:border-magma';
