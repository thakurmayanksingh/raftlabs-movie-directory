import { Metadata } from 'next'
import { Suspense } from 'react' // Import Suspense
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
      <section className="border-b border-gray-800 bg-white/5 py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            RaftLabs <span className="text-blue-600">Cinema</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-70">
            A programmatic directory of the top 250+ highest-rated movies of all time.
            Generated statically from the TMDB dataset.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {/* Wrap MovieGrid in Suspense to handle the URL search params safely */}
        <Suspense fallback={<div className="text-center text-white">Loading movies...</div>}>
          <MovieGrid initialMovies={movies} />
        </Suspense>
      </section>
    </main>
  )
}