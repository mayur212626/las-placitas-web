'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Ctx = { favs: string[]; toggle: (id: string) => void; has: (id: string) => boolean };
const FavCtx = createContext<Ctx | null>(null);
const KEY = 'lp-favs';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favs, setFavs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setFavs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(favs));
  }, [favs, hydrated]);

  const toggle = (id: string) =>
    setFavs((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const has = (id: string) => favs.includes(id);

  return <FavCtx.Provider value={{ favs, toggle, has }}>{children}</FavCtx.Provider>;
}

export function useFavorites() {
  const c = useContext(FavCtx);
  if (!c) throw new Error('useFavorites must be used within FavoritesProvider');
  return c;
}

/** Heart toggle. Stops propagation so parent card clicks don't fire. */
export function FavButton({ id, className = '' }: { id: string; className?: string }) {
  const { toggle, has } = useFavorites();
  const active = has(id);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggle(id);
      }}
      data-cursor
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={active}
      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
        active
          ? 'scale-110 border-blood/60 bg-blood/15 text-blood'
          : 'border-ash/20 text-ash/40 hover:border-blood/50 hover:text-blood'
      } ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path d="M12 21C7 16.5 3 13.2 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 1-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 4.1-4 7.4-9 11.9Z" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
