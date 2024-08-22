import Client from './client'
import { redirect } from 'next/navigation'
import { Suspense } from "react";
import Loading from "./loading";

// export const dynamic = 'force-dynamic'
// export const dynamicParams = true
// export const fetchCache = 'force-no-store'
// export const revalidate = 0

// export async function generateMetadata({ params }, parent) {
//   const targetMetaData = await getBook(params.id)

//   return {
//     title: `${targetMetaData?.title} - 慈濟書庫`,
//     openGraph: {
//       images: [targetMetaData?.cover_image],
//     },
//   }
// }

export default async function Page({ params }) {
  return (
    <section>
      <Suspense fallback={<Loading></Loading>}>
        <Client></Client>
      </Suspense>
    </section>
  )
}
