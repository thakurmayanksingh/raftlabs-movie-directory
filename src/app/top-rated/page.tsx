import type { Metadata } from "next"
import Link from "next/link"
import moviesData from "@/data/movies.json"
import { MovieCard } from "@/components/movie-card"
import { Movie } from "@/types/movie"
import { FadeIn } from "@/components/ui/fade-in"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const movies = moviesData as Movie[]

export const metadata: Metadata = {
  title: "Hall of Fame | Top 10 Rated Movies",
  description:
    "The top 10 highest-rated masterpieces in our collection. The absolute best movies of all time.",
  openGraph: {
    title: "Hall of Fame | Top 10 Rated Movies | RaftLabs Cinema",
    description: "The top 10 highest-rated masterpieces in our collection.",
    type: "website",
  },
}

export default function TopRated() {
  // Sort by rating and take top 10
  const topMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10)

  return (
    <main className="min-h-screen">
      <FadeIn>
        <section className="mb-12 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] px-6 py-12 text-center md:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)] md:text-5xl">
            Hall of <span className="text-amber-400">Fame</span>
          </h1>
          <p className="mb-6 text-lg text-[var(--muted)]">
            The top 10 highest-rated masterpieces in our collection.
          </p>
          <Link href="/">
            <Button variant="secondary" size="sm" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to All Movies
            </Button>
          </Link>
        </section>
      </FadeIn>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {topMovies.map((movie, index) => (
            <div key={movie.id} className="relative">
              {/* Rank Badge */}
              <div className="absolute -left-2 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-lg font-bold text-zinc-900 shadow-lg ring-4 ring-[var(--background)]">
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