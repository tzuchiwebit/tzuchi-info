// import Client from './client'
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import dynamicImport from "next/dynamic"
const Client = dynamicImport(() => import("./client"), { ssr: false });

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }, parent) {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/volunteer-morning`),
    title: `上人開示 - 慈濟資訊網`,
    description: `證嚴上人每天在志工早會的開示，是慈濟志工每天必須攝取的資糧；在開示中，上人觀機施教，藉事顯理，指引弟子與大眾行走人間菩薩道。`,
    openGraph: {
      images: ['https://imagedelivery.net/oK0RK5YvW3bVFXgaGP6foQ/032741ee-fac7-44b6-3cea-649da4b8ff00/2K'],
    },
  }
}

export default function Page({ params }) {
  return (
    <section>
      <Suspense fallback={<div className="h-screen flex justify-center items-center"><Spinner /></div>}>
        <Client></Client>
      </Suspense>
    </section>
  )
}
