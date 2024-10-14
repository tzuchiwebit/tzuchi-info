import Client from './client'
import { Suspense } from "react";
import { getTagById } from "@/api/routeApi";
import { redirect  } from 'next/navigation'


export async function generateMetadata({ params }, parent) {
  const tag = (await getTagById(params.slug)).data
  const images = []

  if (tag?.attributes?.images?.image_intro) images.push(tag?.attributes?.images?.image_intro)
    return {
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/daily-reminder`),
      title: tag?.attributes?.title,
      description: tag?.attributes?.metadesc,
      openGraph: { images },
    }
}

export default async function Page({ params }) {
  const tag = (await getTagById(params.slug)).data
  console.log('tagInfo', JSON.stringify(tag?.attributes))
  if (tag?.id) {
    return (
      <section>
        <Suspense>
          <Client tagInfo={tag?.attributes}></Client>
        </Suspense>
      </section>
    )
  } else {
    redirect('/')
  }
}
