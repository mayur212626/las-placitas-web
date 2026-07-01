const BASE = 'https://las-placitas-web.vercel.app';

const openingHours = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '11:00', closes: '22:00' },
  { days: ['Friday', 'Saturday'], opens: '11:00', closes: '23:00' },
  { days: ['Sunday'], opens: '11:00', closes: '21:00' },
];

const spec = openingHours.map((h) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: h.days,
  opens: h.opens,
  closes: h.closes,
}));

const restaurant = (
  name: string,
  street: string,
  zip: string,
  phone: string,
) => ({
  '@type': 'Restaurant',
  name,
  servesCuisine: ['Mexican', 'Salvadoran'],
  priceRange: '$$',
  telephone: phone,
  url: BASE,
  menu: `${BASE}/menu`,
  acceptsReservations: 'True',
  address: {
    '@type': 'PostalAddress',
    streetAddress: street,
    addressLocality: 'Washington',
    addressRegion: 'DC',
    postalCode: zip,
    addressCountry: 'US',
  },
  openingHoursSpecification: spec,
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    restaurant('Las Placitas — Capitol Hill', '1100 8th St SE', '20003', '+1-202-543-3700'),
    restaurant('Las Placitas Dos — 14th St', '3614 14th St NW', '20010', '+1-202-726-1334'),
  ],
};

/** Restaurant schema.org JSON-LD for rich Google results. */
export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
