import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import moviesData from '@/data/movies.json'
import { Movie } from '@/types/movie'
import { BackButton } from '@/components/back-button'
import { AddToWatchlist } from '@/components/add-to-watchlist'
import { MovieCard } from '@/components/movie-card'

const movies = moviesData as Movie[]

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const movie = movies.find((m) => m.id.toString() === id)

  if (!movie) return { title: 'Movie Not Found' }

  return {
    title: `${movie.title} | RaftLabs Cinema`,
    description: movie.overview.slice(0, 160) + '...',
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: movie.backdrop_path ? [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`] : [],
    },
  }
}

export async function generateStaticParams() {
  return movies.map((movie) => ({ id: movie.id.toString() }))
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params
  const movie = movies.find((m) => m.id.toString() === id)

  if (!movie) notFound()

  // Logic: Find Related Movies
  const relatedMovies = movies
    .filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)))
    .slice(0, 4)

  // Calculate percentage for the rating bar (e.g. 8.7 -> 87%)
  const ratingPercent = Math.round(movie.rating * 10)

  return (
    <main className="min-h-screen pb-20">
      {/* Backdrop Section */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent z-10" />
        
        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
        
        <div className="absolute bottom-0 left-0 z-20 w-full p-6 md:p-12">
          <div className="container mx-auto">
            <BackButton/>
            <h1 className="mb-2 text-4xl font-extrabold md:text-6xl text-[var(--foreground)] tracking-tight">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold opacity-90">
              <span className="rounded-md bg-white/10 px-2 py-1 backdrop-blur-md">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="h-1 w-1 rounded-full bg-current opacity-50" />
              <span>{movie.genres.join(', ')}</span>
              <span className="h-1 w-1 rounded-full bg-current opacity-50" />
              <div className="flex items-center gap-1 text-green-400">
                <span>★</span>
                <span>{movie.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[350px_1fr]">
          
          {/* LEFT: Poster & Stats */}
          <div className="space-y-8">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 transition-transform hover:scale-[1.02]">
              {movie.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            
            {/* 2. FILM STATS SIDEBAR (Updated with Visual Bar) */}
            <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 space-y-6">
               
               {/* Visual Rating Bar */}
               <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase opacity-70">
                    <span>Average Rating</span>
                    <span>{movie.rating.toFixed(1)} / 10</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-green-600 to-green-400" 
                      style={{ width: `${ratingPercent}%` }}
                    />
                  </div>
               </div>

               <div className="h-px bg-[var(--border-color)]" />

               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase opacity-50">TMDB ID</span>
                  <span className="font-mono text-sm">{movie.id}</span>
               </div>
               
               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase opacity-50">Votes</span>
                  <span className="font-mono text-sm">{movie.vote_count.toLocaleString()}</span>
               </div>

               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase opacity-50">Popularity</span>
                  <span className="font-mono text-sm">{(movie.popularity || 0).toFixed(0)}</span>
               </div>
            </div>
          </div>

          {/* RIGHT: Details & Related */}
          <div className="flex flex-col gap-12">
            
            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4">
              <AddToWatchlist movie={movie} />
            </div>

            {/* Overview */}
            <div>
              <h2 className="mb-4 text-2xl font-bold tracking-tight">Synopsis</h2>
              <p className="leading-8 text-lg opacity-80 text-[var(--foreground)]">
                {movie.overview}
              </p>
            </div>

            {/* "You Might Also Like" Section */}
            {relatedMovies.length > 0 && (
              <div className="mt-8 border-t border-[var(--border-color)] pt-12">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-xl font-bold">You Might Also Like</h2>
                  <Link 
                    href={`/?genre=${encodeURIComponent(movie.genres[0])}`} 
                    className="text-sm font-bold text-blue-500 hover:underline"
                  >
                    View more {movie.genres[0]} →
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {relatedMovies.map((relMovie) => (
                    <MovieCard key={relMovie.id} movie={relMovie} />
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </main>
  )
}