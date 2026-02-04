"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { Movie } from "@/types/movie"
import { useWatchlist } from "@/context/watchlist-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MovieCardProps {
  movie: Movie
  className?: string
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const isSaved = isInWatchlist(movie.id)

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg"

  const primaryGenre = movie.genres?.[0]

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isSaved) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  return (
    <div className={cn("group relative flex flex-col gap-3", className)}>
      <Link
        href={`/movie/${movie.id}`}
        className={cn(
          "relative block aspect-[2/3] overflow-hidden rounded-2xl",
          "bg-[var(--card-bg)] ring-1 ring-[var(--card-border)]",
          "transition-shadow duration-200 hover:shadow-lg hover:ring-[var(--accent)]/40"
        )}
      >
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          loading="lazy"
        />

        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30",
            "opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          )}
        />

        <div className="absolute left-0 top-0 z-10 flex w-full items-start justify-between p-3">
          <Badge variant="rating" className="shadow-lg">
            <Star className="h-3 w-3 fill-current" />
            {movie.rating.toFixed(1)}
          </Badge>

          <button
            onClick={toggleWatchlist}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white hover:text-pink-500 active:scale-95",
              isSaved && "bg-pink-500 text-white"
            )}
          >
            <Heart
              className={cn("h-4 w-4", isSaved && "fill-current")}
              strokeWidth={2.5}
            />
          </button>
        </div>

        {primaryGenre && (
          <div
            className={cn(
              "absolute bottom-3 left-3 z-10",
              "translate-y-2 opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100"
            )}
          >
            <span className="rounded-lg bg-blue-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
              {primaryGenre}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col px-1">
        <h3
          className={cn(
            "line-clamp-1 text-base font-bold text-[var(--foreground)]",
            "transition-colors duration-150 group-hover:text-[var(--accent)]"
          )}
        >
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted)]">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span className="h-1 w-1 rounded-full bg-current" />
          <span>Movie</span>
        </div>
      </div>
    </div>
  )
}
