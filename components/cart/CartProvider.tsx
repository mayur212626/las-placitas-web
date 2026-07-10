'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type CartItem = { id: string; name: string; price: number; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  add: (item: { id: string; name: string; price: number }) => void;
  addMany: (items: CartItem[]) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = 'lp-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // load once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // persist
  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add: CartCtx['add'] = (item) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
    setOpen(true);
  };
  const addMany: CartCtx['addMany'] = (list) => {
    setItems((prev) => {
      const next = [...prev];
      for (const item of list) {
        const found = next.find((i) => i.id === item.id);
        if (found) found.qty += item.qty;
        else next.push({ ...item });
      }
      return next;
    });
    setOpen(true);
  };
  const remove: CartCtx['remove'] = (id) => setItems((p) => p.filter((i) => i.id !== id));
  const setQty: CartCtx['setQty'] = (id, qty) =>
    setItems((p) =>
      qty <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  const clear = () => setItems([]);

  const { count, total } = useMemo(
    () => ({
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.qty * i.price, 0),
    }),
    [items]
  );

  return (
    <Ctx.Provider
      value={{
        items,
        count,
        total,
        isOpen,
        add,
        addMany,
        remove,
        setQty,
        clear,
        open: () => setOpen(true),
        close: () => setOpen(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart must be used within CartProvider');
  return c;
}
