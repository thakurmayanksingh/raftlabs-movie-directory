import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-extrabold tracking-tighter text-white/10">404</h1>
      
      <div className="absolute flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Page Not Found</h2>
        <p className="max-w-md text-gray-400">
          The scene you are looking for has been cut from the final edit.
        </p>
        
        <Link 
          href="/" 
          className="mt-4 rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:scale-105"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}