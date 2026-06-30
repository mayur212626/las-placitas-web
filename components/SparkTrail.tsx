'use client';

import { useEffect, useRef } from 'react';

type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number };

/** Embers that spark off the cursor and rise like cinders. Fine-pointer only. */
export default function SparkTrail() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
      cv.style.width = `${window.innerWidth}px`;
      cv.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    const sparks: Spark[] = [];
    const colors = ['#ff5e1a', '#ff9d2e', '#e11d62', '#b6ff2e'];
    let mx = -100;
    let my = -100;
    let moved = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      moved = true;
      const n = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < n; i++) {
        sparks.push({
          x: mx,
          y: my,
          vx: (Math.random() - 0.5) * 1.4,
          vy: -Math.random() * 1.8 - 0.3,
          life: 0,
          max: 40 + Math.random() * 40,
          r: 1 + Math.random() * 2,
        });
      }
      if (sparks.length > 160) sparks.splice(0, sparks.length - 160);
      kick();
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf = 0;
    let running = false;
    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;
        s.x += s.vx * dpr;
        s.y += s.vy * dpr;
        s.vy += 0.012 * dpr; // slight gravity pull-back
        s.vx *= 0.99;
        const t = 1 - s.life / s.max;
        if (t <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = t * 0.9;
        ctx.arc(s.x * dpr, s.y * dpr, s.r * dpr * t, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      // stop the loop once everything has faded — no idle CPU burn
      if (sparks.length === 0) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    function kick() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      void moved;
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[66] mix-blend-screen"
    />
  );
}
