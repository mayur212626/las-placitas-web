import type { Metadata } from 'next';
import MenuExplorer from '@/components/MenuExplorer';
import Magnetic from '@/components/motion/Magnetic';
import { menu } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Menu — Las Placitas · Mexican & Salvadoran',
  description: 'Appetizers, especiales, mariscos, fajitas and more. Made from scratch.',
};

export default function MenuPage() {
  return (
    <main className="min-h-screen overflow-x-hidden pb-28 pt-32">
      <div className="container-x">
        <p className="text-xs uppercase tracking-[0.4em] text-magma">The Menu</p>
        <h1 className="mt-3 kinetic text-6xl text-ash glow-magma md:text-8xl">
          Made from <span className="text-magma-grad">scratch</span>
        </h1>
        <p className="mt-4 max-w-xl text-ash/60">
          Filter by course. Full menu in-store · 3.8% cash discount · 18% gratuity on dine-in.
        </p>

        <div className="mt-14">
          <MenuExplorer menu={menu} />
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
            href="/specials"
            className="inline-block rounded-full border border-ash/30 px-8 py-3 text-sm uppercase tracking-widest text-ash"
          >
            See Drinks &amp; Specials
          </Magnetic>
        </div>
      </div>
    </main>
  );
}
