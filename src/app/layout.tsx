import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RaftLabs Cinema",
  description: "Top 250 movies generated programmatically",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]`}>
        
        {/* FIXED HEADER: distinct black background so it looks like a real bar */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md shadow-lg">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80">
              RaftLabs <span className="text-blue-500">Cinema</span>
            </Link>
            
            <Link href="/top-rated" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              🏆 Hall of Fame
            </Link>
          </div>
        </header>

        {/* PADDING TOP: Pushes content down so it doesn't hide behind the fixed header */}
        <main className="pt-24 pb-10">
          {children}
        </main>

        <footer className="border-t border-white/10 bg-black/20 py-8 text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} RaftLabs Cinema Assignment.</p>
        </footer>
      </body>
    </html>
  );
}