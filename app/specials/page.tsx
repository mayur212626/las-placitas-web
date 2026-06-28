import type { Metadata } from 'next';
import DishCarousel from '@/components/DishCarousel';
import Reveal from '@/components/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import { margaritas, drinks } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Specials & Drinks — Las Placitas',
  description: 'Homemade margaritas, beer, mixed drinks, frozen daiquiris and more.',
};

function PriceList({
  title,
  price,
  items,
}: {
  title: string;
  price?: string;
  items: string[];
}) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="kinetic text-2xl text-ash">{title}</h3>
        {price && <span className="kinetic text-xl text-magma-grad">${price}</span>}
      </div>
      <div className="rule mb-4" />
      <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-ash/70 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-magma" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SpecialsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden pb-28 pt-32">
      <div className="container-x">
        <p className="text-xs uppercase tracking-[0.4em] text-magma">Specials &amp; Drinks</p>
        <h1 className="mt-3 kinetic text-6xl text-ash glow-magma md:text-8xl">
          Homemade <span className="text-magma-grad">Margaritas</span>
        </h1>

        <div className="mt-14">
          <DishCarousel items={margaritas} variant="jungle" drink />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-ash/50">All one price</span>
          <span className="kinetic text-3xl text-magma-grad">${drinks.margaritaPrice}</span>
          <div className="flex flex-wrap gap-2">
            {drinks.margaritas.map((m) => (
              <span
                key={m}
                className="rounded-full border border-magma/30 px-3 py-1 text-xs uppercase tracking-widest text-magma/90"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <PriceList title="Beer" price={drinks.beerPrice} items={drinks.beer} />
          </Reveal>
          <Reveal delay={80}>
            <PriceList title="Mixed Drinks" price={drinks.mixedPrice} items={drinks.mixed} />
          </Reveal>
          <Reveal>
            <PriceList title="Frozen Daiquiris" price={drinks.frozenPrice} items={drinks.frozen} />
          </Reveal>
          <Reveal delay={80}>
            <PriceList title="Soft Drinks & Juices" price={drinks.softPrice} items={drinks.soft} />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {Object.entries(drinks.spirits).map(([k, v], i) => (
            <Reveal key={k} delay={i * 70}>
              <PriceList title={k} items={v} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap gap-4">
          <Magnetic
            href="#"
            data-order
            className="inline-block rounded-full bg-magma px-8 py-3 text-sm font-semibold uppercase tracking-widest text-obsidian"
          >
            Reserve a Table
          </Magnetic>
          <Magnetic
            href="/menu"
            className="inline-block rounded-full border border-ash/30 px-8 py-3 text-sm uppercase tracking-widest text-ash"
          >
            Back to Menu
          </Magnetic>
        </div>
      </div>
    </main>
  );
}
