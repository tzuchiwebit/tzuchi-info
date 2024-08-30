import Client from './client'
import { Suspense } from "react";

export async function generateMetadata({ params }, parent) {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/the-base-messages`),
    title: `全球志業/各據點消息 - 慈濟資訊網`,
    description: `各據點消息讓您馬上了解慈濟的全球足跡。`,
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
