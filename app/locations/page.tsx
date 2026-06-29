import type { Metadata } from 'next';
import LocationMap from '@/components/LocationMap';
import Logo from '@/components/Logo';
import Reveal from '@/components/Reveal';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import T from '@/components/i18n/T';
import { locations, delivery, events } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Locations & Contact — Las Placitas · Washington, DC',
  description: 'Two DC locations — Capitol Hill & 14th St NW. Map, hours, delivery and catering.',
};

export default function LocationsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden pb-28 pt-32">
      <div className="container-x">
        <p className="text-xs uppercase tracking-[0.4em] text-magma"><T k="loc.kicker" /></p>
        <h1 className="mt-3 kinetic text-6xl text-ash glow-magma md:text-8xl">
          <T k="loc.title1" /> <span className="text-magma-grad">DC</span> <T k="loc.title2" />
        </h1>

        <div className="mt-12">
          <LocationMap />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {locations.map((loc) => (
            <Reveal key={loc.id}>
              <Tilt max={8}>
                <div className="glass relative overflow-hidden rounded-3xl p-10">
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${
                      loc.theme === 'navy' ? 'bg-magma/20' : 'bg-acid/15'
                    }`}
                  />
                  <div className="flex items-center gap-3">
                    <Logo className="h-10 w-10" />
                    <div>
                      <h3 className="kinetic text-2xl text-ash">{loc.name}</h3>
                      <p className="text-xs uppercase tracking-widest text-ash/50">{loc.sub}</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-1 text-ash/85">
                    <p className="text-lg">{loc.address}</p>
                    <p className="text-ash/55">{loc.city}</p>
                  </div>
                  <a
                    href={`tel:${loc.phone.replace(/[^\d]/g, '')}`}
                    className="mt-5 inline-block kinetic text-4xl text-magma-grad transition hover:opacity-80"
                  >
                    {loc.phone}
                  </a>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {delivery.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-ash/20 px-3 py-1 text-xs uppercase tracking-widest text-ash/65"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-center">
          <span className="text-xs uppercase tracking-widest text-ash/50"><T k="loc.catering" /></span>
          {events.map((e) => (
            <span key={e} className="rounded-full bg-magma/10 px-3 py-1 text-xs uppercase tracking-widest text-magma">
              {e}
            </span>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Magnetic
            href="#"
            data-order
            className="inline-block rounded-full bg-magma px-10 py-4 text-sm font-semibold uppercase tracking-widest text-obsidian"
          >
            <T k="menu.reserve" />
          </Magnetic>
        </div>
      </div>
    </main>
  );
}
