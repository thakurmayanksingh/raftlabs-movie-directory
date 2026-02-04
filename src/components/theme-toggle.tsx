"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // We wait until the component is mounted on the client to avoid
  // a mismatch between the server (unknown theme) and client (known theme)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] bg-transparent text-xl transition-all hover:bg-[var(--input-bg)] hover:scale-110 active:scale-95"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
    >
      {/* If Dark, show Sun. If Light, show Moon. */}
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  )
}