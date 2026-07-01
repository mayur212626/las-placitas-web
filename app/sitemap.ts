import type { MetadataRoute } from 'next';

const BASE = 'https://las-placitas-web.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/menu', '/specials', '/locations'];
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : 0.8,
  }));
}
