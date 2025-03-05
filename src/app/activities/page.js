import Client from './client'
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

export async function generateMetadata({ params }, parent) {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/auspicious-month`),
    title: `熱門活動 - 慈濟資訊網`,
    description: `歡迎點擊活動頁了解活動詳情，一同參與。`,
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
