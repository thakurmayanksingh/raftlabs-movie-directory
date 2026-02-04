"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-zinc-700 text-zinc-100 dark:bg-zinc-600 dark:text-zinc-50",
        rating: "bg-amber-500/90 text-zinc-950 backdrop-blur-md border border-amber-400/30",
        primary: "bg-blue-600/90 text-white backdrop-blur-md border border-blue-400/30",
        success: "bg-emerald-500/90 text-white backdrop-blur-md border border-emerald-400/30",
        outline: "border border-zinc-600 text-zinc-300 dark:border-zinc-500 dark:text-zinc-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
