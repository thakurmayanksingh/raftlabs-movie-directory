import { notFound } from "next/navigation"
import Image from "next/image"
import type { Metadata } from "next"
import Link from "next/link"
import moviesData from "@/data/movies.json"
import { Movie } from "@/types/movie"
import { BackButton } from "@/components/back-button"
import { AddToWatchlist } from "@/components/add-to-watchlist"
import { MovieCard } from "@/components/movie-card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const movies = moviesData as Movie[]

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const movie = movies.find((m) => m.id.toString() === id)

  if (!movie) return { title: "Movie Not Found" }

  const ogImage = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : undefined

  return {
    title: `${movie.title} | RaftLabs Cinema`,
    description: movie.overview.slice(0, 160) + "...",
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: ogImage ? [{ url: ogImage, width: 1280, height: 720 }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: movie.title,
      description: movie.overview.slice(0, 160),
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

  const relatedMovies = movies
    .filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)))
    .slice(0, 4)

  const ratingPercent = Math.round(movie.rating * 10)

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section - Blurred Backdrop */}
      <div className="relative h-[70vh] min-h-[400px] w-full overflow-hidden">
        {/* Backdrop Image - Blurred */}
        {movie.backdrop_path && (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-[var(--background)]/80 backdrop-blur-sm"
              aria-hidden
            />
          </>
        )}
        {!movie.backdrop_path && (
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950" />
        )}

        {/* Gradient overlay for content readability */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent"
          aria-hidden
        />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 z-20 w-full p-6 md:p-12">
          <div className="container mx-auto max-w-6xl">
            <BackButton />
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-200">
              <Badge variant="outline" className="border-white/30 bg-black/40 text-white">
                {new Date(movie.release_date).getFullYear()}
              </Badge>
              <span className="text-zinc-400">•</span>
              <span>{movie.genres.join(", ")}</span>
              <span className="text-zinc-400">•</span>
              <Badge variant="rating" className="shadow-lg">
                <Star className="h-4 w-4 fill-current" />
                {movie.rating.toFixed(1)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[350px_1fr]">
          {/* LEFT: Poster & Stats */}
          <div className="space-y-8">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-[var(--card-border)]">
              {movie.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase text-zinc-400">
                    <span>Average Rating</span>
                    <span>{movie.rating.toFixed(1)} / 10</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border-color)]">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all"
                      style={{ width: `${ratingPercent}%` }}
                    />
                  </div>
                </div>

                <div className="h-px bg-[var(--border-color)]" />

                <div className="flex justify-between">
                  <span className="text-xs font-bold uppercase text-[var(--muted)]">
                    TMDB ID
                  </span>
                  <span className="font-mono text-sm text-[var(--foreground)]">
                    {movie.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-bold uppercase text-[var(--muted)]">
                    Votes
                  </span>
                  <span className="font-mono text-sm text-[var(--foreground)]">
                    {movie.vote_count.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-bold uppercase text-[var(--muted)]">
                    Popularity
                  </span>
                  <span className="font-mono text-sm text-[var(--foreground)]">
                    {(movie.popularity || 0).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Details & Related */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-wrap items-center gap-4">
              <AddToWatchlist movie={movie} />
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Synopsis
              </h2>
              <p className="leading-8 text-lg text-[var(--muted)]">
                {movie.overview}
              </p>
            </div>

            {relatedMovies.length > 0 && (
              <div className="border-t border-[var(--card-border)] pt-12">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[var(--foreground)]">
                    You Might Also Like
                  </h2>
                  <Link
                    href={`/?genre=${encodeURIComponent(movie.genres[0])}`}
                    className="text-sm font-bold text-blue-500 transition-colors hover:text-blue-400 hover:underline"
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
