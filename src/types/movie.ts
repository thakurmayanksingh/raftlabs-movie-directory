export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average?: number // Optional: Some datasets use vote_average, some use rating
  vote_count: number
  popularity?: number
  genres: string[]
  rating: number
}