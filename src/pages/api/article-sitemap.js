import { createGzip } from 'zlib'
import { SitemapStream } from 'sitemap'
import { getAllArticles } from "@/api/joomlaApi";

const sitemapApi = async (req, res) => {
  // ensure response is XML & gzip encoded
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Content-Encoding', 'gzip')

  // makes necessary API calls to get all the dynamic
  // urls from user-gen content
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const result = await getAllArticles({})

  const sitemapStream = new SitemapStream()
  const pipeline = sitemapStream.pipe(createGzip())

  // write user-generated pages to sitemap
  result?.data.forEach((item) => {
    sitemapStream.write({
      url: `${process.env.SITE_URL}/article/${item.id}`,
      changefreq: "daily",
      priority: 1,
      lastmod: item.attributes.modified,
    })
  })

  sitemapStream.end()

  // stream write the response
  pipeline.pipe(res).on('error', (err) => {
    throw err
  })
}

export default sitemapApi
