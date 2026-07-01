# Las Placitas

A website for Las Placitas, a Mexican and Salvadoran restaurant in Washington, DC, proudly serving Capitol Hill since 1990.

The goal was to make the site feel like the food: bold, warm, and a little bit on fire. The whole experience is built around a 3D volcano with a molten "obsidian" theme running through every page.

> Note: this is an unofficial concept redesign I built as a personal project to practice 3D, animation, and front end product features on the web. The real Las Placitas restaurant already has its own official website. This project is not affiliated with or endorsed by the restaurant, and the menu and contact details are used here for demonstration only.

> Status: still working on this. It is an active work in progress, so expect things to change and a few rough edges while I keep polishing.

## Live site

https://las-placitas-web.vercel.app

## Features

Everything built so far:

### 3D and visuals
- 3D volcano hero scene built with React Three Fiber
- Hand written GLSL lava shader running as the animated background
- Glowing crater and lava throat, rising ember particles, and drifting smoke
- Bloom and vignette post processing
- The volcano stays framed while a gentle scroll ramps up the eruption
- The 3D loop pauses when the hero scrolls off screen to keep the page fast

### Motion and interaction
- Smooth inertia scrolling (Lenis)
- Intro preloader with a count up and a curtain reveal
- Page to page curtain transitions
- Word by word headline reveals and text scramble effects
- Magnetic buttons, 3D tilt cards, and animated counters
- Custom cursor glow with an ember spark trail
- Heat haze distortion on the dish art when you hover
- Scroll progress bar and scroll velocity skew on the marquee
- Ambient fire crackle sound toggle (synthesized, no audio files)

### Ordering
- Add to cart on every dish, with a persistent cart (saved in the browser)
- Slide in cart drawer with quantity controls and a live subtotal
- Checkout flow: pickup location, pickup time, tip selector, tax and total
- Order confirmation with an order number

### Menu and content
- Home: hero, about, featured dishes, signature grid, gallery, locations, and a call to action
- Menu: full menu with live search, category filter, and animated reflow
- Specials: homemade margaritas, beer, mixed drinks, frozen daiquiris, spirits, and soft drinks
- Locations: a live dark themed map of both DC spots, live open or closed status, weekly hours, delivery and catering info
- Reservation modal that opens from any order button

### English and Spanish
- One click language toggle in the navbar
- The whole interface translates, including the full menu descriptions

### Product and platform
- Installable as a PWA with offline support (service worker)
- Restaurant structured data (schema.org JSON-LD) for rich Google results
- Sitemap, robots, generated favicon, and social share metadata
- Respects the reduced motion accessibility setting
- Responsive for mobile and desktop
- Custom 404 and loading screens

## Tech stack

- Next.js (App Router)
- React Three Fiber and drei, with custom GLSL, plus postprocessing
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
app/                routes: home, menu, specials, locations, plus manifest, sitemap, robots
components/          UI and the 3D scene (volcano, lava shader, carousels, modals)
components/cart/     cart state, drawer, and checkout
components/i18n/     language provider, toggle, and translations
components/motion/   reusable animation helpers
lib/                 menu data and small utilities
public/              icon and service worker
```

## Locations

- Capitol Hill: 1100 8th St SE, Washington, DC 20003, phone (202) 543-3700
- 14th St (Las Placitas Dos): 3614 14th St NW, Washington, DC 20010, phone (202) 726-1334

## Roadmap

Things I still want to add:

- Real food photography in place of the generated art
- Real payments and order delivery to the kitchen (needs a backend)
- A content system so the menu can be edited without code
- A custom domain

## Author

Created by Mayur Patil.

## License

Released under the MIT License. See the [LICENSE](LICENSE) file for details.
