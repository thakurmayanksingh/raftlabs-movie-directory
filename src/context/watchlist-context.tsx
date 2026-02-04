"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Movie } from "@/types/movie"

interface WatchlistContextType {
  watchlist: Movie[]
  addToWatchlist: (movie: Movie) => void
  removeFromWatchlist: (movieId: number) => void
  isInWatchlist: (movieId: number) => boolean
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined)

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([])

  // 1. Load from Local Storage on startup
  useEffect(() => {
    const saved = localStorage.getItem("my-watchlist")
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse watchlist", e)
      }
    }
  }, [])

  // 2. Save to Local Storage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem("my-watchlist", JSON.stringify(watchlist))
  }, [watchlist])

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev // No duplicates
      return [...prev, movie]
    })
  }

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId))
  }

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((m) => m.id === movieId)
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

// Hook to use the context easily
export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider")
  }
  return context
}