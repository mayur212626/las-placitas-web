'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Toast = { id: number; msg: string; icon?: string };
type Ctx = { toast: (msg: string, icon?: string) => void };

const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const toast = useCallback((msg: string, icon = '✓') => {
    const id = ++idRef.current;
    setToasts((p) => [...p.slice(-3), { id, msg, icon }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 2600);
  }, []);

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed right-4 top-20 z-[97] flex w-72 flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="glass flex items-center gap-3 rounded-xl border-magma/30 px-4 py-3 shadow-lg shadow-black/40"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-acid/15 text-xs text-acid">
                {t.icon}
              </span>
              <span className="text-sm text-ash">{t.msg}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const c = useContext(ToastCtx);
  if (!c) throw new Error('useToast must be used within ToastProvider');
  return c;
}
