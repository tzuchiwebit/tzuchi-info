import Client from './client'
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

export async function generateMetadata({ params }, parent) {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/column-article`),
    title: `專欄文章 - 慈濟資訊網`,
    description: `「領航慈濟」的內部觀點帶您了解慈濟如何應對全球化的挑戰；「名人視角」的外部觀點讓您得知世界怎麼理解社會上未解的難題。`,
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
