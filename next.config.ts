// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "tkphotgallery.vercel.app",
      "qdwjatug59hkphtk.public.blob.vercel-storage.com", // <- your actual blob domain
    ],
  },
};

export default nextConfig;
