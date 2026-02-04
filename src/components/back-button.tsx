'use client'

import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()

  return (
    <button 
      onClick={() => router.back()} 
      className="mb-4 inline-block text-sm text-[var(--accent)] hover:underline bg-transparent border-none cursor-pointer"
    >
      &larr; Back to Directory
    </button>
  )
}