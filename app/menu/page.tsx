import type { Metadata } from 'next';
import MenuExplorer from '@/components/MenuExplorer';
import Magnetic from '@/components/motion/Magnetic';
import T from '@/components/i18n/T';
import { menu } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Menu — Las Placitas · Mexican & Salvadoran',
  description: 'Appetizers, especiales, mariscos, fajitas and more. Made from scratch.',
};

export default function MenuPage() {
  return (
    <main className="min-h-screen overflow-x-hidden pb-28 pt-32">
      <div className="container-x">
        <p className="text-xs uppercase tracking-[0.4em] text-magma">
          <T k="nav.menu" />
        </p>
        <h1 className="mt-3 kinetic text-6xl text-ash glow-magma md:text-8xl">
          <T k="menu.title1" /> <span className="text-magma-grad"><T k="menu.title2" /></span>
        </h1>
        <p className="mt-4 max-w-xl text-ash/60">
          <T k="menu.sub" />
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
            <T k="menu.reserve" />
          </Magnetic>
          <Magnetic
            href="/specials"
            className="inline-block rounded-full border border-ash/30 px-8 py-3 text-sm uppercase tracking-widest text-ash"
          >
            <T k="menu.seeDrinks" />
          </Magnetic>
        </div>
      </div>
    </main>
  );
}
