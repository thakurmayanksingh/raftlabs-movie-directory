import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import { Film, Trophy, LayoutGrid } from "lucide-react"
import "./globals.css"

import { WatchlistProvider } from "@/context/watchlist-context"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { WatchlistButton } from "@/components/watchlist-button"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://raftlabs-movie-directory.vercel.app"),
  title: {
    default: "RaftLabs Cinema | Top Rated Movies",
    template: "%s | RaftLabs Cinema",
  },
  description:
    "A curated directory of 250+ highest-rated movies. Search, filter, and discover the best films of all time.",
  openGraph: {
    title: "RaftLabs Cinema | Top Rated Movies",
    description: "A curated directory of 250+ highest-rated movies.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <WatchlistProvider>
            <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border-color)] bg-[var(--card-bg)]/95 shadow-sm backdrop-blur-sm">
              <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-xl font-bold tracking-tight text-[var(--foreground)] transition-opacity hover:opacity-90"
                >
                  <Film className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                  RaftLabs <span className="text-blue-600 dark:text-blue-500">Cinema</span>
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                  <Link
                    href="/"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--border-color)]/50 hover:text-[var(--foreground)]"
                  >
                    <LayoutGrid className="h-4 w-4" />
                    All Movies
                  </Link>
                  <Link
                    href="/top-rated"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--border-color)]/50 hover:text-[var(--foreground)]"
                  >
                    <Trophy className="h-4 w-4" />
                    Hall of Fame
                  </Link>
                  <Link
                    href="/collections/trending-movies"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--border-color)]/50 hover:text-[var(--foreground)]"
                  >
                    Trending Movies
                  </Link>
                </nav>

                <div className="flex items-center gap-3">
                  <WatchlistButton />
                  <ThemeToggle />
                </div>
              </div>
            </header>

            <main className="min-h-screen pt-24 pb-10">{children}</main>

            <footer className="border-t border-[var(--border-color)] bg-[var(--card-bg)]/80 py-6 backdrop-blur-sm">
              <div className="container mx-auto flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between md:gap-6 md:px-6">
                <div className="flex items-center gap-2">
                  <Film className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                  <span className="text-sm font-bold text-[var(--foreground)]">
                    RaftLabs Cinema
                  </span>
                </div>
                <nav className="flex flex-wrap gap-4 text-sm md:gap-6">
                  <Link
                    href="/"
                    className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    All Movies
                  </Link>
                  <Link
                    href="/top-rated"
                    className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    Hall of Fame
                  </Link>
                  <Link
                    href="/collections/trending-movies"
                    className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    Trending Movies
                  </Link>
                  <Link
                    href="/watchlist"
                    className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    Watchlist
                  </Link>
                </nav>
                <p className="text-xs text-[var(--muted)] md:border-l md:border-[var(--border-color)] md:pl-6">
                  © {new Date().getFullYear()} RaftLabs Cinema · Next.js & TMDB
                </p>
              </div>
            </footer>
          </WatchlistProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
