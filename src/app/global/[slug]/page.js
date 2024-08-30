import Client from './client'
import { Suspense } from "react";
import joomlaGlobal from '@/api/joomlaGlobal'

export async function generateMetadata({ params }, parent) {
  const siteInfo = joomlaGlobal[params.slug]
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/global/${params.slug}`),
    title: `${siteInfo.label}據點消息 - 慈濟資訊網`,
    description: `慈濟在${siteInfo.label}各地最新的慈濟脈動。`,
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
