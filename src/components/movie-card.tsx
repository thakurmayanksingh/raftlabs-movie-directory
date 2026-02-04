import Image from 'next/image'
import Link from 'next/link'
import { Movie } from '@/types/movie'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  // Construct the full image URL. TMDB returns a partial path.
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.jpg' // Fallback if no image

  return (
    <div className="group relative flex flex-col gap-2">
      <Link href={`/movie/${movie.id}`} className="relative aspect-[2/3] overflow-hidden rounded-lg bg-slate-800 shadow-md transition-all hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-white/20">
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
        
        {/* Rating Badge (Top Right) */}
        <div className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-bold text-green-400 backdrop-blur-sm">
          {movie.rating.toFixed(1)}
        </div>
      </Link>

      <div className="flex flex-col">
        <h3 className="line-clamp-1 text-sm font-semibold text-slate-100 group-hover:text-blue-400">
          {movie.title}
        </h3>
        <p className="text-xs text-slate-400">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </div>
  )
}