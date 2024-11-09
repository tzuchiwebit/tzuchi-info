import Client from './client'
import { Suspense } from "react";
import { getTagById, getRedirectJson } from "@/api/routeApi";
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import _ from 'lodash';


export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }, parent) {
  const tag = (await getTagById(params.slug)).data
  const images = []

  if (tag?.attributes?.images?.image_intro) images.push(tag?.attributes?.images?.image_intro)
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/daily-reminder`),
    title: `${tag?.attributes?.title} - 慈濟資訊網`,
    description: tag?.attributes?.metadesc,
    openGraph: { images },
  }
}

export default async function Page({ params, ...props }) {

  const redirectList = await getRedirectJson();
  const headersList = headers();
  // read the custom x-url header
  const header_url = headersList.get('x-url') || "";
  const pathname = new URL(header_url).pathname?.substring(1);
  const targetTag = _.find(redirectList, { tag_link: pathname });
  if (targetTag) {
    return redirect(`/${targetTag.redirect_link}`); // Permanent redirect
  }
  
  const tag = (await getTagById(params.slug)).data
  console.log('tagInfo', JSON.stringify(tag?.attributes))
  if (tag?.id) {
    return (
      <section>
        <Suspense>
          <Client tagInfo={tag?.attributes}></Client>
        </Suspense>
      </section>
    )
  } else {
    redirect('/') // Default redirect to home if no match
  }
}
