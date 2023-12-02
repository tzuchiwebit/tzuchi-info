'use client'
import { BannerTitle } from "../components"
import dayjs from "dayjs"

const data = [
    {
        title: '內部觀點：領航慈濟',
        children: [
            {
                avatar: 'https://i.pravatar.cc/300',
                title: '目前做的事情原因與做法',
                date: dayjs().format('YYYY-MM-DD'),
                jobTitle: '顏博文 執行長',
            },
            {
                avatar: 'https://i.pravatar.cc/300',
                title: '目前做的事情原因與做法',
                date: dayjs().format('YYYY-MM-DD'),
                jobTitle: '何日生 副執行長',
            },
        ]
    },
    {
        title: '外部觀點：旅外名人視角',
        children: [
            {
                avatar: 'https://i.pravatar.cc/300',
                title: '目前做的事情原因與做法',
                date: dayjs().format('YYYY-MM-DD'),
                jobTitle: 'OOO 作家',
            },
            {
                avatar: 'https://i.pravatar.cc/300',
                title: '目前做的事情原因與做法',
                date: dayjs().format('YYYY-MM-DD'),
                jobTitle: 'OOO 作家',
            },
        ]
    }
]

const Item = ({ item }) => (
    <div className="w-full block shadow-elevation-3 rounded-md overflow-hidden">
        <div className="text-white bg-primary-blue1 p-3 text-[24px] font-bold">
            {item.title}
        </div>
        <div className="divide-y divide-solid divide-gray-gray7/50">
            {
                item.children.map((_i, _index) => (
                    <div className=" p-3 flex gap-4" key={_index}>
                        <div>
                            <img
                                className="h-12 w-12 rounded-full ring-2 ring-white"
                                src={_i.avatar}
                                alt="" />
                        </div>
                        <div>
                            <div className="text-primary-blue1 text-xl font-bold mb-2">
                                {_i.title}
                            </div>
                            <div className="flex text-gray-gray4 gap-3 items-center font-medium">
                                <div className="font-medium text-sm">{_i.date}</div>
                                <div className="border-r border-solid border-gray-gray4 h-4" />
                                {_i.jobTitle}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
)

const ArticleSection = () => {
    return <div className="pt-5 w-full flex flex-col tablet:flex-row laptop:flex-col desktop:flex-row gap-5">
        {data.map((item, index) => <Item item={item} key={index} />)}
    </div>
}

export default function Article() {

    return <div className="pt-5">
        <BannerTitle title={`專欄文章`} link={'#'} />
        <ArticleSection />
    </div>
}
