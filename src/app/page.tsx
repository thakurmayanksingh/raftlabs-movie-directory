import { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import moviesData from '@/data/movies.json'
import { MovieGrid } from '@/components/movie-grid'
import { Movie } from '@/types/movie'

const movies = moviesData as Movie[]

export const metadata: Metadata = {
  title: 'RaftLabs Movie Directory',
  description: 'Top rated movies powered by TMDB API',
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Updated Hero Section: Reduced vertical padding (py-16 -> py-10) */}
      <section className="border-b border-gray-800 bg-white/5 py-10 text-center">
        <div className="container mx-auto px-4">
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-5xl">
            The <span className="text-blue-600">Collection</span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-base opacity-70">
            A programmatic directory of the top 250+ highest-rated movies of all time.
          </p>

          <Link 
            href="/top-rated" 
            className="inline-block rounded-lg border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold transition-colors hover:bg-white/20 hover:text-white"
          >
            🏆 View Hall of Fame
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center text-white">Loading movies...</div>}>
          <MovieGrid initialMovies={movies} />
        </Suspense>
      </section>
    </main>
  )
}