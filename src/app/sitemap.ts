import { MetadataRoute } from "next"
import moviesData from "@/data/movies.json"
import { COLLECTION_SLUGS } from "@/lib/collections"

const BASE_URL = "https://raftlabs-movie-directory.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/top-rated`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/watchlist`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ]

  const collectionRoutes: MetadataRoute.Sitemap = COLLECTION_SLUGS.map(
    (slug) => ({
      url: `${BASE_URL}/collections/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  )

  const movieRoutes: MetadataRoute.Sitemap = moviesData.map((movie) => ({
    url: `${BASE_URL}/movie/${movie.id}`,
    lastModified: new Date(movie.release_date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...collectionRoutes, ...movieRoutes]
}