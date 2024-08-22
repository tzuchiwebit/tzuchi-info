import Client from './client'
import { Suspense } from "react";

export async function generateMetadata({ params, searchParams}, parent) {
  console.log('searchParams', searchParams.keyword)

  return {
    metadataBase: new URL(`${process.env.SITE_URL}/search`),
    title: `${searchParams.keyword} 搜尋結果 - 慈濟資訊網`,
    description: `以下是含有 ${searchParams.keyword} 的搜尋結果。`,
    openGraph: {
      images: ['https://imagedelivery.net/oK0RK5YvW3bVFXgaGP6foQ/032741ee-fac7-44b6-3cea-649da4b8ff00/2K'],
    },
  }
}

export default async function Page({ params }) {
  return (
    <section>
      <Suspense>
        <Client></Client>
      </Suspense>
    </section>
  )
}
