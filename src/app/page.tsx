import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import moviesData from "@/data/movies.json"
import { MovieGrid } from "@/components/movie-grid"
import { MovieSkeleton } from "@/components/movie-skeleton"
import { FadeIn } from "@/components/ui/fade-in"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

async function getMovies() {
  return moviesData as import("@/types/movie").Movie[]
}

// Permutation routes - different views of the same dataset
const COLLECTIONS = [
  { title: "Best Crime", desc: "Highest-rated crime films", link: "/collections/best-crime", color: "from-amber-500 to-orange-600" },
  { title: "Top Rated 2024", desc: "Best movies from 2024", link: "/collections/top-rated-2024", color: "from-blue-500 to-cyan-500" },
  { title: "90s Nostalgia", desc: "The golden era of cinema", link: "/collections/90s-nostalgia", color: "from-purple-500 to-indigo-500" },
  { title: "Critics' Choice", desc: "Rated 8.5 and above", link: "/collections/critics-choice", color: "from-emerald-500 to-teal-500" },
  { title: "Modern Masterpieces", desc: "Best of the 2010s", link: "/collections/modern-masterpieces", color: "from-blue-500 to-cyan-500" },
  { title: "Old School", desc: "Classics before 1980", link: "/collections/old-school", color: "from-orange-500 to-red-500" },
  { title: "Best Animation", desc: "Top animated films", link: "/collections/best-animation", color: "from-pink-500 to-rose-500" },
  { title: "Sci-Fi Favorites", desc: "Best science fiction", link: "/collections/sci-fi-favorites", color: "from-violet-500 to-purple-600" },
]

export const metadata: Metadata = {
  title: "The Collection | Top Rated Movies",
  description:
    "A programmatic directory of 250+ highest-rated movies. Curated by algorithms, loved by humans. Search, filter, and discover the best films of all time.",
  openGraph: {
    title: "The Collection | RaftLabs Cinema",
    description: "A curated directory of 250+ highest-rated movies of all time.",
    type: "website",
  },
}

export default async function Home() {
  const movies = await getMovies()

  return (
    <div className="container mx-auto px-4 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <FadeIn className="relative mb-16 flex flex-col items-center justify-center space-y-8 pt-8 text-center">
        <div className="absolute top-0 left-1/2 -z-10 h-[200px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-500">
          <span className="relative flex h-2 w-2 rounded-full bg-blue-500" />
          Top Rated Database
        </div>

        <h1 className="max-w-4xl text-5xl font-black tracking-tighter text-[var(--foreground)] sm:text-7xl md:text-8xl">
          The{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Collection
          </span>
        </h1>

        <p className="max-w-xl text-lg font-medium text-[var(--muted)] md:text-xl">
          A programmatic directory of 250+ highest-rated movies. Curated by
          algorithms, loved by humans.
        </p>

        <Link href="/top-rated">
          <Button
            variant="primary"
            size="lg"
            className="group w-full rounded-full sm:w-auto"
          >
            <Trophy className="h-5 w-5" />
            <span>Enter Hall of Fame</span>
          </Button>
        </Link>
      </FadeIn>

      {/* Permutation routes - different views of same dataset */}
      <FadeIn delay={0.2} className="mb-20">
        <h2 className="mb-6 text-center text-sm font-bold uppercase tracking-widest text-[var(--muted)]">
          Curated Collections
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTIONS.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="group relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-shadow hover:shadow-lg hover:border-[var(--accent)]/30"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-10 ${item.color}`}
              />
              <h3 className="relative mb-1 text-lg font-bold text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="relative text-sm text-[var(--muted)]">
                {item.desc}
              </p>
              <span className="relative mt-4 inline-flex items-center text-xs font-bold text-blue-500 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </FadeIn>

      {/* MOVIE GRID */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {[...Array(12)].map((_, i) => (
              <MovieSkeleton key={i} />
            ))}
          </div>
        }
      >
        <MovieGrid initialMovies={movies} />
      </Suspense>
    </div>
  )
}
