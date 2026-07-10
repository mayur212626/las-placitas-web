'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type Slide = { src?: string; alt: string; fallback?: React.ReactNode };

/** Fullscreen photo viewer with keyboard + arrow navigation. */
export default function Lightbox({
  slides,
  index,
  onClose,
  onIndex,
}: {
  slides: Slide[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex(((index as number) + 1) % slides.length);
      if (e.key === 'ArrowLeft') onIndex(((index as number) - 1 + slides.length) % slides.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, index, slides.length, onClose, onIndex]);

  if (!open) return null;
  const cur = slides[index as number];

  return (
    <AnimatePresence>
      <motion.div
        key="lb"
        className="fixed inset-0 z-[96] flex items-center justify-center p-4 md:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-md" onClick={onClose} />

        <motion.div
          key={index}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="relative z-10 aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl border border-magma/30 bg-coal shadow-2xl shadow-magma/10"
        >
          {cur.src ? (
            <Image src={cur.src} alt={cur.alt} fill sizes="90vw" className="object-cover" />
          ) : (
            cur.fallback
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/90 to-transparent p-5">
            <span className="kinetic text-2xl text-ash md:text-4xl">{cur.alt}</span>
            <span className="ml-3 text-xs uppercase tracking-widest text-ash/50">
              {(index as number) + 1} / {slides.length}
            </span>
          </div>
        </motion.div>

        <button
          onClick={onClose}
          data-cursor
          aria-label="Close"
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-coal/80 text-xl text-ash transition hover:bg-magma hover:text-obsidian"
        >
          ✕
        </button>
        <button
          onClick={() => onIndex(((index as number) - 1 + slides.length) % slides.length)}
          data-cursor
          aria-label="Previous"
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-coal/80 p-3 text-2xl text-ash transition hover:bg-magma hover:text-obsidian md:left-8"
        >
          ‹
        </button>
        <button
          onClick={() => onIndex(((index as number) + 1) % slides.length)}
          data-cursor
          aria-label="Next"
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-coal/80 p-3 text-2xl text-ash transition hover:bg-magma hover:text-obsidian md:right-8"
        >
          ›
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
