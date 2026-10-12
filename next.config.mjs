import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
    // كاش 30 يوم للصور المُحسَّنة من Next.js Image Optimization
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    // الأصول الثابتة في /public لا تأخذ cache headers افتراضية طويلة
    // هذا يخفض "Use efficient cache lifetimes" بشكل كبير.
    const immutableAssets = [
      "/logo/:path*",
      "/imgs/:path*",
      "/countries/:path*",
    ];

    return [
      ...immutableAssets.map((source) => ({
        source,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      })),
      {
        source: "/web-app-manifest-:size.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/ads.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
