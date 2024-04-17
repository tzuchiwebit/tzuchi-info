'use client'
import { BannerTitle } from "../components"
import dayjs from "dayjs"
import routes from "@/config/routes"
import useDataProvider from "../useDataProvider"
import { useMemo } from "react"
import { useRouter } from "next/navigation"
import _ from 'lodash'
// const data = [
//     {
//         title: '《印順導師年譜》開放線上預購 慈善購書兩不誤',
//     },
//     {
//         title: '環保輔具平台缺你一分力 擴大招募志工中',
//     },
//     {
//         title: '澤爸親子講座 打開親子溝通的黃金之鑰',
//     },
// ]

const Item = ({ item }) => {

    const router = useRouter();

    return (
        <div className="gap-5 py-4" onClick={() => {
            router.push(`${routes.ARITCLE}/${item.id}`)
        }}>
            <div className="text-primary-blue1 text-xl font-bold mb-2">
                {item.title}
            </div>
            <div className="text-gray-gray4 text-sm font-medium">
                {dayjs(item.publish_up).format("YYYY-MM-DD")}
            </div>
        </div>
    )
}

const AnnouncementSection = ({ data }) => {
    return <div className="pt-5 w-full flex flex-col">
        <div className="bg-white shadow-elevation-3 divide-y divide-solid divide-gray-gray8 px-4">
            {data.map((item, index) => <Item item={item?.attributes} key={index} />)}
        </div>
    </div>
}

export default function Announcements() {

    const { pageData, loading } = useDataProvider()

    const announcementsData = useMemo(() => {
        const target = _.find(pageData, { name: '基金會公告' });
        return target?.data || []
    }, [pageData])

    return <div className="py-3 flex-1">
        <BannerTitle title={`基金會公告`} link={routes.FOUNDATION_ANNOUNCEMENT} />
        <AnnouncementSection data={announcementsData} />
    </div>
}
