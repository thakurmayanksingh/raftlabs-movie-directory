"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useWatchlist } from '@/context/watchlist-context'
import { MovieCard } from '@/components/movie-card'
// Import animation container
import { StaggerContainer } from '@/components/ui/fade-in'

const ITEMS_PER_PAGE = 12 // Shows 12 movies per page

export default function WatchlistPage() {
  const { watchlist } = useWatchlist()
  const [currentPage, setCurrentPage] = useState(1)

  // 1. Calculate Pagination
  const totalPages = Math.ceil(watchlist.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentMovies = watchlist.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' }) // Smooth scroll to top
    }
  }

  // 2. EMPTY STATE (If absolutely no movies saved)
  if (watchlist.length === 0) {
    return (
      <div className="container mx-auto min-h-[60vh] px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-[var(--foreground)]">My Watchlist</h1>
        
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] py-24 text-center shadow-sm">
          <div className="mb-6 rounded-full bg-blue-500/10 p-6">
            <span className="text-4xl">🍿</span>
          </div>
          
          <h2 className="mb-2 text-2xl font-bold text-[var(--foreground)]">
            Your watchlist is empty
          </h2>
          
          <p className="mb-8 max-w-md text-[var(--foreground)] opacity-60">
            It looks like you haven't added any movies yet. Go back to the homepage to find some gems!
          </p>
          
          <Link 
            href="/" 
            className="rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    )
  }

  // 3. FILLED STATE WITH PAGINATION
  return (
    <div className="container mx-auto min-h-screen px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">My Watchlist</h1>
          <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs font-bold text-pink-500 border border-pink-500/20">
            {watchlist.length} movies
          </span>
        </div>
      </div>

      {/* GRID (With Stagger Animation) */}
      {/* Key ensures animation replays when page changes */}
      <StaggerContainer 
        key={currentPage} 
        className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </StaggerContainer>

      {/* PAGINATION CONTROLS (Only show if more than 1 page) */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-8 select-none">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--input-bg)] text-2xl text-[var(--foreground)] hover:brightness-110 disabled:opacity-30 transition-colors"
          >
            &#8249;
          </button>
          
          <span className="text-sm text-[var(--foreground)] opacity-70">
            Page <span className="font-bold">{currentPage}</span> of {totalPages}
          </span>
          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--input-bg)] text-2xl text-[var(--foreground)] hover:brightness-110 disabled:opacity-30 transition-colors"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  )
}