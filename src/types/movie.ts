export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number // Note: Some datasets use vote_average, some use rating
  vote_count: number
  popularity: number // <--- ADD THIS LINE
  genres: string[]
  rating: number     // Keep this if your app uses 'rating' instead of 'vote_average'
}