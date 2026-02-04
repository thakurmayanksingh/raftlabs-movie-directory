/**
 * Collection permutations - different views of the same movie dataset.
 * Used for dedicated routes like /collections/best-crime, /collections/top-rated-2024
 */
export const COLLECTION_CONFIG: Record<
  string,
  {
    title: string
    description: string
    params: Record<string, string>
    color: string
  }
> = {
  "best-crime": {
    title: "Best Crime Movies",
    description: "The highest-rated crime films of all time",
    params: { genre: "Crime", sort: "rating_desc" },
    color: "from-amber-500 to-orange-600",
  },
  "top-rated-2024": {
    title: "Top Rated 2024",
    description: "The best movies from 2024 in our collection",
    params: { decade: "2020", sort: "rating_desc" },
    color: "from-blue-500 to-cyan-500",
  },
  "90s-nostalgia": {
    title: "90s Nostalgia",
    description: "The golden era of cinema",
    params: { decade: "1990", sort: "rating_desc" },
    color: "from-purple-500 to-indigo-500",
  },
  "critics-choice": {
    title: "Critics' Choice",
    description: "Rated 8.5 and above",
    params: { rating: "8.5", sort: "rating_desc" },
    color: "from-emerald-500 to-teal-500",
  },
  "modern-masterpieces": {
    title: "Modern Masterpieces",
    description: "Best of the 2010s",
    params: { decade: "2010", sort: "rating_desc" },
    color: "from-blue-500 to-cyan-500",
  },
  "old-school": {
    title: "Old School",
    description: "Classics before 1980",
    params: { decade: "1970", sort: "rating_desc" },
    color: "from-orange-500 to-red-500",
  },
  "best-animation": {
    title: "Best Animation",
    description: "Top animated films of all time",
    params: { genre: "Animation", sort: "rating_desc" },
    color: "from-pink-500 to-rose-500",
  },
  "sci-fi-favorites": {
    title: "Sci-Fi Favorites",
    description: "The best science fiction movies",
    params: { genre: "Science Fiction", sort: "rating_desc" },
    color: "from-violet-500 to-purple-600",
  },
}

export const COLLECTION_SLUGS = Object.keys(COLLECTION_CONFIG)
