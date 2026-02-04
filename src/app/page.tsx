import { Metadata } from 'next'
import moviesData from '@/data/movies.json'
import { MovieCard } from '@/components/movie-card'
import { Movie } from '@/types/movie'

// We force the type here to ensure TypeScript is happy with the JSON import
const movies = moviesData as Movie[]

export const metadata: Metadata = {
  title: 'RaftLabs Movie Directory',
  description: 'Top rated movies powered by TMDB API',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-slate-900 py-16 text-center shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            RaftLabs <span className="text-blue-500">Cinema</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            A programmatic directory of the top 250+ highest-rated movies of all time.
            Generated statically from the TMDB dataset.
          </p>
        </div>
      </section>

      {/* Movie Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  )
}