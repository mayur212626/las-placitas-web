'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/components/i18n/LanguageProvider';

const L = {
  kicker: { en: 'Catering', es: 'Catering' },
  title1: { en: 'Feed the', es: 'Alimenta a' },
  title2: { en: 'whole fiesta', es: 'toda la fiesta' },
  events: {
    en: ['Wedding', 'Birthday', 'Corporate', 'Quinceañera'],
    es: ['Boda', 'Cumpleaños', 'Corporativo', 'Quinceañera'],
  },
  guests: { en: 'Guests', es: 'Invitados' },
  step1: { en: 'Your event', es: 'Tu evento' },
  step2: { en: 'Pick your stations', es: 'Elige tus estaciones' },
  step3: { en: 'Your quote', es: 'Tu cotización' },
  next: { en: 'Next', es: 'Siguiente' },
  back: { en: 'Back', es: 'Atrás' },
  perPerson: { en: 'per person', es: 'por persona' },
  service: { en: 'Service & setup (10%)', es: 'Servicio y montaje (10%)' },
  total: { en: 'Estimated total', es: 'Total estimado' },
  print: { en: 'Print quote', es: 'Imprimir cotización' },
  call: { en: 'Call to book', es: 'Llama para reservar' },
  note: {
    en: 'Estimate only — final pricing confirmed by phone. Private parties up to 100 guests.',
    es: 'Solo estimado — el precio final se confirma por teléfono. Fiestas privadas hasta 100 invitados.',
  },
};

const PACKAGES = [
  { id: 'tacos', en: 'Taco Bar', es: 'Barra de Tacos', pp: 14, icon: '🌮' },
  { id: 'fajitas', en: 'Fajita Feast', es: 'Festín de Fajitas', pp: 19, icon: '🔥' },
  { id: 'pupusas', en: 'Pupusa Station', es: 'Estación de Pupusas', pp: 9, icon: '🫓' },
  { id: 'mariscos', en: 'Mariscos Table', es: 'Mesa de Mariscos', pp: 24, icon: '🦐' },
  { id: 'margs', en: 'Margarita Bar', es: 'Barra de Margaritas', pp: 12, icon: '🍹' },
];

export default function CateringPage() {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const [eventType, setEventType] = useState(0);
  const [guests, setGuests] = useState(40);
  const [picks, setPicks] = useState<string[]>(['tacos']);

  const l = <K extends keyof typeof L>(k: K) => (L[k] as { en: unknown; es: unknown })[lang] as never;
  const pp = picks.reduce((s, id) => s + (PACKAGES.find((p) => p.id === id)?.pp ?? 0), 0);
  const food = pp * guests;
  const service = food * 0.1;
  const total = food + service;

  return (
    <main className="min-h-screen pb-28 pt-32">
      <div className="container-x max-w-2xl">
        <p className="text-xs uppercase tracking-[0.4em] text-magma">{l('kicker')}</p>
        <h1 className="mt-3 kinetic text-5xl text-ash md:text-7xl">
          {l('title1')} <span className="text-magma-grad">{l('title2')}</span>
        </h1>

        {/* steps */}
        <div className="mt-10 flex gap-2">
          {[l('step1'), l('step2'), l('step3')].map((s: string, i) => (
            <div key={i} className="flex-1">
              <div className={`h-1 rounded-full ${i <= step ? 'bg-magma' : 'bg-ash/10'}`} />
              <p className={`mt-2 text-[10px] uppercase tracking-widest ${i <= step ? 'text-magma' : 'text-ash/35'}`}>
                {s}
              </p>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="mt-10"
          >
            {step === 0 && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-3">
                  {(l('events') as string[]).map((e, i) => (
                    <button
                      key={e}
                      onClick={() => setEventType(i)}
                      data-cursor
                      className={`rounded-2xl border p-5 text-left transition-colors ${
                        eventType === i ? 'border-magma bg-magma/10' : 'border-ash/15 hover:border-magma/50'
                      }`}
                    >
                      <span className="text-2xl" aria-hidden>{['💍', '🎂', '💼', '👑'][i]}</span>
                      <p className="mt-2 kinetic text-xl text-ash">{e}</p>
                    </button>
                  ))}
                </div>
                <label className="block">
                  <div className="flex justify-between text-xs uppercase tracking-widest text-ash/60">
                    <span>{l('guests')}</span>
                    <span className="kinetic text-lg text-magma-grad">{guests}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                    className="mt-3 w-full accent-[#ff5e1a]"
                  />
                </label>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-3">
                {PACKAGES.map((p) => {
                  const on = picks.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() =>
                        setPicks((c) => (on ? c.filter((x) => x !== p.id) : [...c, p.id]))
                      }
                      data-cursor
                      aria-pressed={on}
                      className={`flex w-full items-center justify-between rounded-2xl border p-4 transition-colors ${
                        on ? 'border-acid bg-acid/5' : 'border-ash/15 hover:border-acid/50'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-2xl" aria-hidden>{p.icon}</span>
                        <span className="kinetic text-xl text-ash">{lang === 'es' ? p.es : p.en}</span>
                      </span>
                      <span className="text-sm text-magma-grad">
                        ${p.pp} <span className="text-ash/45">{l('perPerson')}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div className="glass rounded-3xl p-8 print:border print:border-black print:bg-white">
                <p className="kinetic text-2xl text-magma-grad">
                  {(l('events') as string[])[eventType]} · {guests} {l('guests')}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-ash/75">
                  {picks.map((id) => {
                    const p = PACKAGES.find((x) => x.id === id)!;
                    return (
                      <li key={id} className="flex justify-between">
                        <span>
                          {p.icon} {lang === 'es' ? p.es : p.en}
                        </span>
                        <span className="tabular-nums">${(p.pp * guests).toFixed(2)}</span>
                      </li>
                    );
                  })}
                  <li className="flex justify-between border-t border-ash/10 pt-2 text-ash/55">
                    <span>{l('service')}</span>
                    <span className="tabular-nums">${service.toFixed(2)}</span>
                  </li>
                </ul>
                <div className="mt-5 flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-widest text-ash/60">{l('total')}</span>
                  <span className="kinetic text-4xl text-magma-grad">${total.toFixed(2)}</span>
                </div>
                <p className="mt-4 text-xs text-ash/45">{l('note')}</p>
                <div className="mt-6 flex flex-wrap gap-3 print:hidden">
                  <button
                    onClick={() => window.print()}
                    data-cursor
                    className="rounded-full border border-magma/50 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-magma hover:bg-magma hover:text-obsidian"
                  >
                    🖨 {l('print')}
                  </button>
                  <a
                    href="tel:2025433700"
                    className="rounded-full bg-magma px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-obsidian"
                  >
                    📞 {l('call')}
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-between print:hidden">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            data-cursor
            disabled={step === 0}
            className="rounded-full border border-ash/20 px-6 py-2.5 text-xs uppercase tracking-widest text-ash/70 disabled:opacity-30"
          >
            ← {l('back')}
          </button>
          {step < 2 && (
            <button
              onClick={() => setStep((s) => Math.min(2, s + 1))}
              data-cursor
              disabled={step === 1 && picks.length === 0}
              className="rounded-full bg-magma px-8 py-2.5 text-xs font-semibold uppercase tracking-widest text-obsidian disabled:opacity-40"
            >
              {l('next')} →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
