# Las Placitas

A website for Las Placitas, a Mexican and Salvadoran restaurant in Washington, DC, proudly serving Capitol Hill since 1990.

The goal was to make the site feel like the food: bold, warm, and a little bit on fire. The whole experience is built around a 3D volcano you can scroll into, with a molten "obsidian" theme running through every page.

> Status: still working on this. It is an active work in progress, so expect things to change and a few rough edges while I keep polishing.

## Live preview

Run it locally (see below). A hosted version is coming soon.

## Features

Everything built so far:

### 3D and visuals
- 3D volcano hero scene built with React Three Fiber
- Hand written GLSL lava shader running as the animated background
- Glowing crater, rising ember particles, and drifting smoke
- Bloom, chromatic aberration, vignette, and film grain post processing
- Cinematic scroll: the camera flies down into the crater and the eruption intensifies as you scroll
- Dishes that rise out of the lava near the bottom of the dive
- Performance fallback that lightens the scene on mobile

### Motion and interaction
- Smooth inertia scrolling (Lenis)
- Intro preloader with a count up and a curtain reveal
- Page to page curtain transitions
- Word by word headline reveals and text scramble effects
- Magnetic buttons, 3D tilt cards, and animated counters
- Custom cursor glow with an ember spark trail and a dish image trail
- Heat haze distortion on the dish art when you hover
- Scroll progress bar and scroll velocity skew on the marquee
- Ambient fire crackle sound toggle (synthesized, no audio files)

### Pages and content
- Home: cinematic hero, about, featured dishes, signature menu, gallery, locations, and a call to action
- Menu: full menu with a category filter and animated reflow
- Specials: homemade margaritas, beer, mixed drinks, frozen daiquiris, spirits, and soft drinks
- Locations: a live dark themed map with both DC locations, delivery options, and catering info
- Reservation modal that opens from any order button

### Polish
- Respects the reduced motion accessibility setting
- Responsive layout for mobile and desktop
- Custom 404 and loading screens
- Generated favicon plus SEO and social share metadata

## Tech stack

- Next.js (App Router)
- React Three Fiber and drei, with custom GLSL
- Framer Motion and Lenis for motion
- Tailwind CSS
- Leaflet for the locations map

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

Build for production:

```bash
npm run build
npm run start
```

## Project structure

```
app/                routes: home, menu, specials, locations
components/          UI and the 3D scene (volcano, lava shader, carousels, modal)
components/motion/   reusable animation helpers
lib/                 menu data and small utilities
```

## Locations

- Capitol Hill: 1100 8th St SE, Washington, DC 20003, phone (202) 543-3700
- 14th St (Las Placitas Dos): 3614 14th St NW, Washington, DC 20010, phone (202) 726-1334

## Roadmap

Things I still want to add:

- Deploy a hosted version
- Real food photography in place of the generated art
- More menu detail and an online ordering flow

## Author

Created by Mayur Patil.

## License

Released under the MIT License. See the [LICENSE](LICENSE) file for details.
