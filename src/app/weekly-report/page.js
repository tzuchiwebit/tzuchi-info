import Client from './client'
import { Suspense } from "react";

export async function generateMetadata({ params }, parent) {
  return {
    metadataBase: new URL(`${process.env.SITE_URL}/weekly-report`),
    title: `慈濟週報 - 慈濟資訊網`,
    description: `慈濟週報內容涵蓋國際大小事到社區溫馨故事，成為您閒暇時刻了解慈濟脈動的最佳選擇。立即訂閱慈濟週報，每週定期接收豐富內容的電子報。 `,
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
