'use client';

import { useLang } from '@/components/i18n/LanguageProvider';
import Reveal from '@/components/Reveal';

type Ev = {
  icon: string;
  en: string; es: string;
  descEn: string; descEs: string;
  /** 0=Sun..6=Sat */
  weekday: number;
  hour: number;
  durationH: number;
};

const EVENTS: Ev[] = [
  { icon: '🌮', en: 'Taco Tuesday', es: 'Martes de Tacos', descEn: '$2 off every taco platter, all night.', descEs: '$2 de descuento en cada platillo de tacos, toda la noche.', weekday: 2, hour: 17, durationH: 5 },
  { icon: '🎺', en: 'Mariachi Fridays', es: 'Viernes de Mariachi', descEn: 'Live mariachi from 7pm. No cover.', descEs: 'Mariachi en vivo desde las 7pm. Sin cover.', weekday: 5, hour: 19, durationH: 3 },
  { icon: '💃', en: 'Salsa Night', es: 'Noche de Salsa', descEn: 'DJ + dance floor every Saturday. Margarita specials.', descEs: 'DJ + pista de baile cada sábado. Especiales de margaritas.', weekday: 6, hour: 21, durationH: 4 },
  { icon: '🍹', en: 'Margarita Happy Hour', es: 'Happy Hour de Margaritas', descEn: 'Weekdays 4–7pm: house margaritas $7.', descEs: 'Entre semana 4–7pm: margaritas de la casa a $7.', weekday: 4, hour: 16, durationH: 3 },
];

function nextDate(weekday: number, hour: number): Date {
  const d = new Date();
  d.setHours(hour, 0, 0, 0);
  let add = (weekday - d.getDay() + 7) % 7;
  if (add === 0 && d.getTime() < Date.now()) add = 7;
  d.setDate(d.getDate() + add);
  return d;
}

function icsFor(ev: Ev, lang: 'en' | 'es') {
  const start = nextDate(ev.weekday, ev.hour);
  const end = new Date(start.getTime() + ev.durationH * 3600000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z/, 'Z');
  const title = lang === 'es' ? ev.es : ev.en;
  const desc = lang === 'es' ? ev.descEs : ev.descEn;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Las Placitas//Events//EN',
    'BEGIN:VEVENT',
    `UID:${ev.en.replace(/\s/g, '')}-${fmt(start)}@lasplacitas`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title} — Las Placitas`,
    `DESCRIPTION:${desc}`,
    'LOCATION:1100 8th St SE\\, Washington\\, DC 20003',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${ev.en.toLowerCase().replace(/\s/g, '-')}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export default function EventsPage() {
  const { lang } = useLang();
  return (
    <main className="min-h-screen pb-28 pt-32">
      <div className="container-x max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-magma">
          {lang === 'es' ? 'Eventos' : 'Events'}
        </p>
        <h1 className="mt-3 kinetic text-5xl text-ash md:text-7xl">
          {lang === 'es' ? 'La casa' : 'Always'}{' '}
          <span className="text-magma-grad">{lang === 'es' ? 'siempre viva' : 'something on'}</span>
        </h1>

        <div className="mt-12 space-y-5">
          {EVENTS.map((ev, i) => {
            const d = nextDate(ev.weekday, ev.hour);
            return (
              <Reveal key={ev.en} delay={i * 70}>
                <article className="glass flex flex-col items-start justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:items-center">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl" aria-hidden>{ev.icon}</span>
                    <div>
                      <h2 className="kinetic text-2xl text-ash">{lang === 'es' ? ev.es : ev.en}</h2>
                      <p className="mt-1 text-sm text-ash/60">{lang === 'es' ? ev.descEs : ev.descEn}</p>
                      <p className="mt-1 text-xs uppercase tracking-widest text-magma">
                        {d.toLocaleDateString(lang === 'es' ? 'es' : 'en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        ·{' '}
                        {d.toLocaleTimeString(lang === 'es' ? 'es' : 'en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => icsFor(ev, lang)}
                    data-cursor
                    className="shrink-0 rounded-full border border-magma/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-magma transition-colors hover:bg-magma hover:text-obsidian"
                  >
                    📅 {lang === 'es' ? 'Añadir al calendario' : 'Add to calendar'}
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </main>
  );
}
