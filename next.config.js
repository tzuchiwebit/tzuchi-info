/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
  rewrites: async () => [
    {
      source: "/server-sitemap-0.xml",
      destination: "/api/server-sitemap-0.xml",
    },
    {
      source: "/server-sitemap-1.xml.gz",
      destination: "/api/article-sitemap",
    },
    {
      source: "/server-sitemap-2.xml.gz",
      destination: "/api/tags-sitemap",
    },
  ],
  async headers() {
    return [
      {
        source: "/article/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
