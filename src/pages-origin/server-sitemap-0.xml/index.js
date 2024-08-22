import { getServerSideSitemapLegacy } from "next-sitemap";

export const getServerSideProps = async (ctx) => {

  const fields = [
    {
      loc: `${process.env.SITE_URL}`,
      lastmod: new Date().toISOString(),
      priority: 1,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/weekly-report`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/volunteer-morning`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/the-base-messages`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/global/taiwan`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/global/asia`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/global/america`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/global/europe`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/global/africa`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/global/oceania`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/foundation-announcement`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/column-article`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/auspicious-month`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/activities`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.SITE_URL}/search`,
      lastmod: new Date().toISOString(),
      priority: 0.6,
      changefreq: "daily",
    },
  ]

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function SitemapIndex() {}
