'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';

/** Small add-to-cart button for a menu item. Price is a string like "19.95". */
export default function AddToCart({
  id,
  name,
  price,
  className = '',
}: {
  id: string;
  name: string;
  price?: string;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const num = price ? parseFloat(price) : NaN;
  if (!price || Number.isNaN(num)) return null;

  return (
    <button
      onClick={() => {
        add({ id, name, price: num });
        setAdded(true);
        setTimeout(() => setAdded(false), 900);
      }}
      data-cursor
      aria-label={`Add ${name} to cart`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-colors ${
        added
          ? 'border-acid bg-acid/15 text-acid'
          : 'border-magma/50 text-magma hover:bg-magma hover:text-obsidian'
      } ${className}`}
    >
      {added ? '✓ Added' : '+ Add'}
    </button>
  );
}
