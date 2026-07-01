'use client';

import Logo from './Logo';
import OpenStatus from './OpenStatus';
import { useLang } from './i18n/LanguageProvider';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container-x flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <a href="/" className="flex items-center gap-3">
          <Logo className="h-9 w-9" />
          <span className="kinetic text-xl text-ash">Las Placitas</span>
        </a>
        <OpenStatus />
      </div>
      <div className="container-x mt-6 flex flex-col items-center justify-between gap-3 text-sm text-ash/50 md:flex-row">
        <p>www.lasplacitasrestaurant.com · {t('foot.catering')}</p>
        <p>© {new Date().getFullYear()} Mayur Patil · {t('foot.rights')}</p>
      </div>
    </footer>
  );
}
