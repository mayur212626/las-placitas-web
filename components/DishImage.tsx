'use client';

import { useState } from 'react';
import Image from 'next/image';
import FoodArt, { type FoodKind } from './FoodArt';
import { photoFor } from '@/lib/photos';

/**
 * Real dish photography with a graceful fallback: if the photo key is
 * missing or the image fails to load, the procedural FoodArt renders instead.
 */
export default function DishImage({
  photoKey,
  kind = 'plate',
  accent = '#ff5e1a',
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, 33vw',
}: {
  photoKey?: string;
  kind?: FoodKind;
  accent?: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = photoFor(photoKey);

  if (!src || failed) {
    return <FoodArt kind={kind} accent={accent} className={className} />;
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        onError={() => setFailed(true)}
      />
      {/* molten grade so photos sit in the obsidian theme */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent" />
    </div>
  );
}
