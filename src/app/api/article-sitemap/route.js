import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Gzip } from 'minizlib';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  // Create a stream to write to
  const smStream = new SitemapStream();
  const gzip = new Gzip(); // Create a Gzip stream

  const url =`${process.env.NEXT_PUBLIC_CMS_URL}/api/jcustom/v1/lightarticles.php?state=1&ordering=created&direction=desc`
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const list = await res.json()
  list.forEach((id) => {
    smStream.write({
      url: `${process.env.NEXT_PUBLIC_URL}/article/${id}`,
      changefreq: "daily",
      priority: 1
    })
  })

  // Close the stream
  smStream.end();

  // Compress the sitemap using Gzip
  const sitemap = await streamToPromise(smStream.pipe(gzip)).then((data) => data.toString('base64'));

  return new NextResponse(Buffer.from(sitemap, 'base64'), {
    headers: {
      'Content-Type': 'application/xml',
      'Content-Encoding': 'gzip',
    },
  });
}
