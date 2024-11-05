import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
const API_ENDPOINT = `${process.env.NEXT_PUBLIC_CMS_URL}/api/index.php/v1`
const token = process.env.NEXT_PUBLIC_JOOMLA_API_TOKEN

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  const smStream = new SitemapStream();
  const gzip = createGzip(); // Create a Gzip stream

  const params = {
    'page[limit]': 3000
  }

  // FIXME: unable to verify the first certificate
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const url = `${API_ENDPOINT}/tags?${new URLSearchParams(params).toString()}`
  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
  const list = (await res.json()).data
  const redirectListData = await fetch(`https://infobackend.tzuchi-org.tw/api/jcustom/v1/redirect.json`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const redirectList = await redirectListData.json();
  const removeList = redirectList.map(item => {
    const _tmp = item.tag_link.split('/') || ["", ""];
    return parseInt(_tmp[1]);
  });
  list.forEach((item) => {
    // console.log(item?.id)
    if (removeList.indexOf(parseInt(item?.id)) === -1) {
      smStream.write({
        url: `${process.env.NEXT_PUBLIC_URL}/tag/${item?.id}`,
        changefreq: "daily",
        priority: 0.8
      })
    }
  })

  smStream.end();

  const sitemap = await streamToPromise(smStream.pipe(gzip)).then((data) => data.toString('base64'));

  return new NextResponse(Buffer.from(sitemap, 'base64'), {
    headers: {
      'Content-Type': 'application/xml',
      'Content-Encoding': 'gzip',
    },
  });
}
