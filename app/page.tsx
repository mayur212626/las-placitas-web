'use client';

import HeroCanvas from '@/components/HeroCanvas';
import DishCarousel from '@/components/DishCarousel';
import FoodArt from '@/components/FoodArt';
import Reveal from '@/components/Reveal';
import Logo from '@/components/Logo';
import Marquee from '@/components/Marquee';
import HorizontalMenu from '@/components/HorizontalMenu';
import HeroContent from '@/components/HeroContent';
import Magnetic from '@/components/motion/Magnetic';
import Tilt from '@/components/motion/Tilt';
import Counter from '@/components/motion/Counter';
import Parallax from '@/components/motion/Parallax';
import ScrambleText from '@/components/motion/ScrambleText';
import HeatShimmer from '@/components/motion/HeatShimmer';
import VelocitySkew from '@/components/motion/VelocitySkew';
import { useLang } from '@/components/i18n/LanguageProvider';
import {
  brand,
  locations,
  delivery,
  events,
  featured,
  awesomeDishes,
  margaritas,
  gallery,
  menuPanels,
} from '@/lib/data';

export default function Home() {
  const { t, lang } = useLang();
  return (
    <main id="home" className="relative overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <HeroCanvas />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />

        <HeroContent since={brand.since} />

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-glowPulse text-xs uppercase tracking-[0.3em] text-ash/50">
          {t('hero.scroll')}
        </div>
      </section>

      {/* ================= KINETIC MARQUEE ================= */}
      <section className="border-y border-magma/20 bg-coal py-5">
        <VelocitySkew amount={8}>
          <Marquee
            items={['Pupusas', '·', 'Fajitas', '·', 'Mariscada', '·', 'Carne Asada', '·', 'Margaritas', '·', 'Ceviche', '·', 'Lomo Saltado', '·']}
            itemClassName="kinetic text-3xl text-magma-grad md:text-5xl"
          />
        </VelocitySkew>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="relative py-32">
        <div className="container-x grid items-center gap-16 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-magma">{t('about.kicker')}</p>
            <h2 className="mt-4 kinetic text-5xl text-ash md:text-7xl">
              {t('about.title1')} <span className="text-magma-grad">{t('about.title2')}</span>
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-ash/65">{t('about.blurb')}</p>
            <div className="mt-12 grid grid-cols-3 gap-6">
              <Stat value={brand.yearsOnHill} suffix="+" label={t('stat.years')} />
              <Stat value={2} label={t('stat.locations')} />
              <Stat value={brand.since} label={t('stat.since')} />
            </div>
          </div>
          <Parallax speed={60} className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-magma/20 blur-3xl" />
            <div className="absolute inset-0 animate-[spin_50s_linear_infinite] rounded-full border border-dashed border-magma/30" />
            <Tilt max={20} className="absolute inset-0 flex items-center justify-center">
              <Logo className="h-3/4 w-3/4 drop-shadow-2xl" />
            </Tilt>
          </Parallax>
        </div>
      </section>

      {/* ================= SIGNATURE GRID ================= */}
      <section className="py-24">
        <div className="container-x">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
            <h2 className="kinetic text-5xl text-ash md:text-7xl">
              {t('featured.word1')}{' '}
              <ScrambleText key={lang} text={t('featured.word2')} className="text-magma-grad" />
            </h2>
            <p className="max-w-xs text-sm text-ash/50">{t('featured.sub')}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((f, idx) => (
              <Reveal key={f.name} delay={(idx % 3) * 90}>
                <Tilt className="h-full">
                  <article className="glass glitch h-full overflow-hidden rounded-2xl">
                    <HeatShimmer className="aspect-[5/3] bg-coal">
                      <FoodArt kind={f.kind} accent="#ff5e1a" className="h-full w-full" />
                    </HeatShimmer>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="kinetic text-2xl text-ash">{f.name}</h3>
                        <span className="rounded-full border border-magma/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-magma">
                          {f.tag}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ash/55">{f.desc}</p>
                    </div>
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MENU — HORIZONTAL PINNED ================= */}
      <div id="menu">
        <HorizontalMenu panels={menuPanels} />
      </div>
      <p className="container-x -mt-10 mb-24 text-center text-xs text-ash/40">
        {t('menu.note')}
      </p>

      {/* ================= SPECIALS ================= */}
      <section id="specials" className="bg-coal py-28">
        <div className="container-x">
          <h2 className="mb-14 text-center kinetic text-5xl text-ash md:text-7xl">
            {t('specials.awesome1')}{' '}
            <ScrambleText key={lang} text={t('specials.awesome2')} className="text-magma-grad" />{' '}
            {t('specials.awesome3')}
          </h2>
          <DishCarousel items={awesomeDishes} variant="navy" />

          <h2 className="mb-14 mt-28 text-center kinetic text-5xl text-magma-grad md:text-7xl glow-magma">
            {t('specials.margs')}
          </h2>
          <DishCarousel items={margaritas} variant="jungle" drink />
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-28">
        <div className="container-x">
          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-magma">{t('gallery.kicker')}</p>
            <h2 className="mt-3 kinetic text-5xl text-ash md:text-7xl">
              {t('gallery.title1')}{' '}
              <ScrambleText key={lang} text={t('gallery.title2')} className="text-magma-grad" />
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map((g, idx) => (
              <Reveal key={g.name} delay={(idx % 4) * 80}>
                <Tilt max={16}>
                  <div className="glitch group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-coal">
                    <HeatShimmer className="h-full w-full">
                      <FoodArt
                        kind={g.kind}
                        accent={g.accent}
                        className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                      />
                    </HeatShimmer>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian to-transparent p-3">
                      <span className="kinetic text-lg text-ash">{g.name}</span>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LOCATIONS ================= */}
      <section id="locations" className="py-28">
        <div className="container-x">
          <div className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-magma">{t('loc.kicker')}</p>
            <h2 className="mt-3 kinetic text-5xl text-ash md:text-7xl">
              {t('loc.title1')} <span className="text-magma-grad">DC</span>{' '}
              <ScrambleText key={lang} text={t('loc.title2')} />
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs uppercase tracking-widest text-ash/50">{t('loc.catering')}</span>
            {events.map((e) => (
              <span key={e} className="rounded-full bg-magma/10 px-3 py-1 text-xs uppercase tracking-widest text-magma">
                {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LET'S EAT ================= */}
      <section className="relative overflow-hidden py-32 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-magma/15 blur-[120px]" />
        <div className="container-x relative">
          <h2 className="kinetic text-[22vw] leading-none text-magma-grad glow-magma md:text-[16vw]">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-ash/65">{t('cta.thanks')}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Magnetic
              href="#"
              data-order
              className="inline-block rounded-full bg-magma px-10 py-4 text-sm font-semibold uppercase tracking-widest text-obsidian shadow-lg shadow-magma/30"
            >
              {t('cta.order')}
            </Magnetic>
            <Magnetic
              href="/menu"
              className="inline-block rounded-full border border-ash/30 px-10 py-4 text-sm uppercase tracking-widest text-ash"
            >
              {t('cta.seeMenu')}
            </Magnetic>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  return (
    <div>
      <Counter value={value} suffix={suffix} className="kinetic text-5xl text-magma-grad" />
      <div className="mt-1 text-xs uppercase tracking-widest text-ash/50">{label}</div>
    </div>
  );
}
