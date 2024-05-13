'use client'
import { useState, useMemo } from "react"
import styled from "styled-components"
import { BannerTitle, SlidesTrack } from "../components"
import screens from "@/shared/styles/screens";
import dayjs from "dayjs"
import BlurBGImage from "@/shared/image/BlurBGImage";
import PrimaryTag from "@/shared/tag/PrimaryTag";
import routes from "@/config/routes";
import useDataProvider from "../useDataProvider";
import _ from 'lodash'
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { LikeAndShare } from "../components";
import { getArticlesByCategory } from "@/api/joomlaApi";
const { useRequest } = require('ahooks');

const tagOptions = [
    {
        title: '臺灣',
        id: 15
    },
    {
        title: '亞洲',
        id: 25
    },
    {
        title: '美洲',
        id: 33
    },
    {
        title: '歐洲',
        id: 170
    },
    {
        title: '非洲',
        id: 188
    },
    {
        title: '大洋洲',
        id: 60
    },
    {
        title: '全球',
        id: ""
    },
]

const Item = ({ item = {} }) => {

    const router = useRouter();

    return (
        <div className="relative w-full p-1 min-w-[300px] laptop:min-w-0 cursor-pointer">
            <div className="w-full shadow-elevation-3 rounded-md overflow-hidden p-2">
                {/* <StyledImage style={{ backgroundImage: `url(${"https://picsum.photos/id/230/300/300"})` }} /> */}
                <ImageContainer onClick={() => router.push(`${routes.ARITCLE}/${item.id}`)}>
                    {
                        item?.id ?
                            <BlurBGImage url={item?.images?.image_intro} /> :
                            <Skeleton className="aspect-video" />
                    }
                </ImageContainer>
                <div
                    className="pt-2 text-xl font-bold w-full text-primary-blue1 text-left h-24 tablet:h-20 laptop:h-32 desktop:h-28 laptop:pb-2"
                    onClick={() => router.push(`${routes.ARITCLE}/${item.id}`)}
                >
                    {item.title}
                </div>
                <div className="pt-2 font-medium text-sm text-gray-gray4 border-t border-solid border-gray-gray8">
                    {dayjs(item.publish_up).format('YYYY-MM-DD')} <br />
                    {item.place}
                </div>
                <div className="flex justify-end">
                    <LikeAndShare likes={item.like} shares={item.share} articleId={item.id} />
                </div>
            </div>
        </div>
    )
}

const SiteNewsSection = ({ items = [] }) => {
    return <div className="pt-3 w-fit laptop:w-full flex">
        {items.map((i, index) => <Item item={i.attributes} key={index} />)}
    </div>
}

export default function SiteNews() {

    const [selctedTagId, setSelectedTagId] = useState(tagOptions[0].id);

    const { data: pageData, loading } = useRequest(() => getArticlesByCategory({
        label_name: '各據點消息',
        limit: 3,
        tag: selctedTagId
    }), {
        refreshDeps: [selctedTagId]
    })

    const baseInfos = useMemo(() => {
        return pageData?.data || []
    }, [selctedTagId, pageData])

    return <div className="pt-5">
        <BannerTitle title={`各據點消息`} link={routes.THE_BASE_MESSAGE} />
        <div className="pt-5 w-full">
            <div className="flex gap-2 flex-wrap">
                {
                    tagOptions.map((tag, index) => (<PrimaryTag
                        onClick={() => { setSelectedTagId(tag.id) }}
                        selected={(tag.id === selctedTagId)}
                        key={index}
                    >
                        {tag.title}
                    </PrimaryTag>))
                }
            </div>
            <SlidesTrack>
                <SiteNewsSection items={baseInfos} />
            </SlidesTrack>
        </div>
    </div>
}

const ImageContainer = styled.div`
    width: 100%;
    height: 215px;
    overflow: hidden;
    @media(min-width: ${screens.tablet}) {
        height: 210px;
    }
    @media(min-width: ${screens.laptop}) {
        height: 110px;
    }
    @media(min-width: ${screens.desktop}) {
        height: 121px;
    }
`
