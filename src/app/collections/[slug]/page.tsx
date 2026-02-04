import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import moviesData from "@/data/movies.json"
import { MovieSkeleton } from "@/components/movie-skeleton"
import { Movie } from "@/types/movie"
import { MovieGrid } from "@/components/movie-grid"
import { FadeIn } from "@/components/ui/fade-in"
import { ArrowLeft } from "lucide-react"
import {
  COLLECTION_CONFIG,
  COLLECTION_SLUGS,
} from "@/lib/collections"

const movies = moviesData as Movie[]

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return COLLECTION_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const config = COLLECTION_CONFIG[slug]
  if (!config) return { title: "Collection Not Found" }

  return {
    title: `${config.title} | RaftLabs Cinema`,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      type: "website",
    },
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params
  const config = COLLECTION_CONFIG[slug]

  if (!config) notFound()

  return (
    <div className="container mx-auto px-4 pb-20 overflow-hidden">
      <FadeIn className="relative mb-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collection
        </Link>

        <div className="mb-4 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-500">
          Collection
        </div>

        <h1 className="mb-4 max-w-3xl text-4xl font-black tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
          {config.title}
        </h1>
        <p className="max-w-2xl text-lg text-[var(--muted)]">{config.description}</p>
      </FadeIn>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {[...Array(12)].map((_, i) => (
              <MovieSkeleton key={i} />
            ))}
          </div>
        }
      >
        <MovieGrid
          initialMovies={movies as import("@/types/movie").Movie[]}
          collectionSlug={slug}
          collectionParams={config.params}
        />
      </Suspense>
    </div>
  )
}
