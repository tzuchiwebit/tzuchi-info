import Client from './client'
import { Suspense } from "react";
import { getTagById } from "@/api/routeApi";
import Spinner from "@/components/Spinner"

export async function generateMetadata({ params }, parent) {
  const tag = (await getTagById(2)).data
  const images = []
  if (tag?.attributes?.images?.image_intro) images.push(tag?.attributes?.images?.image_intro)
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/daily-reminder`),
    title: `${tag?.attributes?.title} - 慈濟資訊網`,
    description: tag?.attributes?.metadesc,
    openGraph: { images },
  }
}

export default async function Page({ params }) {
  const tag = (await getTagById(2)).data
  return (
    <section>
      <Suspense fallback={<div className="h-screen flex justify-center items-center"><Spinner /></div>}>
        <Client tagInfo={tag?.attributes}></Client>
      </Suspense>
    </section>
  )
}
