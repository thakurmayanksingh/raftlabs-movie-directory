"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useWatchlist } from "@/context/watchlist-context"

export function WatchlistButton() {
  const { watchlist } = useWatchlist()
  const hasItems = watchlist.length > 0

  return (
    <Link
      href="/watchlist"
      className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors 
        ${hasItems 
          ? "border-pink-500/50 bg-pink-500/10 text-pink-500" 
          : "border-[var(--border-color)] bg-[var(--input-bg)] text-[var(--muted)] hover:border-pink-500/50 hover:bg-pink-500/5 hover:text-pink-500"
        }`}
    >
      <Heart
        className={`h-4 w-4 ${hasItems ? "fill-current" : ""}`}
        strokeWidth={2.5}
      />
      <span>Watchlist</span>
      
      <span className={`ml-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold leading-none transition-colors
        ${hasItems
          ? "bg-pink-500 text-white" 
          : "bg-[var(--muted)]/40 text-[var(--foreground)] group-hover:bg-pink-500 group-hover:text-white"
        }`}
      >
        {watchlist.length}
      </span>
    </Link>
  )
}