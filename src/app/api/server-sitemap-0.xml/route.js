import { getServerSideSitemap } from 'next-sitemap'

export async function GET(request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const fields = [
    {
      loc: `${process.env.NEXT_PUBLIC_URL}`,
      lastmod: new Date().toISOString(),
      priority: 1,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/weekly-report`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/volunteer-morning`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/the-base-messages`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/global/taiwan`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/global/asia`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/global/america`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/global/europe`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/global/africa`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/global/oceania`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/foundation-announcement`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/column-article`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/auspicious-month`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/activities`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: "daily",
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/search`,
      lastmod: new Date().toISOString(),
      priority: 0.6,
      changefreq: "daily",
    },
  ]

  return getServerSideSitemap(fields)
}
