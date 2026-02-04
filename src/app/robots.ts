import { MetadataRoute } from 'next'

// ⚠️ Update this to match the BASE_URL in your sitemap.ts
const BASE_URL = 'https://raftlabs-movie-directory.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',     // Allow all search engines (Google, Bing, etc.)
      allow: '/',         // Allow them to visit all pages
      disallow: '/private/', // (Optional) Disallow private folders if you had any
    },
    sitemap: `${BASE_URL}/sitemap.xml`, // Tells them where to find the map
  }
}