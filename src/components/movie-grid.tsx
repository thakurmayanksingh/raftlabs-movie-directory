'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Movie } from '@/types/movie'
import { MovieCard } from './movie-card'
import { StaggerContainer } from '@/components/ui/fade-in'

interface MovieGridProps {
  initialMovies: Movie[]
}

const ITEMS_PER_PAGE = 24

export function MovieGrid({ initialMovies }: MovieGridProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null) // Ref to check focus

  // 1. Read Filters from URL
  const urlSearchQuery = searchParams.get('search') || ''
  const currentPage = Number(searchParams.get('page')) || 1
  const sortBy = searchParams.get('sort') || 'rating_desc'
  const filterRating = searchParams.get('rating') || 'all'
  const filterDecade = searchParams.get('decade') || 'all'

  // 2. LOCAL STATE (Initialize with URL value)
  const [localSearch, setLocalSearch] = useState(urlSearchQuery)

  // 3. SAFE SYNC (The Fix)
  // Only sync local state with URL if the user is NOT typing (not focused).
  // This fixes the "text disappearing" bug while keeping Back/Forward navigation working.
  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      setLocalSearch(urlSearchQuery)
    }
  }, [urlSearchQuery])

  // 4. DEBOUNCE LOGIC (Performance Fix)
  // Only update URL 300ms after typing stops
  useEffect(() => {
    const handler = setTimeout(() => {
      // Only update if value actually changed to prevent loops
      if (localSearch !== urlSearchQuery) {
        updateUrl({ search: localSearch })
      }
    }, 300)

    return () => clearTimeout(handler)
  }, [localSearch]) // Trigger when user types

  // Check if filtered
  const isFiltered = urlSearchQuery || sortBy !== 'rating_desc' || filterRating !== 'all' || filterDecade !== 'all'

  // 5. Update URL Helper
  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'all' || value === '') params.delete(key)
      else params.set(key, value)
    })

    if (updates.search !== undefined || updates.sort !== undefined || updates.rating !== undefined || updates.decade !== undefined) {
      params.set('page', '1')
    }

    router.replace(`?${params.toString()}`, { scroll: false })
  }

  // 6. Pagination Helper
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page >= 1 && page <= totalPages) {
      params.set('page', page.toString())
      router.replace(`?${params.toString()}`, { scroll: true })
    }
  }

  // 7. Reset Helper
  const resetFilters = () => {
    setLocalSearch('') // Clear input immediately for UI responsiveness
    router.replace(pathname, { scroll: false })
  }

  // 8. Filter Logic
  const filteredMovies = useMemo(() => {
    let result = initialMovies

    // Use urlSearchQuery for filtering (so the grid waits for the debounce)
    if (urlSearchQuery) {
      const q = urlSearchQuery.toLowerCase()
      result = result.filter(m => m.title.toLowerCase().includes(q))
    }

    if (filterRating !== 'all') {
      const minRating = Number(filterRating)
      result = result.filter(m => m.rating >= minRating)
    }

    if (filterDecade !== 'all') {
      const startYear = Number(filterDecade)
      const endYear = startYear + 9
      result = result.filter(m => {
        const year = new Date(m.release_date).getFullYear()
        return year >= startYear && year <= endYear
      })
    }

    return [...result].sort((a, b) => {
      const dateA = new Date(a.release_date).getTime()
      const dateB = new Date(b.release_date).getTime()

      switch (sortBy) {
        case 'year_desc': return dateB - dateA
        case 'year_asc': return dateA - dateB
        case 'rating_asc': return a.rating - b.rating
        case 'popularity': return b.vote_count - a.vote_count
        case 'rating_desc':
        default: return b.rating - a.rating
      }
    })
  }, [initialMovies, urlSearchQuery, sortBy, filterRating, filterDecade])

  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentMovies = filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Styles
  const selectClass = "rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-blue-500 hover:opacity-80 transition-colors cursor-pointer"
  const optionClass = "bg-[var(--card-bg)] text-[var(--foreground)]"

  return (
    <div className="space-y-8">
      {/* FILTER BAR */}
      <div className="flex flex-col gap-4 border-b border-[var(--border-color)] pb-6 lg:flex-row lg:items-center lg:justify-between transition-colors duration-300">
        
        {/* Search */}
        <div className="relative w-full lg:max-w-xs">
          <input
            ref={inputRef} // Attach Ref
            type="text"
            placeholder="Search movies..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full rounded-full border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-2 text-sm text-[var(--foreground)] placeholder-gray-500 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <select value={sortBy} onChange={(e) => updateUrl({ sort: e.target.value })} className={selectClass}>
            <option className={optionClass} value="rating_desc">Highest Rated</option>
            <option className={optionClass} value="popularity">Most Popular</option>
            <option className={optionClass} value="year_desc">Newest First</option>
            <option className={optionClass} value="year_asc">Oldest First</option>
          </select>

          <select value={filterRating} onChange={(e) => updateUrl({ rating: e.target.value })} className={selectClass}>
            <option className={optionClass} value="all">Any Rating</option>
            <option className={optionClass} value="9">9+ Stars</option>
            <option className={optionClass} value="8.5">8.5+ Stars</option>
            <option className={optionClass} value="8">8+ Stars</option>
            <option className={optionClass} value="7">7+ Stars</option>
          </select>

          <select value={filterDecade} onChange={(e) => updateUrl({ decade: e.target.value })} className={selectClass}>
            <option className={optionClass} value="all">Any Year</option>
            <option className={optionClass} value="2020">2020s</option>
            <option className={optionClass} value="2010">2010s</option>
            <option className={optionClass} value="2000">2000s</option>
            <option className={optionClass} value="1990">1990s</option>
            <option className={optionClass} value="1980">1980s</option>
            <option className={optionClass} value="1970">1970s</option>
          </select>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
              title="Clear all filters"
            >
              <span>✕</span> Reset
            </button>
          )}
        </div>
      </div>

      {/* GRID */}
      <StaggerContainer 
        key={`${currentPage}-${sortBy}-${urlSearchQuery}-${filterRating}-${filterDecade}`}
        className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </StaggerContainer>
      
      {/* EMPTY STATE */}
      {filteredMovies.length === 0 && (
        <div className="py-20 text-center text-gray-500 dark:text-gray-400">
          No movies found matching these filters.
          <button 
            onClick={resetFilters}
            className="ml-2 text-blue-500 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* PAGINATION */}
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