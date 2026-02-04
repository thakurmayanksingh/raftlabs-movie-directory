import { MetadataRoute } from 'next'
import moviesData from '@/data/movies.json'

// Replace this with your future Vercel URL once deployed
// For now, we use a placeholder or localhost
const BASE_URL = 'https://raftlabs-movie-directory.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Static Routes (Home, Top Rated)
  const routes = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/top-rated`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // 2. Dynamic Movie Routes (One for every movie in your JSON)
  const movieRoutes = moviesData.map((movie) => ({
    url: `${BASE_URL}/movie/${movie.id}`,
    lastModified: new Date(movie.release_date), // Use release date or today
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...routes, ...movieRoutes]
}