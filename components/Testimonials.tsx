'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/lib/data';
import { useLang } from './i18n/LanguageProvider';

/** Auto-rotating guest reviews with star ratings. */
export default function Testimonials() {
  const { t, lang } = useLang();
  const [i, setI] = useState(0);
  const n = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % n), 4500);
    return () => clearInterval(id);
  }, [n]);

  const cur = testimonials[i];

  return (
    <section className="bg-coal py-28">
      <div className="container-x text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-magma">{t('tst.kicker')}</p>
        <h2 className="mt-3 kinetic text-5xl text-ash md:text-7xl">
          {t('tst.title1')} <span className="text-magma-grad">{t('tst.title2')}</span>
        </h2>

        <div className="relative mx-auto mt-14 min-h-[180px] max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-4 text-xl tracking-[0.3em] text-magma" aria-label={`${cur.stars} stars`}>
                {'★'.repeat(cur.stars)}
                <span className="text-ash/20">{'★'.repeat(5 - cur.stars)}</span>
              </div>
              <blockquote className="text-xl leading-relaxed text-ash/85 md:text-2xl">
                &ldquo;{lang === 'es' ? cur.es : cur.en}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-[0.3em] text-ash/50">
                — {cur.name}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              data-cursor
              aria-label={`Review ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                idx === i ? 'w-6 bg-magma' : 'w-2 bg-ash/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
