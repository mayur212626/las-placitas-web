'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from './i18n/LanguageProvider';

const KEY = 'lp-consent';

export default function CookieBanner() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="glass fixed inset-x-4 bottom-4 z-[70] mx-auto flex max-w-xl flex-col items-center gap-3 rounded-2xl border-magma/25 p-4 text-center sm:flex-row sm:text-left"
        >
          <span className="text-lg" aria-hidden>🍪</span>
          <p className="flex-1 text-xs leading-relaxed text-ash/70">
            {t('ck.msg')}{' '}
            <a href="/privacy" className="text-magma underline underline-offset-2">
              {t('ck.privacy')}
            </a>
          </p>
          <button
            onClick={accept}
            data-cursor
            className="shrink-0 rounded-full bg-magma px-5 py-2 text-xs font-semibold uppercase tracking-widest text-obsidian"
          >
            {t('ck.accept')}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
