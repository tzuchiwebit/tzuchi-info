import { getServerSideSitemap } from 'next-sitemap'
const API_ENDPOINT = `${process.env.NEXT_PUBLIC_CMS_URL}/api/index.php/v1`
const token = process.env.NEXT_PUBLIC_JOOMLA_API_TOKEN

export async function GET(request) {
  const params = {
    'page[limit]': 1000,
    'page[offset]': 0,
    'filter[state]': 1,
    'list[ordering]': 'created',
    'list[direction]': 'desc',
  }

  const url =`${API_ENDPOINT}/content/articles?${( new URLSearchParams( params ) ).toString()}`

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
  const data = await res.json()

  const fields = data?.data.map((item) => ({
    loc: `${process.env.SITE_URL}/article/${item.id}`,
    lastmod: item.attributes.modified,
    priority: 1,
    changefreq: "daily",
  }));

  return getServerSideSitemap(fields)
}
