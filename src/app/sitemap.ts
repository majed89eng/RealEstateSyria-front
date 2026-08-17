import { MetadataRoute } from 'next';
import { propertyService } from '@/services/propertyService';
import { SYRIAN_LOCATIONS } from '@/data/locations';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate-syria.com';
  const properties = await propertyService.getProperties();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/provinces`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-assistant`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic Provinces routes
  const provinceRoutes: MetadataRoute.Sitemap = SYRIAN_LOCATIONS.map((loc) => ({
    url: `${baseUrl}/provinces/${loc.provinceSlug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Properties routes
  const propertyRoutes: MetadataRoute.Sitemap = properties.map((prop) => ({
    url: `${baseUrl}/properties/${prop.slug}`,
    lastModified: prop.updatedAt ? new Date(prop.updatedAt) : new Date(prop.createdAt),
    changeFrequency: 'weekly',
    priority: prop.featured ? 0.95 : 0.8,
  }));

  return [...staticRoutes, ...provinceRoutes, ...propertyRoutes];
}
