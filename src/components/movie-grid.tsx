"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Movie } from "@/types/movie"
import { MovieCard } from "./movie-card"
import { FilterBar } from "./filter-bar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface MovieGridProps {
  initialMovies: Movie[]
  collectionSlug?: string
  collectionParams?: Record<string, string>
}

const ITEMS_PER_PAGE = 24

export function MovieGrid({
  initialMovies,
  collectionSlug,
  collectionParams = {},
}: MovieGridProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const basePath = collectionSlug ? `/collections/${collectionSlug}` : pathname

  const allGenres = useMemo(() => {
    const genres = new Set<string>()
    initialMovies.forEach((m) => m.genres.forEach((g) => genres.add(g)))
    return Array.from(genres).sort()
  }, [initialMovies])

  // Merge collection params with URL params (collection params are defaults)
  const getParam = (key: string) =>
    searchParams.get(key) || collectionParams[key] || "all"
  const getSearchQuery = () => searchParams.get("search") || ""
  const urlSearchQuery = getSearchQuery()
  const currentPage = Number(searchParams.get("page") || "1")
  const sortBy = getParam("sort") === "all" ? "rating_desc" : getParam("sort")
  const filterRating = getParam("rating")
  const filterDecade = getParam("decade")
  const filterGenre = getParam("genre")

  const [localSearch, setLocalSearch] = useState(urlSearchQuery)

  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      setLocalSearch(urlSearchQuery)
    }
  }, [urlSearchQuery])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== urlSearchQuery) {
        updateUrl({ search: localSearch })
      }
    }, 300)
    return () => clearTimeout(handler)
  }, [localSearch])

  const isFiltered =
    !!urlSearchQuery ||
    sortBy !== "rating_desc" ||
    filterRating !== "all" ||
    filterDecade !== "all" ||
    filterGenre !== "all"

  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "all" || value === "")
        params.delete(key)
      else params.set(key, value)
    })
    if (
      updates.search !== undefined ||
      updates.sort !== undefined ||
      updates.rating !== undefined ||
      updates.decade !== undefined ||
      updates.genre !== undefined
    ) {
      params.set("page", "1")
    }
    router.replace(`${basePath}?${params.toString()}`, { scroll: false })
  }

  // On collection pages: push default params to URL if empty
  useEffect(() => {
    if (!collectionSlug || Object.keys(collectionParams).length === 0) return
    const hasAnyParam = Array.from(searchParams.keys()).length > 0
    if (!hasAnyParam) {
      const params = new URLSearchParams(collectionParams)
      router.replace(`${basePath}?${params.toString()}`, { scroll: false })
    }
  }, [collectionSlug, collectionParams, basePath])

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page >= 1 && page <= totalPages) {
      params.set("page", page.toString())
      router.replace(`${basePath}?${params.toString()}`, { scroll: true })
    }
  }

  const resetFilters = () => {
    setLocalSearch("")
    if (collectionSlug) {
      const params = new URLSearchParams(collectionParams)
      router.replace(`${basePath}?${params.toString()}`, { scroll: false })
    } else {
      router.replace(pathname, { scroll: false })
    }
  }

  const filteredMovies = useMemo(() => {
    let result = initialMovies
    if (urlSearchQuery) {
      const q = urlSearchQuery.toLowerCase()
      result = result.filter((m) => m.title.toLowerCase().includes(q))
    }
    if (filterRating !== "all") {
      const minRating = Number(filterRating)
      result = result.filter((m) => m.rating >= minRating)
    }
    if (filterGenre !== "all") {
      result = result.filter((m) => m.genres.includes(filterGenre))
    }
    if (filterDecade !== "all") {
      const startYear = Number(filterDecade)
      const endYear = startYear + 9
      result = result.filter((m) => {
        const year = new Date(m.release_date).getFullYear()
        return year >= startYear && year <= endYear
      })
    }
    return [...result].sort((a, b) => {
      const dateA = new Date(a.release_date).getTime()
      const dateB = new Date(b.release_date).getTime()
      switch (sortBy) {
        case "year_desc":
          return dateB - dateA
        case "year_asc":
          return dateA - dateB
        case "rating_asc":
          return a.rating - b.rating
        case "popularity":
          return b.vote_count - a.vote_count
        case "rating_desc":
        default:
          return b.rating - a.rating
      }
    })
  }, [
    initialMovies,
    urlSearchQuery,
    sortBy,
    filterRating,
    filterDecade,
    filterGenre,
  ])

  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentMovies = filteredMovies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  return (
    <div className="space-y-8">
      <FilterBar
        localSearch={localSearch}
        setLocalSearch={setLocalSearch}
        searchParams={searchParams}
        updateUrl={updateUrl}
        allGenres={allGenres}
        isFiltered={isFiltered}
        resetFilters={resetFilters}
        inputRef={inputRef}
        movies={initialMovies}
      />

      {/* Grid: 1 col mobile, 2 col tablet, 4+ col desktop */}
      <div
        key={`${currentPage}-${sortBy}-${urlSearchQuery}-${filterRating}-${filterDecade}-${filterGenre}`}
        className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="py-20 text-center text-zinc-500 dark:text-zinc-400">
          No movies found matching these filters.{" "}
          <button
            onClick={resetFilters}
            className="ml-2 font-semibold text-blue-500 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-8">
          <Button
            variant="secondary"
            size="icon-lg"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-full disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm text-[var(--muted)]">
            Page <span className="font-bold text-[var(--foreground)]">{currentPage}</span> of{" "}
            {totalPages}
          </span>
          <Button
            variant="secondary"
            size="icon-lg"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-full disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )
}
