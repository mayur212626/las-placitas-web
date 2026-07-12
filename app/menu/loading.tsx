export default function MenuLoading() {
  return (
    <main className="min-h-screen pb-28 pt-32">
      <div className="container-x animate-pulse">
        <div className="h-3 w-24 rounded bg-ash/10" />
        <div className="mt-4 h-14 w-2/3 rounded bg-ash/10" />
        <div className="mt-4 h-4 w-1/2 rounded bg-ash/10" />
        <div className="mt-10 h-11 w-full max-w-md rounded-full bg-ash/10" />
        <div className="mt-6 flex gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-24 rounded-full bg-ash/10" />
          ))}
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-4 rounded-xl bg-ash/5 p-4">
              <div className="h-24 w-24 rounded-lg bg-ash/10" />
              <div className="flex-1 space-y-3 py-1">
                <div className="h-4 w-2/3 rounded bg-ash/10" />
                <div className="h-3 w-full rounded bg-ash/10" />
                <div className="h-6 w-28 rounded-full bg-ash/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
