import { Suspense } from 'react'
import Link from 'next/link'
import moviesData from '@/data/movies.json'
import { MovieGrid } from '@/components/movie-grid'
import { MovieSkeleton } from '@/components/movie-skeleton'
import { FadeIn } from '@/components/ui/fade-in'

async function getMovies() {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return moviesData
}

// 1. DEFINE COLLECTIONS (Permutations)
const COLLECTIONS = [
  { 
    title: "90s Nostalgia", 
    desc: "The golden era of cinema", 
    link: "/?decade=1990&sort=rating_desc",
    color: "from-purple-500 to-indigo-500"
  },
  { 
    title: "Critics' Choice", 
    desc: "Rated 8.5 and above",  // <--- CHANGED FROM 9.0
    link: "/?rating=8.5&sort=rating_desc", // <--- CHANGED PARAMETER
    color: "from-emerald-500 to-teal-500"
  },
  { 
    title: "Modern Masterpieces", 
    desc: "Best of the 2010s", 
    link: "/?decade=2010&sort=rating_desc",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    title: "Old School", 
    desc: "Classics before 1980", 
    link: "/?decade=1970&sort=rating_desc",
    color: "from-orange-500 to-red-500"
  }
]

export default async function Home() {
  const movies = await getMovies()

  return (
    <div className="container mx-auto px-4 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <FadeIn className="relative mb-16 flex flex-col items-center justify-center space-y-8 pt-20 text-center">
        <div className="absolute top-0 left-1/2 -z-10 h-[200px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-500/20" />
        
        <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          <span className="mr-2 flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Top Rated Database
        </div>

        <h1 className="max-w-4xl text-5xl font-black tracking-tighter text-[var(--foreground)] sm:text-7xl md:text-8xl">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Collection</span>
        </h1>
        
        <p className="max-w-xl text-lg font-medium text-[var(--foreground)] opacity-60 md:text-xl">
          A programmatic directory of the 250+ highest-rated movies of all time. Curated by algorithms, loved by humans.
        </p>
        
        <Link 
          href="/top-rated"
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-[var(--foreground)] px-8 font-bold text-[var(--background)] transition-all duration-300 hover:w-64 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/25"
        >
          <span className="mr-2 text-lg">🏆</span>
          <span className="whitespace-nowrap">Enter Hall of Fame</span>
          <span className="ml-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
        </Link>
      </FadeIn>

      {/* 2. NEW: FEATURED COLLECTIONS SECTION */}
      <FadeIn delay={0.2} className="mb-20">
        <h2 className="mb-6 text-center text-sm font-bold uppercase tracking-widest opacity-50">Curated Collections</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTIONS.map((item) => (
            <Link 
              key={item.title}
              href={item.link}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 transition-all hover:border-transparent hover:shadow-lg"
            >
              <div className={`absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10 bg-gradient-to-br ${item.color}`} />
              <h3 className="mb-1 text-lg font-bold">{item.title}</h3>
              <p className="text-sm opacity-60">{item.desc}</p>
              <div className="mt-4 inline-flex items-center text-xs font-bold text-blue-500 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </FadeIn>

      {/* MOVIE GRID */}
      <Suspense 
        fallback={
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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