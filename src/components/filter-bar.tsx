"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Search, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Movie } from "@/types/movie"

interface FilterBarProps {
  localSearch: string
  setLocalSearch: (value: string) => void
  searchParams: URLSearchParams
  updateUrl: (updates: Record<string, string | null>) => void
  allGenres: string[]
  isFiltered: boolean
  resetFilters: () => void
  inputRef?: React.RefObject<HTMLInputElement | null>
  movies?: Movie[]
}

const MAX_SUGGESTIONS = 5

export function FilterBar({
  localSearch,
  setLocalSearch,
  searchParams,
  updateUrl,
  allGenres,
  isFiltered,
  resetFilters,
  inputRef: externalInputRef,
  movies = [],
}: FilterBarProps) {
  const internalRef = useRef<HTMLInputElement>(null)
  const inputRef = externalInputRef ?? internalRef
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const sortBy = searchParams.get("sort") || "rating_desc"
  const filterGenre = searchParams.get("genre") || "all"
  const filterRating = searchParams.get("rating") || "all"
  const filterDecade = searchParams.get("decade") || "all"

  const suggestionList = useMemo(() => {
    if (!localSearch.trim() || movies.length === 0) return []
    const q = localSearch.toLowerCase().trim()
    return movies
      .filter((m) => m.title.toLowerCase().includes(q))
      .slice(0, MAX_SUGGESTIONS)
  }, [localSearch, movies])

  useEffect(() => {
    setShowSuggestions(localSearch.trim().length > 0 && suggestionList.length > 0)
    setFocusedIndex(-1)
  }, [localSearch, suggestionList.length])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [inputRef])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestionList.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setFocusedIndex((i) => Math.min(i + 1, suggestionList.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setFocusedIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === "Enter" && focusedIndex >= 0 && suggestionList[focusedIndex]) {
      e.preventDefault()
      const movie = suggestionList[focusedIndex]
      setLocalSearch(movie.title)
      updateUrl({ search: movie.title })
      setShowSuggestions(false)
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
      setFocusedIndex(-1)
    }
  }

  const selectSuggestion = (movie: Movie) => {
    setLocalSearch(movie.title)
    updateUrl({ search: movie.title })
    setShowSuggestions(false)
    inputRef.current?.blur()
  }

  const selectClass = cn(
    "rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors hover:border-[var(--muted-hover)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 cursor-pointer"
  )
  const optionClass = "bg-[var(--card-bg)] text-[var(--foreground)]"

  return (
    <div className="z-40 mb-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search movies..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onFocus={() => suggestionList.length > 0 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            className={cn(
              "w-full rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] py-2.5 pl-11 pr-4 text-sm text-[var(--foreground)] placeholder-[var(--muted)] outline-none",
              "focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30"
            )}
          />
          {showSuggestions && suggestionList.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] py-1 shadow-lg"
            >
              <p className="px-4 py-2 text-xs font-medium text-[var(--muted)]">
                Suggestions
              </p>
              {suggestionList.map((movie, i) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  onClick={() => setShowSuggestions(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-sm hover:bg-[var(--border-color)]/30",
                    i === focusedIndex && "bg-[var(--border-color)]/30"
                  )}
                >
                  <span className="truncate text-[var(--foreground)]">
                    {movie.title}
                  </span>
                  <span className="ml-2 shrink-0 text-xs text-[var(--muted)]">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => updateUrl({ sort: e.target.value })}
            className={cn(selectClass, "flex items-center gap-2")}
          >
            <option className={optionClass} value="rating_desc">
              Highest Rated
            </option>
            <option className={optionClass} value="popularity">
              Most Popular
            </option>
            <option className={optionClass} value="year_desc">
              Newest First
            </option>
            <option className={optionClass} value="year_asc">
              Oldest First
            </option>
          </select>

          <select
            value={filterGenre}
            onChange={(e) => updateUrl({ genre: e.target.value })}
            className={selectClass}
          >
            <option className={optionClass} value="all">
              All Genres
            </option>
            {allGenres.map((genre) => (
              <option key={genre} className={optionClass} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <select
            value={filterRating}
            onChange={(e) => updateUrl({ rating: e.target.value })}
            className={selectClass}
          >
            <option className={optionClass} value="all">
              Any Rating
            </option>
            <option className={optionClass} value="9">
              9+ Stars
            </option>
            <option className={optionClass} value="8.5">
              8.5+ Stars
            </option>
            <option className={optionClass} value="8">
              8+ Stars
            </option>
            <option className={optionClass} value="7">
              7+ Stars
            </option>
          </select>

          <select
            value={filterDecade}
            onChange={(e) => updateUrl({ decade: e.target.value })}
            className={selectClass}
          >
            <option className={optionClass} value="all">
              Any Year
            </option>
            <option className={optionClass} value="2020">
              2020s
            </option>
            <option className={optionClass} value="2010">
              2010s
            </option>
            <option className={optionClass} value="2000">
              2000s
            </option>
            <option className={optionClass} value="1990">
              1990s
            </option>
            <option className={optionClass} value="1980">
              1980s
            </option>
            <option className={optionClass} value="1970">
              1970s
            </option>
          </select>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-500/20 dark:text-red-500"
              title="Clear all filters"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
