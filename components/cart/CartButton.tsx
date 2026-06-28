'use client';

import { useCart } from './CartProvider';

export default function CartButton({ className = '' }: { className?: string }) {
  const { count, open } = useCart();
  return (
    <button
      onClick={open}
      data-cursor
      aria-label={`Open cart (${count} items)`}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-ash/20 text-ash/80 transition-colors hover:border-magma hover:text-magma ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          d="M6 6h15l-1.5 9h-12L5 3H2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20" r="1.4" fill="currentColor" />
        <circle cx="17" cy="20" r="1.4" fill="currentColor" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-magma px-1 text-[10px] font-bold text-obsidian">
          {count}
        </span>
      )}
    </button>
  );
}
