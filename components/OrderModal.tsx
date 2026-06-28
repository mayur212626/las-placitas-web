'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '@/lib/data';

/** Reservation/order modal opened by any element with a [data-order] attribute. */
export default function OrderModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

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
                <p className="text-xs uppercase tracking-[0.35em] text-magma">Reserve a table</p>
                <h3 className="mt-2 kinetic text-4xl text-ash">Book Las Placitas</h3>
                <form
                  className="mt-6 grid gap-4 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <input required placeholder="Name" className={inp} />
                  <input required placeholder="Phone" className={inp} />
                  <select className={inp} defaultValue={locations[0].name}>
                    {locations.map((l) => (
                      <option key={l.id}>{l.name}</option>
                    ))}
                  </select>
                  <select className={inp} defaultValue="2 guests">
                    {['2 guests', '4 guests', '6 guests', '8+ guests'].map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                  <input type="date" className={`${inp} sm:col-span-2`} />
                  <button
                    type="submit"
                    data-cursor
                    className="sm:col-span-2 rounded-full bg-magma px-6 py-3 text-sm font-semibold uppercase tracking-widest text-obsidian transition-transform hover:scale-[1.02]"
                  >
                    Request Reservation
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-magma/15 text-3xl text-magma">
                  ✓
                </div>
                <h3 className="kinetic text-3xl text-ash">¡Gracias!</h3>
                <p className="mt-2 text-ash/65">
                  Request received. We&rsquo;ll call to confirm your table.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  data-cursor
                  className="mt-6 rounded-full border border-ash/30 px-6 py-2 text-sm uppercase tracking-widest text-ash hover:border-magma hover:text-magma"
                >
                  Done
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
