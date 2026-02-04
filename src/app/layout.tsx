import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// 1. IMPORT THE PROVIDER
import { WatchlistProvider } from "@/context/watchlist-context";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { WatchlistButton } from "@/components/watchlist-button";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RaftLabs Cinema",
  description: "Top 250 movies generated programmatically",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]`}>
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {/* 2. WRAP EVERYTHING IN WATCHLIST PROVIDER */}
          <WatchlistProvider>
            
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-color)] bg-[var(--card-bg)]/90 backdrop-blur-md shadow-sm transition-colors duration-300">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 text-[var(--foreground)]">
                  RaftLabs <span className="text-blue-600">Cinema</span>
                </Link>
                
                <div className="flex items-center gap-3">
                  <WatchlistButton />
                  <ThemeToggle />
                </div>
              </div>
            </header>

            <main className="pt-24 pb-10">
              {children}
            </main>

            <footer className="border-t border-[var(--border-color)] bg-[var(--card-bg)]/50 py-8 text-center text-sm opacity-60 transition-colors duration-300">
              <p>© {new Date().getFullYear()} RaftLabs Cinema Assignment.</p>
            </footer>

          </WatchlistProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}