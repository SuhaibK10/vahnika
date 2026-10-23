import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: lets phones and tablets on the same Wi-Fi (e.g. 192.168.1.5) use live reload
  allowedDevOrigins: ["192.168.*.*"],
  experimental: {
    // Dev machine is short on disk; skip the on-disk Turbopack caches. Safe to remove once there's room.
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
  },
};

export default nextConfig;
