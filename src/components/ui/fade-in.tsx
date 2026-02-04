"use client"

// Lightweight wrapper - no framer-motion for performance
// Use CSS for any subtle transitions if needed
export function FadeIn({
  children,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return <div className={className}>{children}</div>
}

// Simple div - no stagger animation for performance
export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}
