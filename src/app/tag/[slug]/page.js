import Client from './client'
import { Suspense } from "react";
import { getTagById } from "@/api/routeApi";
import { redirect } from 'next/navigation';
import Spinner from "@/components/Spinner";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }, parent) {
  const tag = (await getTagById(params.slug)).data
  const images = []

  if (tag?.attributes?.images?.image_intro) images.push(tag?.attributes?.images?.image_intro)
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/daily-reminder`),
    title: `${tag?.attributes?.title} - 慈濟資訊網`,
    description: tag?.attributes?.metadesc,
    openGraph: { images },
  }
}

export default async function Page({ params, ...props }) {
  
  const tag = (await getTagById(params.slug)).data
  console.log('tagInfo', JSON.stringify(tag?.attributes))
  if (tag?.id) {
    return (
      <section>
        <Suspense fallback={<div className="h-screen flex justify-center items-center"><Spinner /></div>}>
          <Client tagInfo={tag?.attributes}></Client>
        </Suspense>
      </section>
    )
  } else {
    redirect('/') // Default redirect to home if no match
  }
}
