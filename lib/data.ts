// All content sourced from Las Placitas printed menus & site.

export const brand = {
  name: 'Las Placitas',
  tagline: 'Mexican & Salvadoran Cuisine',
  since: 1990,
  yearsOnHill: 35,
  cuisine: 'Mexican & Salvadoran',
  blurb:
    'We at Las Placitas are well known for our great food. Our passion is the kitchen, where we create a good mix of our homemade recipes and specialty dishes. Our unique Mexican & Salvadorian style cuisine makes our food very tasty and authentic. Proudly serving Capitol Hill since 1990!',
};

export const locations = [
  {
    id: 'capitol-hill',
    name: 'Capitol Hill',
    sub: 'The Original',
    address: '1100 8th St SE',
    city: 'Washington, DC 20003',
    phone: '(202) 543-3700',
    lat: 38.8846,
    lng: -76.9956,
    theme: 'navy' as const,
  },
  {
    id: '14th-st',
    name: 'Las Placitas Dos',
    sub: '14th St · New Location',
    address: '3614 14th St NW',
    city: 'Washington, DC 20010',
    phone: '(202) 726-1334',
    lat: 38.9359,
    lng: -77.0325,
    theme: 'jungle' as const,
  },
];

export const pressLogos = ['The Washington Post', 'Yelp', 'Google', 'Tripadvisor'];

// Opening hours (24h), index 0 = Sunday ... 6 = Saturday. null = closed.
export const hours: { open: number; close: number }[] = [
  { open: 11, close: 21 }, // Sun
  { open: 11, close: 22 }, // Mon
  { open: 11, close: 22 }, // Tue
  { open: 11, close: 22 }, // Wed
  { open: 11, close: 22 }, // Thu
  { open: 11, close: 23 }, // Fri
  { open: 11, close: 23 }, // Sat
];

export const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const delivery = ['Uber Eats', 'DoorDash', 'Grubhub'];

export const events = ['Private Parties up to 100', 'Birthdays', 'Weddings', 'Quinces'];

import type { FoodKind } from '@/components/FoodArt';

// Featured highlight cards (home "From the Coals"-style grid)
export const featured: {
  name: string;
  desc: string;
  tag: string;
  kind: FoodKind;
  price: string;
  photo?: string;
}[] = [
  {
    name: 'Mixed Nachos', photo: 'nachos',
    desc: 'Chicken, Steak & Shrimp Nachos.',
    tag: 'Signature',
    kind: 'nachos',
    price: '15.95',
  },
  {
    name: 'Lomo Saltado', photo: 'steak2',
    desc: 'Grilled beef sautéed with onions, peppers, tomatoes & fries.',
    tag: 'Plate',
    kind: 'skillet',
    price: '19.95',
  },
  {
    name: 'Pollo Asado', photo: 'chicken2',
    desc: 'Out of the oven roasted-chicken. Covered with sautéed onions.',
    tag: 'Salvadoran',
    kind: 'plate',
    price: '18.95',
  },
  {
    name: 'Lomo Saltado de Pollo', photo: 'skillet',
    desc: 'Chicken with sautéed onions, peppers, tomatoes & fries.',
    tag: 'Plate',
    kind: 'skillet',
    price: '17.95',
  },
  {
    name: 'Mariscada', photo: 'soup',
    desc: 'A seafood combination of shrimp, scallops, mussels, clams, squid in a seafood broth.',
    tag: 'Mariscos',
    kind: 'soup',
    price: '21.95',
  },
  {
    name: 'Carne Asada', photo: 'steak',
    desc: 'Tender beef steak with sautéed onions in our signature sauce. Served with rice and plantain.',
    tag: 'Signature',
    kind: 'steak',
    price: '19.95',
  },
];

// Carousel: "Some Awesome Dishes!"
export const awesomeDishes: { name: string; accent: string; kind: FoodKind; photo?: string }[] = [
  { name: 'Tilapia al Horno', accent: '#3b6ea5', kind: 'fish', photo: 'plated2' },
  { name: 'Pollo al Ajillo', accent: '#e8b923', kind: 'plate', photo: 'chicken' },
  { name: 'Shrimp Taco Salad', accent: '#1e5631', kind: 'salad', photo: 'salad' },
  { name: 'Las Placitas Sampler', accent: '#d62828', kind: 'skillet', photo: 'fajitas' },
  { name: 'Salmon Campeche', accent: '#e8731c', kind: 'fish', photo: 'salmon' },
  { name: 'Lomo Saltado', accent: '#8a1f1a', kind: 'steak', photo: 'steak2' },
];

// Carousel: "Homemade Margaritas"
export const margaritas: { name: string; accent: string; photo?: string }[] = [
  { name: 'House Margarita', accent: '#e8b923', photo: 'margaritaHouse' },
  { name: 'Sangria Margarita', accent: '#b4231f', photo: 'cocktailCoupe' },
  { name: 'Spicy Margarita', accent: '#e8731c', photo: 'margaritaLime' },
  { name: 'Frozen Mango', accent: '#f2a900', photo: 'drinkMango' },
  { name: 'Strawberry', accent: '#d6336c', photo: 'margaritaStrawberry' },
  { name: 'Blue Raspberry', accent: '#2f6fb0', photo: 'cocktailBlue' },
];

// Pinned horizontal-scroll signature panels
export const menuPanels: {
  title: string;
  price: string;
  desc: string;
  kind: FoodKind;
  accent: string;
  photo?: string;
}[] = [
  { title: 'Las Placitas Sampler', price: '22.95', desc: 'Sliced steak, chicken & shrimp, sautéed veggies, fajita sauce, pork & cheese pupusa.', kind: 'skillet', accent: '#ff5e1a', photo: 'fajitas' },
  { title: 'Carne Asada', price: '19.95', desc: 'Grilled skirt steak, sautéed onions, fried plantains.', kind: 'steak', accent: '#e11d62', photo: 'steak' },
  { title: 'Mariscada', price: '21.95', desc: 'Seafood stew — shrimp, mussels, scallops, squid, fish, clams.', kind: 'soup', accent: '#ff9d2e', photo: 'soup' },
  { title: 'Salmon Campeche', price: '22.95', desc: 'Baked salmon, shrimp, scallops & veggies in saffron seafood sauce.', kind: 'fish', accent: '#b6ff2e', photo: 'salmon' },
  { title: 'Pupusas', price: '3.25', desc: 'Handmade — pork & cheese, bean & cheese, or cheese. With curtido.', kind: 'pupusa', accent: '#ff5e1a', photo: 'pupusas' },
  { title: 'Tex Mex Fajitas', price: '21.95', desc: 'Sizzling chicken, steak & shrimp over flour tortillas.', kind: 'skillet', accent: '#ff9d2e', photo: 'skillet' },
];

// Drinks (ToGo menu)
export const drinks = {
  margaritaPrice: '10.99',
  margaritas: ['House', 'Sangria', 'Spicy', 'Frozen', 'Mango', 'Strawberry', 'Blue Raspberry', 'Passionfruit', 'Lime', 'Tamarindo'],
  beerPrice: '4.99',
  beer: ['Corona', 'Modelo Especial', 'Negra Modelo', 'Pacifico', 'Heineken', 'Miller Lite', 'Michelob Ultra', 'Tecate'],
  mixedPrice: '10.99',
  mixed: ['Red Sangria', 'Piña Colada', 'Mango Daiquiri', 'Strawberry Daiquiri', 'Passionfruit Daiquiri', 'Long Island Iced Tea', 'Mojito'],
  spirits: {
    Tequila: ['Jose Cuervo', '1800', 'Casamigos', 'Patrón', 'Don Julio'],
    Whiskey: ['Jack Daniels', 'Jim Beam', 'Makers Mark', 'Johnnie Walker', 'Jameson'],
    Rum: ['Capt. Morgan', 'Bacardi', 'Malibu', 'Flor de Caña'],
  },
  frozenPrice: '4.99',
  frozen: ['Piña Colada', 'Mango', 'Strawberry', 'Passionfruit', 'Blue Raspberry'],
  softPrice: '3.50',
  soft: ['Coca Cola', 'Sprite', 'Ginger Ale', 'Iced Tea', 'Horchata', 'Tamarindo', 'Maranón', 'Pink Lemonade'],
};

// Gallery tiles
export const gallery: { name: string; kind: FoodKind; accent: string; photo?: string }[] = [
  { name: 'Shrimp Fajitas', kind: 'skillet', accent: '#e8731c', photo: 'fajitas' },
  { name: 'Las Placitas Steak', kind: 'steak', accent: '#e8b923', photo: 'ribs' },
  { name: 'Nacho Supreme', kind: 'nachos', accent: '#e8b923', photo: 'nachos' },
  { name: 'Cheesy Burrito', kind: 'burrito', accent: '#e8731c', photo: 'burrito' },
  { name: 'Fresh Chips Daily', kind: 'nachos', accent: '#e8b923', photo: 'chips' },
  { name: 'Carne Asada', kind: 'steak', accent: '#d62828', photo: 'steak' },
  { name: 'Fresh Mussels', kind: 'soup', accent: '#3b6ea5', photo: 'mussels' },
  { name: 'Lomo Saltado', kind: 'steak', accent: '#8a1f1a', photo: 'steak2' },
];

// Full menu — abbreviated to the strongest sections for the site.
export type DietTag = 'veg' | 'seafood';
export type Item = {
  name: string;
  price?: string;
  desc?: string;
  descEs?: string;
  tags?: DietTag[];
  /** 0 = mild … 3 = hot */
  spice?: number;
  /** key into lib/photos.ts */
  photo?: string;
  /** approximate calories */
  cal?: number;
};
export type MenuSection = {
  title: string;
  titleEs?: string;
  note?: string;
  noteEs?: string;
  items: Item[];
};

export const menu: MenuSection[] = [
  {
    title: 'Appetizers',
    titleEs: 'Aperitivos',
    items: [
      { name: 'Chile Con Queso Dip', price: '8.95', desc: 'House made mildly spicy creamy cheese dip with corn tortilla chips.', descEs: 'Salsa cremosa de queso, ligeramente picante, con totopos de maíz.', tags: ['veg'], spice: 1, photo: 'chips', cal: 520 },
      { name: 'Fresh Guacamole Dip', price: '11.95', desc: 'Mashed avocados with tomato, onion, lime juice and spices.', descEs: 'Aguacate machacado con tomate, cebolla, jugo de limón y especias.', tags: ['veg'], photo: 'guacamole', cal: 390 },
      { name: 'Yuca Con Chicharrón', price: '12.95', desc: 'Fried Spanish root and marinated pork morsels with house made curtido.', descEs: 'Yuca frita y trozos de cerdo marinado con curtido de la casa.', photo: 'plated3', cal: 640 },
      { name: 'Taquitos Dorados', price: '13.95', desc: 'Three crispy rolled corn tortillas, beef or chicken. Pico, guacamole, sour cream.', descEs: 'Tres tacos dorados de maíz, res o pollo. Pico, guacamole y crema.', photo: 'tacos3', cal: 580 },
      { name: 'Pupusas', price: '3.25', desc: 'Handmade corn flour tortilla — pork & cheese, bean & cheese, or cheese. With curtido.', descEs: 'Tortilla de maíz hecha a mano: cerdo y queso, frijol y queso, o queso. Con curtido.', tags: ['veg'], photo: 'pupusas', cal: 310 },
      { name: 'Ceviche Mixta', price: '13.95', desc: 'Fresh fish and shrimp marinated in lemon-lime juices and spices. Served chilled.', descEs: 'Pescado y camarón fresco marinados en limón y especias. Servido frío.', tags: ['seafood'], spice: 1, photo: 'ceviche', cal: 280 },
      { name: 'Camarones al Ajillo', price: '12.95', desc: 'Shrimps sautéed in white wine garlic butter sauce.', descEs: 'Camarones salteados en salsa de mantequilla, ajo y vino blanco.', tags: ['seafood'], photo: 'shrimp', cal: 350 },
      { name: 'Mejillones Marineros', price: '13.95', desc: 'Mussels steamed in white wine garlic ginger butter sauce.', descEs: 'Mejillones al vapor en salsa de mantequilla, ajo, jengibre y vino blanco.', tags: ['seafood'], photo: 'mussels', cal: 420 },
    ],
  },
  {
    title: 'Las Placitas Especiales',
    titleEs: 'Especiales Las Placitas',
    note: 'Served with rice and black beans.',
    noteEs: 'Servido con arroz y frijoles negros.',
    items: [
      { name: 'El Típico', price: '17.95', desc: 'Pork & cheese pupusa, chicken tamale, fried plantains, yucca, sour cream, curtido.', descEs: 'Pupusa de cerdo y queso, tamal de pollo, plátanos fritos, yuca, crema y curtido.', photo: 'plated', cal: 820 },
      { name: 'Pollo Ranchero', price: '18.95', desc: 'Salvadoran roasted half chicken, mixed veggies, signature fajita sauce.', descEs: 'Medio pollo asado al estilo salvadoreño, verduras mixtas, salsa fajita de la casa.', photo: 'chicken2', cal: 760 },
      { name: 'Carne Asada', price: '19.95', desc: 'Grilled skirt steak topped with sautéed onions and fried plantains.', descEs: 'Bistec de falda a la parrilla con cebollas salteadas y plátanos fritos.', photo: 'steak', cal: 850 },
      { name: 'Lomo Saltado', price: '19.95', desc: 'Grilled steak, fajita veggies, jalapeños and fried potatoes.', descEs: 'Bistec a la parrilla, verduras fajita, jalapeños y papas fritas.', spice: 2, photo: 'steak2', cal: 790 },
      { name: 'Las Placitas Steak', price: '21.95', desc: 'Grilled NY steak topped with veggies in a garlic butter sauce.', descEs: 'Bistec NY a la parrilla con verduras en salsa de mantequilla y ajo.', photo: 'ribs', cal: 920 },
      { name: 'Las Placitas Sampler', price: '22.95', desc: 'Sliced steak, chicken & shrimp, sautéed veggies, fajita sauce, pork & cheese pupusa.', descEs: 'Bistec, pollo y camarón en rodajas, verduras salteadas, salsa fajita y pupusa de cerdo y queso.', tags: ['seafood'], photo: 'fajitas', cal: 1050 },
    ],
  },
  {
    title: 'Especiales de Mariscos',
    titleEs: 'Especiales de Mariscos',
    note: 'Served with rice and black beans.',
    noteEs: 'Servido con arroz y frijoles negros.',
    items: [
      { name: 'Mojarra Frita', price: '18.95', desc: 'Whole fried fish, sautéed shrimp & veggies in salsa roja. Side salad & tortillas.', descEs: 'Pescado entero frito, camarón y verduras en salsa roja. Ensalada y tortillas.', tags: ['seafood'], spice: 2, photo: 'plated2', cal: 680 },
      { name: 'Tilapia al Horno', price: '18.95', desc: 'Baked tilapia, sautéed shrimp and veggies, side of fried plantains.', descEs: 'Tilapia al horno, camarón y verduras salteadas, con plátanos fritos.', tags: ['seafood'], photo: 'salmon', cal: 560 },
      { name: 'Camarones Azteca', price: '19.95', desc: 'Sautéed shrimp and veggies tossed in a saffron seafood sauce.', descEs: 'Camarón y verduras salteadas en salsa de mariscos al azafrán.', tags: ['seafood'], spice: 1, photo: 'shrimp2', cal: 510 },
      { name: 'Mariscada', price: '21.95', desc: 'Seafood stew — shrimp, mussels, scallops, squid, fish, clams.', descEs: 'Sopa de mariscos: camarón, mejillones, vieiras, calamar, pescado y almejas.', tags: ['seafood'], photo: 'soup', cal: 620 },
      { name: 'Salmon Campeche', price: '22.95', desc: 'Baked salmon, sautéed shrimp, scallops & veggies in saffron seafood sauce.', descEs: 'Salmón al horno, camarón, vieiras y verduras en salsa de mariscos al azafrán.', tags: ['seafood'], photo: 'salmon', cal: 640 },
      { name: 'Las Placitas Paella', price: '19.99', desc: 'Spanish seafood rice — shrimp, scallops, squid, chicken, mussels and clams.', descEs: 'Arroz español con mariscos: camarón, vieiras, calamar, pollo, mejillones y almejas.', tags: ['seafood'], photo: 'paella', cal: 780 },
    ],
  },
  {
    title: 'Fajitas Las Placitas',
    titleEs: 'Fajitas Las Placitas',
    note: 'Sizzling over flour tortillas with rice, beans, pico, guacamole & sour cream.',
    noteEs: 'Servidas calientes sobre tortillas de harina con arroz, frijoles, pico, guacamole y crema.',
    items: [
      { name: 'Chicken', price: '19.95', descEs: 'Pollo', photo: 'chicken', cal: 880 },
      { name: 'Steak', price: '20.95', descEs: 'Bistec', photo: 'steak2', cal: 940 },
      { name: 'Shrimp', price: '20.95', descEs: 'Camarón', tags: ['seafood'], photo: 'shrimp', cal: 820 },
      { name: 'Chicken & Steak', price: '20.95', descEs: 'Pollo y Bistec', photo: 'skillet', cal: 910 },
      { name: 'Steak & Shrimp', price: '20.95', descEs: 'Bistec y Camarón', tags: ['seafood'], photo: 'skillet', cal: 890 },
      { name: 'Tex Mex', price: '21.95', descEs: 'Tex Mex', tags: ['seafood'], spice: 1, photo: 'fajitas', cal: 960 },
    ],
  },
];

// Guest testimonials shown on the home page.
export const testimonials: { en: string; es: string; name: string; stars: number }[] = [
  {
    en: 'The pupusas are the best I have had outside El Salvador. The curtido is perfect.',
    es: 'Las pupusas son las mejores que he probado fuera de El Salvador. El curtido es perfecto.',
    name: 'Maria G.',
    stars: 5,
  },
  {
    en: 'A Capitol Hill classic. The fajitas arrive sizzling and the margaritas are dangerous.',
    es: 'Un clásico de Capitol Hill. Las fajitas llegan chisporroteando y las margaritas son peligrosas.',
    name: 'James R.',
    stars: 5,
  },
  {
    en: 'Mariscada is a must. Huge bowl, fresh seafood, and the staff treat you like family.',
    es: 'La mariscada es imprescindible. Tazón enorme, mariscos frescos y el personal te trata como familia.',
    name: 'Ana P.',
    stars: 5,
  },
  {
    en: 'Been coming here since the 90s. Same warmth, same flavor, still my favorite spot in DC.',
    es: 'Vengo desde los años 90. La misma calidez, el mismo sabor, sigue siendo mi lugar favorito en DC.',
    name: 'Robert T.',
    stars: 5,
  },
  {
    en: 'Ordered the sampler for two, left with zero regrets and a box of leftovers.',
    es: 'Pedimos el sampler para dos, salimos sin arrepentimientos y con una caja de sobras.',
    name: 'Dana W.',
    stars: 4,
  },
];

// Customization extras available on every dish.
export const extras: { id: string; en: string; es: string; price: number }[] = [
  { id: 'guac', en: 'Add Guacamole', es: 'Agregar Guacamole', price: 1.95 },
  { id: 'cheese', en: 'Extra Cheese', es: 'Queso Extra', price: 0.95 },
  { id: 'tortillas', en: 'Extra Tortillas', es: 'Tortillas Extra', price: 0.5 },
  { id: 'jalapenos', en: 'Jalapeños', es: 'Jalapeños', price: 0.75 },
  { id: 'crema', en: 'Sour Cream', es: 'Crema', price: 0.5 },
];

// Promo codes: percent off subtotal, optional minimum.
export const promoCodes: Record<string, { pct: number; min?: number }> = {
  FUEGO10: { pct: 10 },
  LAVA20: { pct: 20, min: 50 },
};
