import Client from './client'
import { Suspense } from "react";
import { getTagById } from "@/api/routeApi";

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }, parent) {
  const tag = (await getTagById(2)).data
  const images = []
  if (tag?.attributes?.images?.image_intro) images.push(tag?.attributes?.images?.image_intro)
  return {
    metadataBase: new URL(`${process.env.SITE_URL}/daily-reminder`),
    title: tag?.attributes?.title,
    description: tag?.attributes?.metadesc,
    openGraph: { images },
  }
}

export default async function Page({ params }) {
  const tag = (await getTagById(2)).data
  return (
    <section>
      <Suspense fallback={<p>Loading data...</p>}>
        <Client tagInfo={tag?.attributes}></Client>
      </Suspense>
    </section>
  )
}
