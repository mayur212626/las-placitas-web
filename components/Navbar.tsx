'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import CartButton from './cart/CartButton';
import LangToggle from './i18n/LangToggle';
import { useLang } from './i18n/LanguageProvider';

const links = [
  { href: '/', key: 'nav.home' },
  { href: '/#about', key: 'nav.about' },
  { href: '/menu', key: 'nav.menu' },
  { href: '/specials', key: 'nav.specials' },
  { href: '/locations', key: 'nav.contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLang();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-obsidian/70 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-[72px] items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <span className="kinetic text-2xl text-ash">
            Las Placitas
          </span>
        </a>

        <ul className="hidden items-center gap-9 text-xs font-medium uppercase tracking-[0.2em] text-ash/70 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-magma after:transition-all hover:text-magma hover:after:w-full ${
                  isActive(l.href) ? 'text-magma after:w-full' : 'after:w-0'
                }`}
              >
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event('lp:palette'))}
            data-cursor
            aria-label="Search (Ctrl+K)"
            className="hidden h-10 items-center gap-2 rounded-full border border-ash/20 px-3.5 text-ash/60 transition-colors hover:border-magma hover:text-magma lg:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <kbd className="text-[10px] tracking-widest">Ctrl K</kbd>
          </button>
          <LangToggle className="hidden sm:flex" />
          <CartButton />
          <a
            href="/menu"
            className="hidden rounded-full bg-magma px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-obsidian transition-transform hover:scale-105 md:inline-block"
          >
            {t('nav.order')}
          </a>
          <a
            href="#"
            data-order
            className="hidden rounded-full border border-magma/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-magma transition-colors hover:bg-magma hover:text-obsidian md:inline-block"
          >
            {t('nav.reserve')}
          </a>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="text-ash md:hidden" aria-label="Menu">
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-magma" />
            <span className="block h-0.5 w-6 bg-magma" />
            <span className="block h-0.5 w-6 bg-magma" />
          </div>
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-white/10 bg-obsidian/95 px-6 py-4 text-sm uppercase tracking-widest text-ash/80 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-2 hover:text-magma">
                {t(l.key)}
              </a>
            </li>
          ))}
          <li className="flex gap-3 pt-2">
            <a
              href="/menu"
              onClick={() => setOpen(false)}
              className="rounded-full bg-magma px-4 py-1.5 text-xs font-semibold text-obsidian"
            >
              {t('nav.order')}
            </a>
            <a
              href="#"
              data-order
              onClick={() => setOpen(false)}
              className="rounded-full border border-magma/60 px-4 py-1.5 text-xs font-semibold text-magma"
            >
              {t('nav.reserve')}
            </a>
          </li>
          <li className="pt-2">
            <LangToggle />
          </li>
        </ul>
      )}
    </header>
  );
}
