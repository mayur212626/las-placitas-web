import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Table QR Cards',
  description: 'Printable QR codes that open the menu for each table.',
};

const BASE = 'https://las-placitas-web.vercel.app';

export default function QrPage() {
  const tables = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <main className="min-h-screen pb-28 pt-32 print:bg-white print:pt-8">
      <div className="container-x">
        <div className="print:hidden">
          <p className="text-xs uppercase tracking-[0.4em] text-magma">Staff tools</p>
          <h1 className="mt-3 kinetic text-5xl text-ash md:text-7xl">
            Table <span className="text-magma-grad">QR</span> Cards
          </h1>
          <p className="mt-4 max-w-xl text-ash/60">
            Print these and place one on each table. Scanning opens the menu ready to
            order for that table.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 print:mt-0 print:grid-cols-2">
          {tables.map((n) => (
            <div
              key={n}
              className="flex flex-col items-center gap-3 rounded-3xl border border-magma/25 bg-coal p-6 print:break-inside-avoid print:border-black print:bg-white"
            >
              <span className="kinetic text-2xl text-magma-grad print:text-black">Las Placitas</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&bgcolor=ffffff&data=${encodeURIComponent(
                  `${BASE}/menu?table=${n}`
                )}`}
                alt={`QR code for table ${n}`}
                width={220}
                height={220}
                className="rounded-xl bg-white p-2"
              />
              <span className="text-sm uppercase tracking-[0.3em] text-ash/70 print:text-black">
                Table {n}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
