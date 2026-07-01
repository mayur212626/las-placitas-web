'use client';

import { useEffect, useState } from 'react';
import { hours } from '@/lib/data';
import { useLang } from './i18n/LanguageProvider';

function format(h: number) {
  const period = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}${period}`;
}

/** Live open/closed badge based on the current local time and today's hours. */
export default function OpenStatus({ className = '' }: { className?: string }) {
  const { t } = useLang();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const today = hours[now.getDay()];
  const h = now.getHours() + now.getMinutes() / 60;
  const open = h >= today.open && h < today.close;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`h-2 w-2 rounded-full ${open ? 'bg-acid animate-glowPulse' : 'bg-blood'}`}
      />
      <span className={`text-xs font-semibold uppercase tracking-widest ${open ? 'text-acid' : 'text-blood'}`}>
        {open ? t('hours.open') : t('hours.closed')}
      </span>
      <span className="text-xs text-ash/50">
        {open
          ? `${t('hours.until')} ${format(today.close)}`
          : `${t('hours.opens')} ${format(today.open)}`}
      </span>
    </span>
  );
}
