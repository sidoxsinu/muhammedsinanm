import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date('2026-08-08'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
