'use client'
import { useRouter } from "next/navigation"
import { BannerTitle } from "../components"
import dayjs from "dayjs"
import routes from "@/config/routes"
import useDataProvider from "../useDataProvider"
import { useMemo } from "react"
import _ from 'lodash'
import Icon from "@/shared/Icon"
import { LikeAndShare } from "../components"
import { addHits } from "@/api/api"
import { Linkfont } from "@/shared/styles/linkFont.js"

const Item = ({ item }) => {

    const router = useRouter();

    return (
        <div className="w-full block shadow-elevation-3 rounded-md overflow-hidden" >
            <div className="text-white bg-primary-blue1 p-3 text-[24px] font-bold" >
                {item?.title}
            </div>
            <div className="divide-y divide-solid divide-gray-gray7/50">
                {
                    item?.children?.map((_i, _index) => (
                        <div className="p-3 flex gap-4" key={_index}>
                            <div className="flex-1">
                                <div
                                    className="text-primary-blue1 text-xl h-[1.75rem] font-bold mb-2 cursor-pointer line-clamp-1"
                                    onClick={() => {
                                        router.push(`${routes.ARITCLE}/${_i.id}`)
                                        addHits(_i.id);
                                    }}
                                >
                                    <Linkfont>{_i.title}</Linkfont>
                                </div>
                                <div className="flex flex-col text-gray-gray4 gap-1 items-start font-medium">
                                    <div className="font-medium text-sm">{dayjs(_i.publish_up).format('YYYY-MM-DD')}</div>
                                    <div className="flex justify-between w-full">
                                        <div className="flex gap-1 items-center font-medium">
                                            <div className="border-l border-solid border-gray-gray4 h-4" />
                                            {/* {_i?.creator?.name} */}
                                            {_i?.metadata?.author || '慈濟基金會'}
                                        </div>
                                        {/* <LikeAndShare
                                            likes={_i.like}
                                            shares={_i.share}
                                            articleId={_i.id}
                                        /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const ArticleSection = ({ leading = [], view = [] }) => {

    // console.log(`leading`)
    // console.log(leading)
    // console.log(`view`)
    // console.log(view)

    const data = [
        {
            title: '領航慈濟',
            // children: leading?.map(i => i.attributes).slice(0, 2) || [{},{}]
            children: leading.length ? leading?.map(i => i.attributes).slice(0, 2) : [{},{}]
        },
        {
            title: '名人視角',
            children: view.length ? view.map(i => i.attributes).slice(0, 2) : [{}, {}]
        }
    ]

    return <div className="pt-5 w-full flex flex-col tablet:flex-row laptop:flex-col desktop:flex-row gap-5">
        {data.map((item, index) => <Item item={item} key={index} />)}
    </div>
}

export default function Article() {

    const router = useRouter();

    const { pageData, loading } = useDataProvider()

    const articlesData = useMemo(() => {
        const targetLeading = _.find(pageData, { name: '專欄文章-領航慈濟' });
        const targetView = _.find(pageData, { name: '專欄文章-名人視角' });
        return {
            leading: targetLeading?.data,
            view: targetView?.data,
        }
    }, [pageData])

    console.log(`articlesData`)
    console.log(articlesData)

    return <div className="pt-5">
        <BannerTitle id="Article" title={`專欄文章`} link={routes.COLUMN_ARTICLE} />
        <ArticleSection leading={articlesData.leading} view={articlesData.view} />
    </div>
}
