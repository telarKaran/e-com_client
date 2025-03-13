import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8001",
        // Adjust the pathname based on your actual file structure
        // If your images are served under /uploads/....
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
