"use client"

import { useWatchlist } from "@/context/watchlist-context"
import { Movie } from "@/types/movie"

export function AddToWatchlist({ movie }: { movie: Movie }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const isSaved = isInWatchlist(movie.id)

  const toggle = () => {
    if (isSaved) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors active:scale-95
        ${isSaved 
          ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30 ring-2 ring-pink-500 hover:bg-pink-700" 
          : "bg-[var(--card-bg)] text-[var(--foreground)] ring-1 ring-[var(--border-color)] hover:ring-pink-500 hover:text-pink-500"
        }`}
    >
      {/* Heart Icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill={isSaved ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      
      <span>{isSaved ? "Saved to Watchlist" : "Add to Watchlist"}</span>
    </button>
  )
}