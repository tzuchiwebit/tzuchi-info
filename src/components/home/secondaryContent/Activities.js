'use client'
import { BannerTitle } from "../components"
import dayjs from "dayjs"

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

const Item = ({ item }) => (
    <div className="flex gap-5 py-4">
        <div className="h-[72px] w-[72px] flex-0">
            <img
                className="w-full rounded-full ring-2 ring-white"
                src={item.avatar}
                alt="" />
        </div>
        <div className="text-primary-blue1 text-xl font-bold mb-2 flex-1">
            {item.title}
        </div>
    </div>
)

const ActivitiesSection = () => {
    return <div className="w-full flex flex-col divide-y divide-solid divide-gray-gray8">
        {data.map((item, index) => <Item item={item} key={index} />)}
    </div>
}

export default function Activities() {

    return <div className="pt-3 flex-1">
        <BannerTitle title={`熱門活動`} link={'#'} />
        <ActivitiesSection />
    </div>
}
