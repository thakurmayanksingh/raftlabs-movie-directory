"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Movie } from '@/types/movie'
import { useWatchlist } from '@/context/watchlist-context'

interface MovieCardProps {
  movie: Movie
}

// Animation variants for the card (used by the parent stagger container)
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function MovieCard({ movie }: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const isSaved = isInWatchlist(movie.id)

  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : '/placeholder.jpg'
  
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
    // Replaced <div> with <motion.div> for animations
    <motion.div 
      variants={cardVariants} 
      className="group relative flex flex-col gap-3"
      initial="hidden" // Start hidden
      animate="visible" // Animate to visible
      transition={{ duration: 0.5 }} // Smooth entry
    >
      <Link 
        href={`/movie/${movie.id}`} 
        className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-[var(--card-bg)] shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 ring-1 ring-[var(--border-color)] hover:ring-blue-500/50"
      >
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
        
        {/* Subtle Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-60" />

        <div className="absolute left-0 top-0 w-full p-3 flex justify-between items-start z-10">
          
          {/* Glass Rating Badge (Yellow Star) */}
          <div className="flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-bold text-yellow-400 backdrop-blur-md border border-white/10 shadow-sm">
            <span>★</span> {movie.rating.toFixed(1)}
          </div>

          {/* Glass Heart Button */}
          <button
            onClick={toggleWatchlist}
            className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 active:scale-90
              ${isSaved 
                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/40" 
                : "bg-white/10 text-white hover:bg-white hover:text-pink-600"
              }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill={isSaved ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-4 w-4"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        </div>

        {/* Floating Genre Tag */}
        {primaryGenre && (
          <div className="absolute bottom-3 left-3 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
             <span className="rounded-lg bg-blue-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
              {primaryGenre}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col px-1">
        <h3 className="line-clamp-1 text-lg font-bold text-[var(--foreground)] transition-colors group-hover:text-blue-500">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs font-medium opacity-60 text-[var(--foreground)]">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span className="h-1 w-1 rounded-full bg-current" />
          <span>Movie</span>
        </div>
      </div>
    </motion.div>
  )
}