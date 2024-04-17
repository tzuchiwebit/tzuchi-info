'use client'
import { useMemo } from "react"
import { BannerTitle } from "../components"
import useDataProvider from "../useDataProvider"
// import Skeleton from 'react-loading-skeleton'
import { useRouter } from "next/navigation"
import routes from "@/config/routes"
import _ from 'lodash'

const data = [
    {
        title: '「機智水保酷學堂」互動巡迴展 花蓮靜思堂展至12/17',
        avatar: 'https://picsum.photos/id/101/300/300',
    },
    {
        title: '12經絡人格解密 沈邑穎醫師幸福講座11/18登場 歡迎索票',
        avatar: 'https://picsum.photos/id/101/300/300',
    },
    {
        title: '第八屆慈濟論壇「邁向平等的新世代」即日起開放網路報名',
        avatar: 'https://picsum.photos/id/101/300/300',
    },
]

const Item = ({ item }) => {

    const router = useRouter();

    return (
        <div className="flex gap-5 py-4 cursor-pointer" onClick={() => {
            router.push(`${routes.ARITCLE}/${item.id}`)
        }}>
            <div className="h-[72px] w-[72px] flex-0">
                <img
                    className="w-full rounded-full ring-2 ring-white aspect-square"
                    src={item.avatar}
                    alt="" />
            </div>
            <div className="text-primary-blue1 text-xl font-bold mb-2 flex-1 line-clamp-4">
                {item.title}
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
            avatar: i.attributes?.images?.image_intro || "https://picsum.photos/id/101/300/300"
        })) || []
    }, [pageData])


    return <div className="pt-3 flex-1">
        <BannerTitle title={`熱門活動`} link={'#'} />
        <ActivitiesSection activityData={activityData} loading={loading} />
    </div>
}
