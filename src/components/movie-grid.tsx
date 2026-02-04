'use client'

import { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Movie } from '@/types/movie'
import { MovieCard } from './movie-card'

interface MovieGridProps {
  initialMovies: Movie[]
}

export function MovieGrid({ initialMovies }: MovieGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 1. Read State directly from the URL (defaults to '' or 'rating' if missing)
  const searchQuery = searchParams.get('search') || ''
  const sortBy = (searchParams.get('sort') as 'rating' | 'year' | 'votes') || 'rating'

  // 2. Helper to update URL without reloading the page
  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    // "replace" updates the URL without pushing a new history entry (smoother feeling)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  // Filter and Sort Logic (Same as before, just using the URL values)
  const filteredMovies = useMemo(() => {
    // A. Filter
    const filtered = initialMovies.filter((movie) => {
      if (!searchQuery) return true
      return movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    })

    // B. Sort
    return [...filtered].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating
      } else if (sortBy === 'year') {
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      } else {
        return b.vote_count - a.vote_count
      }
    })
  }, [initialMovies, searchQuery, sortBy])

  return (
    <div className="space-y-8">
      {/* Search and Sort Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => updateUrl('search', e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600 md:max-w-md"
        />

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => updateUrl('sort', e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="rating" className="bg-neutral-900 text-white">Highest Rating</option>
            <option value="votes" className="bg-neutral-900 text-white">Most Popular</option>
            <option value="year" className="bg-neutral-900 text-white">Newest Release</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-400">
        Showing {filteredMovies.length} movies
      </p>

      {/* The Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {filteredMovies.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          No movies found matching "{searchQuery}"
        </div>
      )}
    </div>
  )
}