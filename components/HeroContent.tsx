'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedHeading from './motion/AnimatedHeading';
import Magnetic from './motion/Magnetic';
import { useLang } from './i18n/LanguageProvider';

/** Hero text overlay that lifts + fades away as the camera dives into the crater. */
export default function HeroContent({ since }: { since: number }) {
  const { t, lang } = useLang();
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(800);
  useEffect(() => {
    const set = () => setVh(window.innerHeight);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  const opacity = useTransform(scrollY, [0, vh * 0.4], [1, 0]);
  const y = useTransform(scrollY, [0, vh * 0.6], [0, -vh * 0.35]);
  const scale = useTransform(scrollY, [0, vh * 0.6], [1, 0.86]);
  const blur = useTransform(scrollY, [0, vh * 0.4], ['blur(0px)', 'blur(6px)']);

  return (
    <motion.div
      style={{ opacity, y, scale, filter: blur }}
      className="container-x absolute bottom-16 left-1/2 z-10 -translate-x-1/2"
    >
      {/* editorial kicker */}
      <div className="mb-7 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 animate-glowPulse items-center justify-center rounded-full border border-magma/50 bg-magma/10 text-magma shadow-[0_0_20px_rgba(255,94,26,0.45)]">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M12 2c1 3-1 4-2 6-1 1.6-1 3 .3 4 .9-.6 1-1.6 1-2.7 1.8 1.3 3 3 3 5.2A4.6 4.6 0 0 1 12 22a5 5 0 0 1-5-5c0-3.6 2.8-5.4 4-9 .4-1.3.6-3.7 1-6Z" />
          </svg>
        </span>
        <span className="h-px w-8 shrink-0 bg-gradient-to-r from-magma to-transparent" />
        <span className="font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-ash/85 md:text-xs md:tracking-[0.4em]">
          {t('hero.kicker1')}
          <span className="mx-2 text-magma/80">/</span>
          {t('hero.kicker2')}
          <span className="mx-2 text-magma/80">/</span>
          <span className="text-magma">{t('hero.est')}</span>
        </span>
      </div>

      <h1 className="kinetic text-[16vw] leading-[0.8] text-ash glow-magma md:text-[13vw]">
        <span className="block text-magma-grad">Las</span>
        <span className="block text-outline">Placitas</span>
      </h1>

      <div className="mt-8 grid items-end gap-8 md:grid-cols-[1fr_auto]">
        <AnimatedHeading
          key={lang}
          lines={[t('hero.sub1'), t('hero.sub2')]}
          accentWords={[lang === 'es' ? 'fuego' : 'fire']}
          delay={0.3}
          className="kinetic text-3xl text-ash/90 md:text-5xl"
        />
        <div className="flex flex-wrap gap-4">
          <Magnetic
            href="#menu"
            className="inline-block rounded-full bg-magma px-8 py-3 text-sm font-semibold uppercase tracking-widest text-obsidian shadow-lg shadow-magma/30"
          >
            {t('hero.viewMenu')}
          </Magnetic>
          <Magnetic
            href="#locations"
            className="inline-block rounded-full border border-ash/30 px-8 py-3 text-sm uppercase tracking-widest text-ash"
          >
            {t('hero.findUs')}
          </Magnetic>
        </div>
      </div>
    </motion.div>
  );
}
