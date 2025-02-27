import Client from './client'
import { Suspense } from "react";

export async function generateMetadata({ params }, parent) {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/volunteer-morning`),
    title: `RSS 頻道 - 慈濟資訊網`,
    description: `歡迎訂閱慈濟資訊網 RSS 頻道！透過 RSS，您可以即時獲取慈濟最新的公益活動、人文故事、慈善項目及相關訊息。無需逐一瀏覽網站，只需將我們的 RSS 連結加入您的閱讀器，即可隨時掌握慈濟全球愛心行動的動態，與我們一同見證善的力量。`,
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
