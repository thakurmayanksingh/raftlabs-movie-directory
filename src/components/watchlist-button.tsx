"use client"

import Link from "next/link"
import { useWatchlist } from "@/context/watchlist-context"

export function WatchlistButton() {
  const { watchlist } = useWatchlist()
  
  // Design Logic: If count > 0, make it pink to show activity
  const hasItems = watchlist.length > 0

  return (
    <Link
      href="/watchlist"
      className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all 
        ${hasItems 
          ? "border-pink-500/50 bg-pink-500/10 text-pink-500" 
          : "border-[var(--border-color)] bg-[var(--input-bg)] text-[var(--foreground)] hover:border-pink-500/50 hover:bg-pink-500/5 hover:text-pink-500"
        }`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill={hasItems ? "currentColor" : "none"} // Fill heart if items exist
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transition-transform group-hover:scale-110"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      
      <span>Watchlist</span>
      
      <span className={`ml-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold leading-none transition-colors
        ${hasItems
          ? "bg-pink-500 text-white" 
          : "bg-[var(--foreground)] text-[var(--background)] group-hover:bg-pink-500 group-hover:text-white"
        }`}
      >
        {watchlist.length}
      </span>
    </Link>
  )
}