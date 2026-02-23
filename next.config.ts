import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '100jotyczi.ufs.sh',
        port: '', // Leave empty if no specific port is needed
        pathname: '/**', // Allows any path on this hostname
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    }
  }
};

export default nextConfig;
