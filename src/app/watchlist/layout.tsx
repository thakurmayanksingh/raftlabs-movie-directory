import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Watchlist",
  description:
    "Your saved movies. Build your watchlist and never forget what to watch next.",
  openGraph: {
    title: "My Watchlist | RaftLabs Cinema",
    description: "Your saved movies. Build your watchlist and never forget what to watch next.",
    type: "website",
  },
}

export default function WatchlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
