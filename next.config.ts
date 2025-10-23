import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  // Enable Fast Refresh explicitly
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    // Ensure Fast Refresh is enabled in development
    if (dev && !isServer) {
      config.experiments = { ...config.experiments, topLevelAwait: true };
    }
    return config;
  },
};

export default nextConfig;
