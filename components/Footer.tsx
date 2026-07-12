'use client';

import { useState } from 'react';
import Logo from './Logo';
import OpenStatus from './OpenStatus';
import { useLang } from './i18n/LanguageProvider';
import { useToast } from './ToastProvider';

export default function Footer() {
  const { t } = useLang();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const signup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    toast(t('toast.news'), '🌮');
    setEmail('');
  };

  return (
    <footer className="border-t border-white/10">
      {/* newsletter */}
      <div className="border-b border-white/10 bg-coal/60 py-12">
        <div className="container-x flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h3 className="kinetic text-3xl text-ash">
              {t('nl.title').split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-magma-grad">{t('nl.title').split(' ').slice(-1)}</span>
            </h3>
            <p className="mt-1 text-sm text-ash/55">{t('nl.sub')}</p>
          </div>
          <form onSubmit={signup} className="flex w-full max-w-sm gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('nl.placeholder')}
              className="min-w-0 flex-1 rounded-full border border-ash/15 bg-obsidian/60 px-5 py-3 text-sm text-ash outline-none placeholder:text-ash/30 focus:border-magma"
            />
            <button
              type="submit"
              data-cursor
              className="shrink-0 rounded-full bg-magma px-6 py-3 text-xs font-semibold uppercase tracking-widest text-obsidian transition-transform hover:scale-105"
            >
              {t('nl.cta')}
            </button>
          </form>
        </div>
      </div>

      <div className="py-12">
        <div className="container-x flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <a href="/" className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <span className="kinetic text-xl text-ash">Las Placitas</span>
          </a>
          <OpenStatus />
        </div>
        <div className="container-x mt-6 flex flex-col items-center justify-between gap-3 text-sm text-ash/50 md:flex-row">
          <p>www.lasplacitasrestaurant.com · {t('foot.catering')}</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-magma">{t('ck.privacy')}</a>
            <p>© {new Date().getFullYear()} Mayur Patil · {t('foot.rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
