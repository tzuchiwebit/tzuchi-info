import Client from './client'
import { Suspense } from "react";
import Loading from "./loading";
import { getArticleById } from "@/api/routeApi";

// export const dynamic = 'force-dynamic'
// export const dynamicParams = true
// export const fetchCache = 'force-no-store'
// export const revalidate = 0

export async function generateMetadata({ params }, parent) {
  console.log('NODE_ENV', process.env.NODE_ENV)
  console.log('NEXT_PUBLIC_ENV_NAME', process.env.NEXT_PUBLIC_ENV_NAME)
  console.log('SITE_URL', process.env.SITE_URL)
  console.log('NEXT_PUBLIC_URL', process.env.NEXT_PUBLIC_URL)
  const article = (await getArticleById(params.slug)).data

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/article/${params.slug}`),
    title: `${article?.attributes?.title} - 慈濟資訊網`,
    description: article?.attributes?.metadesc,
    openGraph: {
      images: ["https://imagedelivery.net/oK0RK5YvW3bVFXgaGP6foQ/032741ee-fac7-44b6-3cea-649da4b8ff00/2K"],
    },
  }
}

export default async function Page({ params }) {
  return (
    <section>
      <Suspense fallback={<Loading></Loading>}>
        <Client></Client>
      </Suspense>
    </section>
  )
}
