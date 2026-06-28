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
    theme: 'navy' as const,
  },
  {
    id: '14th-st',
    name: 'Las Placitas Dos',
    sub: '14th St · New Location',
    address: '3614 14th St NW',
    city: 'Washington, DC 20010',
    phone: '(202) 726-1334',
    theme: 'jungle' as const,
  },
];

export const pressLogos = ['The Washington Post', 'Yelp', 'Google', 'Tripadvisor'];

export const delivery = ['Uber Eats', 'DoorDash', 'Grubhub'];

export const events = ['Private Parties up to 100', 'Birthdays', 'Weddings', 'Quinces'];

import type { FoodKind } from '@/components/FoodArt';

// Featured highlight cards (home "From the Coals"-style grid)
export const featured: { name: string; desc: string; tag: string; kind: FoodKind }[] = [
  {
    name: 'Mixed Nachos',
    desc: 'Chicken, Steak & Shrimp Nachos.',
    tag: 'Signature',
    kind: 'nachos',
  },
  {
    name: 'Lomo Saltado',
    desc: 'Grilled beef sautéed with onions, peppers, tomatoes & fries.',
    tag: 'Plate',
    kind: 'skillet',
  },
  {
    name: 'Pollo Asado',
    desc: 'Out of the oven roasted-chicken. Covered with sautéed onions.',
    tag: 'Salvadoran',
    kind: 'plate',
  },
  {
    name: 'Lomo Saltado de Pollo',
    desc: 'Chicken with sautéed onions, peppers, tomatoes & fries.',
    tag: 'Plate',
    kind: 'skillet',
  },
  {
    name: 'Mariscada',
    desc: 'A seafood combination of shrimp, scallops, mussels, clams, squid in a seafood broth.',
    tag: 'Mariscos',
    kind: 'soup',
  },
  {
    name: 'Carne Asada',
    desc: 'Tender beef steak with sautéed onions in our signature sauce. Served with rice and plantain.',
    tag: 'Signature',
    kind: 'steak',
  },
];

// Carousel: "Some Awesome Dishes!"
export const awesomeDishes: { name: string; accent: string; kind: FoodKind }[] = [
  { name: 'Tilapia al Horno', accent: '#3b6ea5', kind: 'fish' },
  { name: 'Pollo al Ajillo', accent: '#e8b923', kind: 'plate' },
  { name: 'Shrimp Taco Salad', accent: '#1e5631', kind: 'salad' },
  { name: 'Las Placitas Sampler', accent: '#d62828', kind: 'skillet' },
  { name: 'Salmon Campeche', accent: '#e8731c', kind: 'fish' },
  { name: 'Lomo Saltado', accent: '#8a1f1a', kind: 'steak' },
];

// Carousel: "Homemade Margaritas"
export const margaritas = [
  { name: 'House Margarita', accent: '#e8b923' },
  { name: 'Sangria Margarita', accent: '#b4231f' },
  { name: 'Spicy Margarita', accent: '#e8731c' },
  { name: 'Frozen Mango', accent: '#f2a900' },
  { name: 'Strawberry', accent: '#d6336c' },
  { name: 'Blue Raspberry', accent: '#2f6fb0' },
];

// Pinned horizontal-scroll signature panels
export const menuPanels: {
  title: string;
  price: string;
  desc: string;
  kind: FoodKind;
  accent: string;
}[] = [
  { title: 'Las Placitas Sampler', price: '22.95', desc: 'Sliced steak, chicken & shrimp, sautéed veggies, fajita sauce, pork & cheese pupusa.', kind: 'skillet', accent: '#ff5e1a' },
  { title: 'Carne Asada', price: '19.95', desc: 'Grilled skirt steak, sautéed onions, fried plantains.', kind: 'steak', accent: '#e11d62' },
  { title: 'Mariscada', price: '21.95', desc: 'Seafood stew — shrimp, mussels, scallops, squid, fish, clams.', kind: 'soup', accent: '#ff9d2e' },
  { title: 'Salmon Campeche', price: '22.95', desc: 'Baked salmon, shrimp, scallops & veggies in saffron seafood sauce.', kind: 'fish', accent: '#b6ff2e' },
  { title: 'Pupusas', price: '3.25', desc: 'Handmade — pork & cheese, bean & cheese, or cheese. With curtido.', kind: 'pupusa', accent: '#ff5e1a' },
  { title: 'Tex Mex Fajitas', price: '21.95', desc: 'Sizzling chicken, steak & shrimp over flour tortillas.', kind: 'skillet', accent: '#ff9d2e' },
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
export const gallery: { name: string; kind: FoodKind; accent: string }[] = [
  { name: 'Shrimp Fajitas', kind: 'skillet', accent: '#e8731c' },
  { name: 'Las Placitas Steak', kind: 'steak', accent: '#e8b923' },
  { name: 'Nacho Supreme', kind: 'nachos', accent: '#e8b923' },
  { name: 'Cheesy Burrito', kind: 'burrito', accent: '#e8731c' },
  { name: 'Fresh Chips Daily', kind: 'nachos', accent: '#e8b923' },
  { name: 'Carne Asada', kind: 'steak', accent: '#d62828' },
  { name: 'Fresh Mussels', kind: 'soup', accent: '#3b6ea5' },
  { name: 'Lomo Saltado', kind: 'steak', accent: '#8a1f1a' },
];

// Full menu — abbreviated to the strongest sections for the site.
export type Item = { name: string; price?: string; desc?: string };
export type MenuSection = { title: string; note?: string; items: Item[] };

export const menu: MenuSection[] = [
  {
    title: 'Appetizers',
    items: [
      { name: 'Chile Con Queso Dip', price: '8.95', desc: 'House made mildly spicy creamy cheese dip with corn tortilla chips.' },
      { name: 'Fresh Guacamole Dip', price: '11.95', desc: 'Mashed avocados with tomato, onion, lime juice and spices.' },
      { name: 'Yuca Con Chicharrón', price: '12.95', desc: 'Fried Spanish root and marinated pork morsels with house made curtido.' },
      { name: 'Taquitos Dorados', price: '13.95', desc: 'Three crispy rolled corn tortillas, beef or chicken. Pico, guacamole, sour cream.' },
      { name: 'Pupusas', price: '3.25', desc: 'Handmade corn flour tortilla — pork & cheese, bean & cheese, or cheese. With curtido.' },
      { name: 'Ceviche Mixta', price: '13.95', desc: 'Fresh fish and shrimp marinated in lemon-lime juices and spices. Served chilled.' },
      { name: 'Camarones al Ajillo', price: '12.95', desc: 'Shrimps sautéed in white wine garlic butter sauce.' },
      { name: 'Mejillones Marineros', price: '13.95', desc: 'Mussels steamed in white wine garlic ginger butter sauce.' },
    ],
  },
  {
    title: 'Las Placitas Especiales',
    note: 'Served with rice and black beans.',
    items: [
      { name: 'El Típico', price: '17.95', desc: 'Pork & cheese pupusa, chicken tamale, fried plantains, yucca, sour cream, curtido.' },
      { name: 'Pollo Ranchero', price: '18.95', desc: 'Salvadoran roasted half chicken, mixed veggies, signature fajita sauce.' },
      { name: 'Carne Asada', price: '19.95', desc: 'Grilled skirt steak topped with sautéed onions and fried plantains.' },
      { name: 'Lomo Saltado', price: '19.95', desc: 'Grilled steak, fajita veggies, jalapeños and fried potatoes.' },
      { name: 'Las Placitas Steak', price: '21.95', desc: 'Grilled NY steak topped with veggies in a garlic butter sauce.' },
      { name: 'Las Placitas Sampler', price: '22.95', desc: 'Sliced steak, chicken & shrimp, sautéed veggies, fajita sauce, pork & cheese pupusa.' },
    ],
  },
  {
    title: 'Especiales de Mariscos',
    note: 'Served with rice and black beans.',
    items: [
      { name: 'Mojarra Frita', price: '18.95', desc: 'Whole fried fish, sautéed shrimp & veggies in salsa roja. Side salad & tortillas.' },
      { name: 'Tilapia al Horno', price: '18.95', desc: 'Baked tilapia, sautéed shrimp and veggies, side of fried plantains.' },
      { name: 'Camarones Azteca', price: '19.95', desc: 'Sautéed shrimp and veggies tossed in a saffron seafood sauce.' },
      { name: 'Mariscada', price: '21.95', desc: 'Seafood stew — shrimp, mussels, scallops, squid, fish, clams.' },
      { name: 'Salmon Campeche', price: '22.95', desc: 'Baked salmon, sautéed shrimp, scallops & veggies in saffron seafood sauce.' },
      { name: 'Las Placitas Paella', price: '19.99', desc: 'Spanish seafood rice — shrimp, scallops, squid, chicken, mussels and clams.' },
    ],
  },
  {
    title: 'Fajitas Las Placitas',
    note: 'Sizzling over flour tortillas with rice, beans, pico, guacamole & sour cream.',
    items: [
      { name: 'Chicken', price: '19.95' },
      { name: 'Steak', price: '20.95' },
      { name: 'Shrimp', price: '20.95' },
      { name: 'Chicken & Steak', price: '20.95' },
      { name: 'Steak & Shrimp', price: '20.95' },
      { name: 'Tex Mex', price: '21.95' },
    ],
  },
];
