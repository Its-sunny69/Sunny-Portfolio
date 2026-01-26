import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sunny-portfolio-teal.vercel.app'
  const lastModified = new Date()

  // Define your profile images
  const profileImages = [
    `${baseUrl}/profile.webp`,
    `${baseUrl}/profile2.webp`,
  ]

  const contactImages = [
    `${baseUrl}/contact.webp`,
  ]

  const routes: MetadataRoute.Sitemap = [
    // Homepage - single page portfolio
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [...profileImages, ...contactImages],
    },
    // External project links (for SEO and discoverability)
    {
      url: 'https://www.briefox.com',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://arise-hazel.vercel.app',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://oak-together-fkup.vercel.app',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://trust-vibes.vercel.app',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // GitHub repositories
    {
      url: 'https://github.com/Its-sunny69/Essential-Graphic-Design-Tools',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://github.com/Its-sunny69/Arise',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://github.com/Its-sunny69/Oak-Together',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://github.com/Its-sunny69/ReviewProvider',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  return routes
}