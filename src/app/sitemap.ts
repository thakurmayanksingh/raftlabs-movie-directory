import { MetadataRoute } from 'next'
import moviesData from '@/data/movies.json'

// ⚠️ NOTE: Update this URL to your actual Vercel link after you deploy!
// Example: 'https://raftlabs-cinema-bunny.vercel.app'
const BASE_URL = 'https://raftlabs-movie-directory.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Static Routes
  const routes = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/watchlist`, // Added Watchlist page
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // 2. Dynamic Movie Routes (One for every movie in your JSON)
  const movieRoutes = moviesData.map((movie) => ({
    url: `${BASE_URL}/movie/${movie.id}`,
    lastModified: new Date(movie.release_date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...routes, ...movieRoutes]
}