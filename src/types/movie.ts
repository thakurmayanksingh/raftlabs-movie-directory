export interface Movie {
    id: number
    title: string
    overview: string
    release_date: string
    rating: number
    vote_count: number
    poster_path: string | null
    backdrop_path: string | null
    genres: string[]
  }