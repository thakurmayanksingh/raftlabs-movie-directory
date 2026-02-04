import { Metadata } from 'next'
import Link from 'next/link'
import moviesData from '@/data/movies.json'
import { MovieCard } from '@/components/movie-card'
import { Movie } from '@/types/movie'

const movies = moviesData as Movie[]

export const metadata: Metadata = {
  title: 'Top 10 Rated Movies - RaftLabs Cinema',
  description: 'The absolute best movies of all time.',
}

export default function TopRated() {
  // Sort by rating and take top 10
  const topMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10)

  return (
    <main className="min-h-screen">
      <section className="border-b border-gray-800 bg-white/5 py-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl text-[var(--foreground)]">
          Hall of <span className="text-yellow-500">Fame</span>
        </h1>
        <p className="mb-6 text-lg opacity-70">
          The top 10 highest-rated masterpieces in our collection.
        </p>
        <Link 
          href="/" 
          className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          &larr; Back to All Movies
        </Link>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {topMovies.map((movie, index) => (
            <div key={movie.id} className="relative">
              {/* Rank Badge */}
              <div className="absolute -left-2 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-black shadow-lg ring-4 ring-black">
                #{index + 1}
              </div>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}