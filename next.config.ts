import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keystatic's admin UI relies on the Node.js runtime (filesystem + GitHub
  // API access), which is the App Router default for route handlers, so no
  // extra config is needed there. Nothing else about this site is exotic
  // enough to need custom Next.js config beyond the defaults.
  outputFileTracingIncludes: {
    "/": ["./content/posts/**/*"],
    "/posts": ["./content/posts/**/*"],
    "/posts/*": ["./content/posts/**/*"],
    "/sitemap.xml": ["./content/posts/**/*"],
  },
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
