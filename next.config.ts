import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Move reactCompiler to the top level (Fixes the warning)
  reactCompiler: true,

  // 2. Keep the image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;