import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // @ts-expect-error: reactCompiler is valid in Next.js 15+ but types are currently lagging
    reactCompiler: true,
  },
};

export default nextConfig;