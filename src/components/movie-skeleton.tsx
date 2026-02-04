import { cn } from "@/lib/utils"

export function MovieSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        className={cn(
          "aspect-[2/3] w-full rounded-2xl ring-1 ring-[var(--card-border)] bg-[var(--border-color)]/30"
        )}
      />
      <div className="flex flex-col gap-2 px-1">
        <div
          className={cn(
            "h-5 w-4/5 rounded-lg bg-[var(--border-color)]/40"
          )}
        />
        <div
          className={cn(
            "h-3 w-1/3 rounded bg-[var(--border-color)]/30"
          )}
        />
      </div>
    </div>
  )
}
