import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // ignore eslint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ignore typescript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
