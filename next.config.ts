import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/assets/documents/resume/muhammed-sinan-resume.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
