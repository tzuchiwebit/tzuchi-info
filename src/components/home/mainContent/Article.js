'use client'
import { useRouter } from "next/navigation"
import { BannerTitle } from "../components"
import dayjs from "dayjs"
import routes from "@/app/config/routes"
import useDataProvider from "../useDataProvider"
import { useMemo } from "react"

const data = [
    {
        title: '領航慈濟',
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
        title: '名人視角',
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

const Item = ({ item }) => {

    const router = useRouter();


    return (
        <div
            className="w-full block shadow-elevation-3 rounded-md overflow-hidden cursor-pointer"
            onClick={() => {
                router.push(`${routes.COLUMN_ARTICLE}`)
            }}
        >
            <div className="text-white bg-primary-blue1 p-3 text-[24px] font-bold">
                {item.title}
            </div>
            <div className="divide-y divide-solid divide-gray-gray7/50">
                {
                    item.children.map((_i, _index) => (
                        <div className="p-3 flex gap-4" key={_index}>
                            <div className="aspect-square">
                                <img
                                    className="aspect-square w-12 rounded-full ring-2 ring-white"
                                    src={_i?.images?.image_intro || "https://i.pravatar.cc/300"}
                                    alt="" />
                            </div>
                            <div className="flex-1">
                                <div className="text-primary-blue1 text-xl font-bold mb-2">
                                    {_i.title}
                                </div>
                                <div className="flex text-gray-gray4 gap-3 items-center font-medium">
                                    <div className="font-medium text-sm">{dayjs(_i.date).format('YYYY-MM-DD')}</div>
                                    <div className="border-r border-solid border-gray-gray4 h-4" />
                                    {_i.created_by_alias}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const ArticleSection = ({ data }) => {

    const testData = [
        {
            title: '領航慈濟',
            children: data.map(i => i.attributes).slice(0, 2)
        },
        {
            title: '名人視角',
            children: data.map(i => i.attributes).slice(0, 2)
        }
    ]

    return <div className="pt-5 w-full flex flex-col tablet:flex-row laptop:flex-col desktop:flex-row gap-5">
        {testData.map((item, index) => <Item item={item} key={index} />)}
    </div>
}

export default function Article() {

    const router = useRouter();

    const { pageData, loading } = useDataProvider()

    const articlesData = useMemo(() => {
        const target = _.find(pageData, { name: '各據點消息' }); // TODO: 專欄文章
        return target?.data || []
    }, [pageData])

    console.log(articlesData)

    return <div className="pt-5">
        <BannerTitle title={`專欄文章`} link={routes.COLUMN_ARTICLE} />
        <ArticleSection data={articlesData} />
    </div>
}
