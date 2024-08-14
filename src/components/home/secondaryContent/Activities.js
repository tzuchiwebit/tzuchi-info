'use client'
import { useMemo } from "react"
import { BannerTitle } from "../components"
import useDataProvider from "../useDataProvider"
import Skeleton from 'react-loading-skeleton'
import { useRouter } from "next/navigation"
import routes from "@/config/routes"
import _ from 'lodash'
// import DefaultImage from '@/asset/image/default-article-intro.png'
import { Linkfont } from "@/shared/styles/linkFont.js"
import { addHits } from "@/api/api"

const Item = ({ item }) => {

    const router = useRouter();

    return (
        <div className="flex gap-5 py-4 cursor-pointer" onClick={() => {
            router.push(`${routes.ARITCLE}/${item.id}`);
            addHits(item.id);
        }}>
            <div className="h-[72px] w-[72px] flex-0">
              {
                item?.id ?
                <img
                  className="w-full rounded-full ring-2 ring-white aspect-square"
                  src={item.avatar}
                  alt="" />:
                <Skeleton className="ring-2 ring-white aspect-square" borderRadius="999px"/>
              }
            </div>
            <div className="text-primary-blue1 text-xl font-bold mb-2 flex-1 line-clamp-4">
                <Linkfont>{item.title}</Linkfont>
            </div>
        </div>
    )
}

const ActivitiesSection = ({ activityData = [] }) => {

    return <div className="w-full flex flex-col divide-y divide-solid divide-gray-gray8">
        {activityData.map((item, index) => <Item item={item} key={index} />)}
    </div>
}

export default function Activities() {

    const { pageData, loading } = useDataProvider();

    const activityData = useMemo(() => {
        const target = _.find(pageData, { name: '熱門活動' });
        return target?.data?.map(i => ({
            id: i.attributes.id,
            title: i.attributes?.title,
            avatar: i.attributes?.images?.image_intro
        })) || []
    }, [pageData])


    return <div className="pt-3 flex-1">
        <BannerTitle id="Activities" title={`推薦活動`} link={'/activities'} />
        <ActivitiesSection activityData={activityData} loading={loading} />
    </div>
}
