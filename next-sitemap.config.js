
const config = {
  siteUrl: process.env.NEXT_PUBLIC_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: '/private/' },
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_URL}/server-sitemap-0.xml`,
      `${process.env.NEXT_PUBLIC_URL}/server-sitemap-1.xml.gz`,
    ],
  },
  transform: async (config, path) => { return null },
};

module.exports = config;
