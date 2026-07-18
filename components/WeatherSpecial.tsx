'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from './i18n/LanguageProvider';

type Wx = { temp: number; code: number };
const CACHE = 'lp-wx';

/** Weather-reactive specials strip — free open-meteo API, no key. */
export default function WeatherSpecial() {
  const { t } = useLang();
  const [wx, setWx] = useState<Wx | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CACHE);
      if (raw) {
        const c = JSON.parse(raw);
        if (Date.now() - c.at < 30 * 60000) {
          setWx(c.wx);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=38.9&longitude=-77.03&current=temperature_2m,weather_code&temperature_unit=fahrenheit'
    )
      .then((r) => r.json())
      .then((d) => {
        const w = { temp: d.current.temperature_2m as number, code: d.current.weather_code as number };
        setWx(w);
        try {
          sessionStorage.setItem(CACHE, JSON.stringify({ at: Date.now(), wx: w }));
        } catch {
          /* ignore */
        }
      })
      .catch(() => {});
  }, []);

  if (!wx) return null;

  const rainy = wx.code >= 51;
  const mood = rainy
    ? { icon: '🌧', msg: t('wx.rain'), href: '/menu', cta: t('wx.cta.menu') }
    : wx.temp >= 85
      ? { icon: '🥵', msg: t('wx.hot'), href: '/specials', cta: t('wx.cta.drinks') }
      : wx.temp <= 40
        ? { icon: '🥶', msg: t('wx.cold'), href: '/menu', cta: t('wx.cta.menu') }
        : { icon: '☀️', msg: t('wx.nice'), href: '/specials', cta: t('wx.cta.drinks') };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-magma/15 bg-gradient-to-r from-coal via-obsidian to-coal"
    >
      <div className="container-x flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center text-sm">
        <span aria-hidden>{mood.icon}</span>
        <span className="text-ash/75">
          {mood.msg} <span className="text-ash/40">({Math.round(wx.temp)}°F)</span>
        </span>
        <a href={mood.href} className="font-semibold uppercase tracking-widest text-magma underline-offset-4 hover:underline">
          {mood.cta} →
        </a>
      </div>
    </motion.div>
  );
}
