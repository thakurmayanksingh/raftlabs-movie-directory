'use client'

import { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Movie } from '@/types/movie'
import { MovieCard } from './movie-card'

interface MovieGridProps {
  initialMovies: Movie[]
}

const ITEMS_PER_PAGE = 24

export function MovieGrid({ initialMovies }: MovieGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 1. Read State from URL (This ensures Persistence!)
  const searchQuery = searchParams.get('search') || ''
  const sortBy = (searchParams.get('sort') as 'rating' | 'year' | 'votes') || 'rating'
  const currentPage = Number(searchParams.get('page')) || 1

  // 2. Helper to update URL
  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) params.delete(key)
      else params.set(key, value)
    })

    // If search or sort changes, always reset to Page 1
    if (updates.search !== undefined || updates.sort !== undefined) {
      params.set('page', '1')
    }

    // Scroll to top of grid when page changes
    router.replace(`?${params.toString()}`, { scroll: true })
  }

  // 3. Filter & Sort Logic
  const filteredMovies = useMemo(() => {
    const filtered = initialMovies.filter((movie) => {
      if (!searchQuery) return true
      return movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'year') return new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      return b.vote_count - a.vote_count
    })
  }, [initialMovies, searchQuery, sortBy])

  // 4. Calculate Pagination
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentMovies = filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateUrl({ page: page.toString() })
    }
  }

  return (
    <div className="space-y-8">
      {/* HEADER: Search & Browse Buttons */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6">
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => updateUrl({ search: e.target.value })}
            className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold tracking-widest text-gray-500 mr-2 uppercase">Browse By</span>
          {[
            { id: 'rating', label: 'Rating' },
            { id: 'votes', label: 'Popular' },
            { id: 'year', label: 'Year' }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => updateUrl({ sort: option.id })}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                sortBy === option.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS GRID */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {filteredMovies.length === 0 && (
        <div className="py-20 text-center text-gray-500">No movies found matching "{searchQuery}"</div>
      )}

      {/* ARROW PAGINATION (Matches your red sketch) */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-8 select-none">
          {/* Previous Arrow */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-3xl text-white transition-all hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-500 disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-white/5 disabled:hover:text-white"
            title="Previous Page"
          >
            &#8249;
          </button>

          <span className="text-sm font-medium text-gray-400">
            Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
          </span>

          {/* Next Arrow */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-3xl text-white transition-all hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-500 disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-white/5 disabled:hover:text-white"
            title="Next Page"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  )
}