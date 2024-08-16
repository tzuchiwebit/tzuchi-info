
const config = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: '/private/' },
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL}/server-sitemap-0.xml`,
      `${process.env.SITE_URL}/server-sitemap-1.xml`,
    ],
  },
  transform: async (config, path) => { return null },
};

module.exports = config;
