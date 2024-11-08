import Client from './client'
import { Suspense } from "react";
import Loading from "./loading";
import { getArticleById } from "@/api/routeApi";

// export const dynamic = 'force-dynamic'
// export const dynamicParams = true
// export const fetchCache = 'force-no-store'
// export const revalidate = 0

export async function generateMetadata({ params }, parent) {
  const article = (await getArticleById(params.slug)).data
  const imageUrl = article?.attributes?.images?.image_intro ? article?.attributes?.images?.image_intro : "https://imagedelivery.net/oK0RK5YvW3bVFXgaGP6foQ/032741ee-fac7-44b6-3cea-649da4b8ff00/2K";
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/article/${params.slug}`),
    title: `${article?.attributes?.title} - 慈濟資訊網`,
    description: article?.attributes?.metadesc,
    openGraph: {
      images: [imageUrl],
    },
  }
}

const checkAudioExists = async (url) => {
  let result = false
  try {
    const response = await fetch(url, { method: 'HEAD' }); // Use HEAD request to check if file exists
    if (response.ok) {
      result = true
    }
  } catch (error) {
  }
  return result
};

export default async function Page({ params }) {
  let hasAudio = false
  if (process.env.NEXT_PUBLIC_ENV_NAME === 'development') {
    hasAudio = await checkAudioExists(`${process.env.NEXT_PUBLIC_AUDIO_BASE_URL}/${params?.slug}.mp3`)
  }
  return (
    <section>
      <Suspense fallback={<Loading></Loading>}>
        <Client hasAudio={hasAudio}></Client>
      </Suspense>
    </section>
  )
}
