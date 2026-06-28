'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartProvider';

export default function CartDrawer() {
  const { items, total, count, isOpen, close, setQty, remove, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  const checkout = () => {
    setPlaced(true);
    clear();
    setTimeout(() => {
      setPlaced(false);
      close();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[88] bg-obsidian/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[89] flex h-full w-full max-w-md flex-col bg-coal shadow-2xl shadow-black/50"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <h2 className="kinetic text-2xl text-ash">
                Your Order{' '}
                {count > 0 && <span className="text-magma-grad">({count})</span>}
              </h2>
              <button
                onClick={close}
                data-cursor
                aria-label="Close cart"
                className="text-ash/60 transition hover:text-magma"
              >
                ✕
              </button>
            </div>

            {placed ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-magma/15 text-3xl text-magma">
                  ✓
                </div>
                <h3 className="kinetic text-3xl text-ash">¡Order placed!</h3>
                <p className="text-ash/60">Thanks. We&rsquo;ll have it ready for you.</p>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                <p className="kinetic text-2xl text-ash/70">Your cart is empty</p>
                <p className="text-sm text-ash/50">Add some dishes from the menu to get started.</p>
                <a
                  href="/menu"
                  onClick={close}
                  className="mt-2 rounded-full border border-magma/50 px-6 py-2 text-xs uppercase tracking-widest text-magma hover:bg-magma hover:text-obsidian"
                >
                  Browse Menu
                </a>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-white/5 overflow-y-auto">
                  {items.map((it) => (
                    <li key={it.id} className="flex items-center gap-3 p-5">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-body text-ash">{it.name}</p>
                        <p className="text-sm text-ash/50">${it.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQty(it.id, it.qty - 1)}
                          data-cursor
                          aria-label="Decrease"
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-ash/20 text-ash/70 hover:border-magma hover:text-magma"
                        >
                          −
                        </button>
                        <span className="w-6 text-center tabular-nums text-ash">{it.qty}</span>
                        <button
                          onClick={() => setQty(it.id, it.qty + 1)}
                          data-cursor
                          aria-label="Increase"
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-ash/20 text-ash/70 hover:border-magma hover:text-magma"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(it.id)}
                        data-cursor
                        aria-label="Remove"
                        className="ml-1 text-ash/40 transition hover:text-blood"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 p-6">
                  <div className="mb-4 flex items-baseline justify-between">
                    <span className="text-sm uppercase tracking-widest text-ash/60">Subtotal</span>
                    <span className="kinetic text-3xl text-magma-grad">${total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={checkout}
                    data-cursor
                    className="w-full rounded-full bg-magma py-3 text-sm font-semibold uppercase tracking-widest text-obsidian transition-transform hover:scale-[1.02]"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={clear}
                    data-cursor
                    className="mt-3 w-full text-center text-xs uppercase tracking-widest text-ash/40 hover:text-blood"
                  >
                    Clear cart
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
