'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'es';

type Dict = Record<string, { en: string; es: string }>;

const dict: Dict = {
  // nav
  'nav.home': { en: 'Home', es: 'Inicio' },
  'nav.about': { en: 'About', es: 'Nosotros' },
  'nav.menu': { en: 'Menu', es: 'Menú' },
  'nav.specials': { en: 'Specials', es: 'Especiales' },
  'nav.contact': { en: 'Contact', es: 'Contacto' },
  'nav.order': { en: 'Order', es: 'Ordenar' },
  'nav.reserve': { en: 'Reserve', es: 'Reservar' },

  // hero
  'hero.kicker1': { en: 'Fire-Born Kitchen', es: 'Cocina Nacida del Fuego' },
  'hero.kicker2': { en: 'Mexican & Salvadoran', es: 'Mexicana y Salvadoreña' },
  'hero.est': { en: 'Est. 1990', es: 'Desde 1990' },
  'hero.sub1': { en: 'Born of fire', es: 'Nacido del fuego' },
  'hero.sub2': { en: 'and tradition.', es: 'y la tradición.' },
  'hero.viewMenu': { en: 'View Menu', es: 'Ver Menú' },
  'hero.findUs': { en: 'Find Us', es: 'Encuéntranos' },
  'hero.scroll': { en: 'Scroll to explore', es: 'Desplázate para explorar' },

  // about
  'about.kicker': { en: "It's our passion", es: 'Es nuestra pasión' },
  'about.title1': { en: 'A taste of', es: 'Un sabor de' },
  'about.title2': { en: 'two homelands', es: 'dos patrias' },
  'about.blurb': {
    en: 'We at Las Placitas are well known for our great food. Our passion is the kitchen, where we create a good mix of our homemade recipes and specialty dishes. Our unique Mexican & Salvadorian style cuisine makes our food very tasty and authentic. Proudly serving Capitol Hill since 1990!',
    es: 'En Las Placitas somos reconocidos por nuestra gran comida. Nuestra pasión es la cocina, donde creamos una buena mezcla de recetas caseras y platillos especiales. Nuestra cocina única de estilo mexicano y salvadoreño hace que nuestra comida sea muy sabrosa y auténtica. ¡Orgullosos de servir a Capitol Hill desde 1990!',
  },
  'stat.years': { en: 'Years on the Hill', es: 'Años en Capitol Hill' },
  'stat.locations': { en: 'DC Locations', es: 'Ubicaciones en DC' },
  'stat.since': { en: 'Serving since', es: 'Sirviendo desde' },

  // featured / sections
  'featured.word1': { en: 'Featured', es: 'Delicias' },
  'featured.word2': { en: 'Delicacies', es: 'Destacadas' },
  'featured.sub': {
    en: 'Freshest ingredients, daily. Touched by fire, plated with pride.',
    es: 'Ingredientes frescos, a diario. Tocados por el fuego, servidos con orgullo.',
  },
  'gallery.kicker': { en: 'Fresh chips & salsa daily', es: 'Totopos y salsa frescos a diario' },
  'gallery.title1': { en: 'From the', es: 'De la' },
  'gallery.title2': { en: 'kitchen', es: 'cocina' },

  // menu page
  'menu.title1': { en: 'Made from', es: 'Hecho desde' },
  'menu.title2': { en: 'scratch', es: 'cero' },
  'menu.sub': {
    en: 'Filter by course. Full menu in-store · 3.8% cash discount · 18% gratuity on dine-in.',
    es: 'Filtra por categoría. Menú completo en tienda · 3.8% de descuento en efectivo · 18% de propina al comer aquí.',
  },
  'menu.search': { en: 'Search dishes…', es: 'Buscar platillos…' },
  'menu.all': { en: 'All', es: 'Todos' },
  'menu.resultsFor': { en: 'results for', es: 'resultados para' },
  'menu.resultFor': { en: 'result for', es: 'resultado para' },
  'menu.none': { en: 'No dishes found', es: 'No se encontraron platillos' },
  'menu.noneSub': { en: 'Try another search or clear the filter.', es: 'Prueba otra búsqueda o limpia el filtro.' },
  'menu.reset': { en: 'Reset', es: 'Restablecer' },
  'menu.add': { en: '+ Add to order', es: '+ Añadir al pedido' },
  'menu.added': { en: '✓ Added to order', es: '✓ Añadido al pedido' },
  'menu.reserve': { en: 'Reserve a Table', es: 'Reservar Mesa' },
  'menu.seeDrinks': { en: 'See Drinks & Specials', es: 'Ver Bebidas y Especiales' },

  // cart
  'cart.title': { en: 'Your Order', es: 'Tu Pedido' },
  'cart.empty': { en: 'Your cart is empty', es: 'Tu carrito está vacío' },
  'cart.emptySub': { en: 'Add some dishes from the menu to get started.', es: 'Agrega platillos del menú para empezar.' },
  'cart.browse': { en: 'Browse Menu', es: 'Ver Menú' },
  'cart.subtotal': { en: 'Subtotal', es: 'Subtotal' },
  'cart.checkout': { en: 'Checkout', es: 'Pagar' },
  'cart.clear': { en: 'Clear cart', es: 'Vaciar carrito' },
  'cart.placed': { en: '¡Order placed!', es: '¡Pedido realizado!' },
  'cart.placedSub': { en: "Thanks. We'll have it ready for you.", es: 'Gracias. Lo tendremos listo para ti.' },

  // order modal
  'order.kicker': { en: 'Reserve a table', es: 'Reserva una mesa' },
  'order.title': { en: 'Book Las Placitas', es: 'Reserva en Las Placitas' },
  'order.name': { en: 'Name', es: 'Nombre' },
  'order.phone': { en: 'Phone', es: 'Teléfono' },
  'order.guests': { en: 'guests', es: 'personas' },
  'order.time': { en: 'Time', es: 'Hora' },
  'order.request': { en: 'Request Reservation', es: 'Solicitar Reserva' },
  'order.thanks': { en: '¡Gracias!', es: '¡Gracias!' },
  'order.confirm': { en: "Request received. We'll call to confirm your table.", es: 'Solicitud recibida. Te llamaremos para confirmar tu mesa.' },
  'order.done': { en: 'Done', es: 'Listo' },

  // specials
  'sp.kicker': { en: 'Specials & Drinks', es: 'Especiales y Bebidas' },
  'sp.title1': { en: 'Homemade', es: 'Margaritas' },
  'sp.title2': { en: 'Margaritas', es: 'Caseras' },
  'sp.allOne': { en: 'All one price', es: 'Todo un precio' },
  'sp.beer': { en: 'Beer', es: 'Cerveza' },
  'sp.mixed': { en: 'Mixed Drinks', es: 'Bebidas Mezcladas' },
  'sp.frozen': { en: 'Frozen Daiquiris', es: 'Daiquiris Congelados' },
  'sp.soft': { en: 'Soft Drinks & Juices', es: 'Refrescos y Jugos' },
  'sp.back': { en: 'Back to Menu', es: 'Volver al Menú' },

  // locations
  'loc.kicker': { en: 'Contact', es: 'Contacto' },
  'loc.title1': { en: 'Two', es: 'Dos' },
  'loc.title2': { en: 'Locations', es: 'Ubicaciones' },
  'loc.catering': { en: 'Catering & events:', es: 'Catering y eventos:' },

  // specials/menu shared
  'specials.awesome1': { en: 'Some', es: 'Algunos' },
  'specials.awesome2': { en: 'Awesome', es: 'Increíbles' },
  'specials.awesome3': { en: 'Dishes', es: 'Platillos' },
  'specials.margs': { en: 'Homemade Margaritas', es: 'Margaritas Caseras' },

  // CTA + footer
  'cta.title': { en: "Let's Eat", es: 'A Comer' },
  'cta.thanks': { en: "Thank you to all who've supported us over 35 years on Capitol Hill.", es: 'Gracias a todos los que nos han apoyado durante 35 años en Capitol Hill.' },
  'cta.order': { en: 'Order Now', es: 'Ordenar Ahora' },
  'cta.seeMenu': { en: 'See the Menu', es: 'Ver el Menú' },
  'foot.catering': { en: 'Catering available', es: 'Catering disponible' },
  'foot.rights': { en: 'All rights reserved', es: 'Todos los derechos reservados' },
  'menu.note': { en: 'Full menu in-store · 3.8% cash discount · 18% gratuity on dine-in', es: 'Menú completo en tienda · 3.8% descuento en efectivo · 18% propina al comer aquí' },
  'sig.kicker': { en: 'Signature', es: 'Especialidades' },
  'sig.title1': { en: 'House', es: 'Platos' },
  'sig.title2': { en: 'Favorites', es: 'Estrella' },
  'sig.viewFull': { en: 'View Full Menu', es: 'Ver Menú Completo' },
  'hours.open': { en: 'Open now', es: 'Abierto ahora' },
  'hours.closed': { en: 'Closed', es: 'Cerrado' },
  'hours.until': { en: 'until', es: 'hasta las' },
  'hours.opens': { en: 'opens', es: 'abre a las' },
  'hours.title': { en: 'Hours', es: 'Horario' },
  'co.pickup': { en: 'Pickup location', es: 'Lugar de recogida' },
  'co.time': { en: 'Pickup time', es: 'Hora de recogida' },
  'co.asap': { en: 'ASAP (20–30 min)', es: 'Cuanto antes (20–30 min)' },
  'co.tip': { en: 'Tip', es: 'Propina' },
  'co.customTip': { en: 'Custom', es: 'Otro' },
  'co.tax': { en: 'Tax', es: 'Impuesto' },
  'co.total': { en: 'Total', es: 'Total' },
  'co.place': { en: 'Place Order', es: 'Realizar Pedido' },
  'co.back': { en: 'Back', es: 'Atrás' },
  'co.checkout': { en: 'Checkout', es: 'Finalizar' },
  'co.orderNo': { en: 'Order number', es: 'Número de pedido' },
  'co.confirm': { en: "We'll have it ready for pickup. Show this number at the counter.", es: 'Lo tendremos listo para recoger. Muestra este número en el mostrador.' },

  // filters + tags
  'fl.veg': { en: 'Vegetarian', es: 'Vegetariano' },
  'fl.seafood': { en: 'Seafood', es: 'Mariscos' },
  'fl.spicy': { en: 'Spicy', es: 'Picante' },
  'fl.favs': { en: 'Favorites', es: 'Favoritos' },

  // testimonials
  'tst.kicker': { en: 'Reviews', es: 'Reseñas' },
  'tst.title1': { en: 'What guests', es: 'Lo que dicen' },
  'tst.title2': { en: 'say', es: 'los clientes' },

  // command palette
  'pal.placeholder': { en: 'Search dishes, pages, actions…', es: 'Buscar platillos, páginas, acciones…' },
  'pal.pages': { en: 'Pages', es: 'Páginas' },
  'pal.dishes': { en: 'Dishes', es: 'Platillos' },
  'pal.actions': { en: 'Actions', es: 'Acciones' },
  'pal.openCart': { en: 'Open cart', es: 'Abrir carrito' },
  'pal.reserve': { en: 'Reserve a table', es: 'Reservar mesa' },
  'pal.lang': { en: 'Switch to Español', es: 'Cambiar a English' },
  'pal.hint': { en: 'navigate · enter select · esc close', es: 'navegar · enter elegir · esc cerrar' },
  'pal.empty': { en: 'No results', es: 'Sin resultados' },

  // order history
  'ord.past': { en: 'Past orders', es: 'Pedidos anteriores' },
  'ord.reorder': { en: 'Reorder', es: 'Repetir' },

  // toasts
  'toast.added': { en: 'added to your order', es: 'añadido a tu pedido' },
  'toast.promo': { en: 'Promo applied', es: 'Promo aplicada' },
  'toast.news': { en: 'Welcome to the familia! Check your inbox.', es: '¡Bienvenido a la familia! Revisa tu correo.' },

  // order tracker
  'trk.title': { en: 'Track your order', es: 'Sigue tu pedido' },
  'trk.received': { en: 'Order received', es: 'Pedido recibido' },
  'trk.preparing': { en: 'Preparing', es: 'Preparando' },
  'trk.fire': { en: 'On the fire', es: 'En el fuego' },
  'trk.ready': { en: 'Ready for pickup', es: 'Listo para recoger' },
  'trk.chip': { en: 'Track order', es: 'Seguir pedido' },
  'trk.eta': { en: 'Estimated ready', es: 'Listo aprox.' },

  // customization + nutrition
  'ex.title': { en: 'Make it yours', es: 'Hazlo a tu gusto' },
  'nut.cal': { en: 'cal', es: 'cal' },

  // promo
  'promo.label': { en: 'Promo code', es: 'Código promo' },
  'promo.apply': { en: 'Apply', es: 'Aplicar' },
  'promo.invalid': { en: 'Invalid or ineligible code', es: 'Código inválido o no aplicable' },
  'promo.discount': { en: 'Discount', es: 'Descuento' },

  // cookies + privacy
  'ck.msg': { en: 'We use cookies to keep your cart, language and orders on this device.', es: 'Usamos cookies para guardar tu carrito, idioma y pedidos en este dispositivo.' },
  'ck.accept': { en: 'Got it', es: 'Entendido' },
  'ck.privacy': { en: 'Privacy policy', es: 'Política de privacidad' },

  // story timeline
  'story.kicker': { en: 'Our story', es: 'Nuestra historia' },
  'story.1990': { en: 'A single hearth opens on Capitol Hill', es: 'Un solo fogón abre en Capitol Hill' },
  'story.2005': { en: 'The Washington Post takes notice', es: 'The Washington Post nos descubre' },
  'story.2019': { en: 'Las Placitas Dos opens on 14th St', es: 'Las Placitas Dos abre en la 14th St' },
  'story.2025': { en: '35 years of fire and familia', es: '35 años de fuego y familia' },

  // careers + newsletter
  'car.title': { en: 'Join the familia', es: 'Únete a la familia' },
  'car.sub': { en: "We're always looking for cooks, servers and smiling faces. Write to us.", es: 'Siempre buscamos cocineros, meseros y caras sonrientes. Escríbenos.' },
  'car.cta': { en: 'Apply by email', es: 'Postúlate por correo' },
  'nl.title': { en: 'Get the specials first', es: 'Recibe los especiales primero' },
  'nl.sub': { en: 'New dishes, drink nights and secret promos. No spam.', es: 'Nuevos platillos, noches de bebidas y promos secretas. Sin spam.' },
  'nl.placeholder': { en: 'Your email', es: 'Tu correo' },
  'nl.cta': { en: 'Sign up', es: 'Suscribirme' },

  // nearest location
  'near.cta': { en: 'Find my nearest Placitas', es: 'Encuentra tu Placitas más cercana' },
  'near.mi': { en: 'mi away', es: 'mi de distancia' },
  'near.nearest': { en: 'Nearest to you', es: 'Más cercana a ti' },
  'near.directions': { en: 'Get directions', es: 'Cómo llegar' },
  'near.denied': { en: 'Location unavailable — showing both spots.', es: 'Ubicación no disponible — mostrando ambos locales.' },

  // errors
  'err.title': { en: 'Something burned in the kitchen', es: 'Algo se quemó en la cocina' },
  'err.retry': { en: 'Try again', es: 'Intentar de nuevo' },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };
const LangCtx = createContext<Ctx | null>(null);
const KEY = 'lp-lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Lang | null;
      if (saved === 'en' || saved === 'es') {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l;
  };

  const t = (key: string) => dict[key]?.[lang] ?? key;

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error('useLang must be used within LanguageProvider');
  return c;
}
