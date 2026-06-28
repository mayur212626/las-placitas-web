export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-magma/25 border-t-magma" />
        <span className="text-xs uppercase tracking-[0.4em] text-ash/50">Stoking the fire…</span>
      </div>
    </div>
  );
}
