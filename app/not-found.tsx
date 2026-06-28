import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-magma/15 blur-[120px]" />
      <p className="relative text-xs uppercase tracking-[0.4em] text-magma">Lost in the ash</p>
      <h1 className="relative kinetic text-[28vw] leading-none text-magma-grad glow-magma md:text-[16vw]">
        404
      </h1>
      <p className="relative mt-4 max-w-md text-ash/65">
        This plate slipped off the table. Let&rsquo;s get you back to the fire.
      </p>
      <Link
        href="/"
        className="relative mt-8 rounded-full bg-magma px-8 py-3 text-sm font-semibold uppercase tracking-widest text-obsidian transition-transform hover:scale-105"
      >
        Back Home
      </Link>
    </main>
  );
}
