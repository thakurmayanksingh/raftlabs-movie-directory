export function MovieSkeleton() {
    return (
      <div className="flex flex-col gap-3">
        {/* Poster Skeleton */}
        <div className="aspect-[2/3] w-full rounded-xl bg-white/5 animate-pulse ring-1 ring-white/10" />
        
        {/* Title & Year Skeleton */}
        <div className="flex flex-col gap-2 px-1">
          <div className="h-4 w-3/4 rounded bg-white/5 animate-pulse" />
          <div className="h-3 w-1/4 rounded bg-white/5 animate-pulse" />
        </div>
      </div>
    )
  }