import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/sobre",
        permanent: true,
      },
      {
        source: "/brand",
        destination: "/marca",
        permanent: true,
      },
      {
        source: "/archive",
        destination: "/arquivo",
        permanent: true,
      },
      {
        source: "/category/:slug*",
        destination: "/secoes/:slug*",
        permanent: true,
      },
      {
        source: "/article/:slug*",
        destination: "/artigos/:slug*",
        permanent: true,
      },
      {
        source: "/search",
        destination: "/busca",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
