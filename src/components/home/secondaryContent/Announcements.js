'use client'
import { BannerTitle } from "../components"
import dayjs from "dayjs"

const data = [
    {
        title: '《印順導師年譜》開放線上預購 慈善購書兩不誤',
    },
    {
        title: '環保輔具平台缺你一分力 擴大招募志工中',
    },
    {
        title: '澤爸親子講座 打開親子溝通的黃金之鑰',
    },
]

const Item = ({ item }) => (
    <div className="gap-5 py-4">
        <div className="text-primary-blue1 text-xl font-bold mb-2">
            {item.title}
        </div>
        <div className="text-gray-gray4 text-sm font-medium">
            {dayjs().format('YYYY-MM-DD')}
        </div>
    </div>
)

const AnnouncementSection = () => {
    return <div className="pt-5 w-full flex flex-col">
        <div className="bg-white shadow-elevation-3 divide-y divide-solid divide-gray-gray8 px-4">
            {data.map((item, index) => <Item item={item} key={index} />)}
        </div>
    </div>
}

export default function Announcements() {

    return <div className="py-5 flex-1">
        <BannerTitle title={`熱門活動`} link={'#'} />
        <AnnouncementSection />
    </div>
}
