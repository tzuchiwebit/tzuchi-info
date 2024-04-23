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

const tagOptions = [
    '臺灣',
    '亞洲',
    '美洲',
    '歐洲',
    '非洲',
    '大洋洲',
    '全球',
]

const Item = ({ item = {} }) => {

    const router = useRouter();

    return (
        <div className="relative w-full p-1 min-w-[300px] laptop:min-w-0 cursor-pointer">
            <div className="w-full shadow-elevation-3 rounded-md overflow-hidden p-2">
                {/* <StyledImage style={{ backgroundImage: `url(${"https://picsum.photos/id/230/300/300"})` }} /> */}
                <ImageContainer onClick={() => router.push(`${routes.ARITCLE}/${item.id}`)}>
                    {
                        item?.images?.image_intro ?
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
        {items.slice(0, 3).map((i, index) => <Item item={i.attributes} key={index} />)}
    </div>
}

export default function SiteNews() {

    const [selctedIndex, setSelectedIndex] = useState(0);

    const { pageData, loading } = useDataProvider();

    const baseInfos = useMemo(() => {
        const target = _.find(pageData, { name: '各據點消息' });
        return target?.data
        // return target?.data?.length ? _.filter(target?.data,
        //     (i) => Object.keys(i.attributes?.tags)
        //         .map(key => i.attributes?.tags[key])
        //         .includes(tagOptions[selctedIndex])
        // ) : []
    }, [pageData, selctedIndex])
    // console.log(`baseInfos`)
    // console.log(baseInfos)


    return <div className="pt-5">
        <BannerTitle title={`各據點消息`} link={routes.THE_BASE_MESSAGE} />
        <div className="pt-5 w-full">
            <div className="flex gap-2 flex-wrap">
                {
                    tagOptions.map((tag, index) => (<PrimaryTag
                        onClick={() => { setSelectedIndex(index) }}
                        selected={(selctedIndex === index)}
                        key={index}
                    >
                        {tag}
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
