import Client from './client'
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

export async function generateMetadata({ params, searchParams}, parent) {
  const title = !!searchParams?.keyword ? `${searchParams?.keyword}搜尋結果 - 慈濟資訊網` : '搜尋結果 - 慈濟資訊網';
  const description = !!searchParams?.keyword ? `以下是含有 ${searchParams?.keyword} 的搜尋結果。` : '搜尋結果';
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/search`),
    title: title,
    description: `以下是含有 ${searchParams?.keyword} 的搜尋結果。`,
    openGraph: {
      images: ['https://imagedelivery.net/oK0RK5YvW3bVFXgaGP6foQ/032741ee-fac7-44b6-3cea-649da4b8ff00/2K'],
    },
  }
}

export default async function Page({ params }) {
  return (
    <section>
      <Suspense fallback={<div className="h-screen flex justify-center items-center"><Spinner /></div>}>
        <Client></Client>
      </Suspense>
    </section>
  )
}
