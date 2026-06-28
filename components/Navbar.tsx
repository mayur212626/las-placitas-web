'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import CartButton from './cart/CartButton';

const links = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/menu', label: 'Menu' },
  { href: '/specials', label: 'Specials' },
  { href: '/locations', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
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
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <CartButton />
          <a
            href="#"
            data-order
            className="hidden rounded-full border border-magma/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-magma transition-colors hover:bg-magma hover:text-obsidian md:inline-block"
          >
            Order
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
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
