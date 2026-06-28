'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Ambient fire crackle, fully synthesized with the Web Audio API (no assets).
 * Off by default; starts on user gesture. A low brown-noise rumble + random
 * filtered crackle pops.
 */
export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);
  const crackleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildNoise = (ctx: AudioContext, seconds: number) => {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02; // brown-ish
      data[i] = last * 3.2;
    }
    return buffer;
  };

  const start = () => {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    masterRef.current = master;

    // base rumble
    const src = ctx.createBufferSource();
    src.buffer = buildNoise(ctx, 3);
    src.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 520;
    const rumbleGain = ctx.createGain();
    rumbleGain.gain.value = 0.35;
    src.connect(lp).connect(rumbleGain).connect(master);
    src.start();

    // crackle pops
    let alive = true;
    const pop = () => {
      if (!alive) return;
      const b = ctx.createBufferSource();
      b.buffer = buildNoise(ctx, 0.08);
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1200 + Math.random() * 2600;
      bp.Q.value = 6;
      const g = ctx.createGain();
      const now = ctx.currentTime;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.25 + Math.random() * 0.4, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      b.connect(bp).connect(g).connect(master);
      b.start();
      crackleTimer.current = setTimeout(pop, 60 + Math.random() * 380);
    };
    pop();

    // fade in
    master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.2);

    nodesRef.current = {
      stop: () => {
        alive = false;
        try {
          src.stop();
        } catch {
          /* already stopped */
        }
      },
    };
  };

  const stop = () => {
    if (crackleTimer.current) clearTimeout(crackleTimer.current);
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (ctx && master) {
      master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      setTimeout(() => {
        nodesRef.current?.stop();
        ctx.close();
        ctxRef.current = null;
      }, 500);
    }
  };

  const toggle = () => {
    if (on) stop();
    else start();
    setOn((v) => !v);
  };

  useEffect(() => () => stop(), []);

  return (
    <button
      onClick={toggle}
      aria-label={on ? 'Mute ambience' : 'Play fire ambience'}
      data-cursor
      className={`fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur transition-colors ${
        on
          ? 'border-magma/60 bg-magma/15 text-magma shadow-[0_0_24px_rgba(255,94,26,0.5)]'
          : 'border-ash/25 bg-obsidian/50 text-ash/70 hover:border-magma/50 hover:text-magma'
      }`}
    >
      {/* animated equalizer bars when on, speaker when off */}
      {on ? (
        <span className="flex items-end gap-[3px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-magma"
              style={{
                height: 14,
                animation: `eq 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
              }}
            />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M4 9v6h4l5 5V4L8 9H4Zm13.5 3a4 4 0 0 0-2.2-3.6v7.2A4 4 0 0 0 17.5 12Z" />
        </svg>
      )}
    </button>
  );
}
