import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Las Placitas — Mexican & Salvadoran',
    short_name: 'Las Placitas',
    description:
      'Authentic Mexican & Salvadoran food, born of fire since 1990. Two DC locations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0807',
    theme_color: '#0a0807',
    orientation: 'portrait',
    categories: ['food', 'restaurant'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
}
