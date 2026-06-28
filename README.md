# Las Placitas

A website for Las Placitas, a Mexican & Salvadoran restaurant in Washington, DC, serving Capitol Hill since 1990.

I wanted it to feel like the food — bold and a little bit on fire. So the whole thing is built around a 3D volcano you can scroll into, with a molten "obsidian" look throughout.

## What's in it

- **3D volcano hero** built with React Three Fiber — a hand-written GLSL lava shader in the background, glowing crater, rising embers, and bloom post-processing.
- **Cinematic scroll** — as you scroll the homepage, the camera flies down into the crater and the eruption picks up.
- **Pages** — Home, Menu (with a category filter), Specials & drinks, and Locations with a live map of both DC spots.
- **Reservation modal**, animated page transitions, a sound toggle (ambient fire crackle), and a few cursor effects.
- Respects `prefers-reduced-motion`, works on mobile, and ships with proper SEO metadata.

## Tech

- [Next.js](https://nextjs.org/) (App Router)
- [React Three Fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei) + custom GLSL
- [Framer Motion](https://www.framer.com/motion/) and [Lenis](https://github.com/darkroomengineering/lenis) for motion
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/) for the locations map

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm run start
```

## Project structure

```
app/          routes — home, menu, specials, locations
components/   UI + 3D scene (volcano, lava shader, carousels, modal…)
components/motion/  reusable animation helpers
lib/          menu data and small utilities
```

## Locations

- **Capitol Hill** — 1100 8th St SE, Washington, DC 20003 · (202) 543-3700
- **14th St (Las Placitas Dos)** — 3614 14th St NW, Washington, DC 20010 · (202) 726-1334

---

© Mayur Patil
