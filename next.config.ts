import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**", // Allow all Shopify CDN paths
      },
    ],
  },
};

export default nextConfig;