'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-magma/30 border-t-magma" />
    </div>
  ),
});

export default function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  // only run the 3D loop while the hero is on screen — frees the CPU/GPU
  // for the rest of the page so scrolling and clicks stay responsive
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      <HeroScene active={active} />
    </div>
  );
}
