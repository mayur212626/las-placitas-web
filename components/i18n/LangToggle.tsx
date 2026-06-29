'use client';

import { useLang } from './LanguageProvider';

const langs: { code: 'en' | 'es'; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`flex items-center rounded-full border border-ash/20 p-0.5 text-[11px] font-semibold uppercase tracking-widest ${className}`}
    >
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          data-cursor
          aria-label={`Switch to ${l.label}`}
          aria-pressed={lang === l.code}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            lang === l.code ? 'bg-magma text-obsidian' : 'text-ash/60 hover:text-magma'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
