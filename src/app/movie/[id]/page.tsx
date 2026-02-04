import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import moviesData from '@/data/movies.json'
import { Movie } from '@/types/movie'

const movies = moviesData as Movie[]

// Update: In Next.js 16, params is a Promise
interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }))
}

export default async function MoviePage({ params }: PageProps) {
  // We must "await" the params before using them
  const { id } = await params
  
  const movie = movies.find((m) => m.id.toString() === id)

  if (!movie) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {/* Backdrop Section */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent z-10" />
        
        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
        
        <div className="absolute bottom-0 left-0 z-20 w-full p-6 md:p-12">
          <div className="container mx-auto">
            <Link href="/" className="mb-4 inline-block text-sm text-blue-500 hover:underline">
              &larr; Back to Directory
            </Link>
            <h1 className="mb-2 text-4xl font-extrabold md:text-6xl text-[var(--foreground)]">{movie.title}</h1>
            <div className="flex flex-wrap gap-3 text-sm font-medium opacity-80">
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>•</span>
              <span>{movie.genres.join(', ')}</span>
              <span>•</span>
              <span className="text-green-500">★ {movie.rating.toFixed(1)} / 10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-[300px_1fr]">
          {/* Poster (Left) */}
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
             {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Details (Right) */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-3 text-2xl font-semibold opacity-90">Overview</h2>
              <p className="leading-relaxed opacity-70">{movie.overview}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-lg border border-gray-800 bg-white/5 p-6">
              <div>
                <p className="text-xs uppercase tracking-wider opacity-50">Vote Count</p>
                <p className="text-lg font-medium">{movie.vote_count.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider opacity-50">Original ID</p>
                <p className="text-lg font-medium">{movie.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}