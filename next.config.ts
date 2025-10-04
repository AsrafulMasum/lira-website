import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["tse1.mm.bing.net", "10.10.7.62"],
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
