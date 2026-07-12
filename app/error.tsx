'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood/15 blur-[120px]" />
      <p className="relative text-5xl" aria-hidden>🔥</p>
      <h1 className="relative mt-4 kinetic text-4xl text-ash md:text-6xl">
        Something burned in the kitchen
      </h1>
      <p className="relative mt-3 max-w-md text-ash/60">
        Algo se quemó en la cocina. Give it another try.
      </p>
      <button
        onClick={reset}
        className="relative mt-8 rounded-full bg-magma px-8 py-3 text-sm font-semibold uppercase tracking-widest text-obsidian transition-transform hover:scale-105"
      >
        Try again
      </button>
    </main>
  );
}
