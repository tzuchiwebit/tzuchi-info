'use client'
import styled from "styled-components"
import { BannerTitle, SlidesTrack } from "../components"
import screens from "@/shared/styles/screens";
import dayjs from "dayjs"
import Icon from "@/shared/Icon";
import BlurBGImage from "@/shared/image/BlurBGImage";
import useDataProvider from "../useDataProvider";
import { useMemo } from "react";
import _ from 'lodash'
import { useRouter } from "next/navigation";
import routes from "@/config/routes";
import Skeleton from "react-loading-skeleton";
import { addHits } from "@/api/api"
import dynamic from 'next/dynamic'
import { Linkfont } from "@/shared/styles/linkFont.js";
const LikeAndShare = dynamic(() => import('../components/LikeAndShare'), { ssr: false })

const Item = ({ item = {} }) => {

    const router = useRouter();

    return (
        <div className="relative w-full p-1 min-w-[300px] laptop:min-w-0 cursor-pointer" >
            <div className="w-full shadow-elevation-3 rounded-md overflow-hidden p-3 flex flex-col laptop:flex-row gap-4 items-center">
                <ImageContainer onClick={() => {
                    router.push(`${routes.ARITCLE}/${item.id}`)
                    addHits(item.id);
                }}>
                    {
                        item?.id ?
                            <BlurBGImage
                                url={item.images?.image_intro}
                                alt={item.images?.image_intro_alt}
                            /> :
                            <Skeleton className="aspect-video" />
                    }
                </ImageContainer>
                <div className="relative h-[210px] laptop:h-[220px] laptop:max-w-[45%]">
                    <div
                        className="text-xl font-bold w-full text-primary-blue1 text-left line-clamp-2 h-14"
                        onClick={() => {
                            router.push(`${routes.ARITCLE}/${item.id}`)
                            addHits(item.id);
                        }}>
                        <Linkfont>{item.title}</Linkfont>
                    </div>
                    <div className="pt-2 font-md w-full text-gray-gray2 text-left line-clamp-4">
                        {item.metadesc}
                    </div>
                    <div className="w-full absolute bottom-0 pt-2 font-medium text-sm text-gray-gray4 border-t-2 border-solid border-gray-gray8 flex justify-between items-center">
                        <div>
                            {dayjs(item.publish_up).format('YYYY-MM-DD')}<br />
                            {item.place !== "NULL" ? item.place : <><br /></>}
                        </div>
                        <div className="hidden gap-1 text-sm flex">
                            <LikeAndShare
                                articleId={item.id}
                                likes={item.like}
                                shares={item.share}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CommunityStorySection = ({ data }) => {
    return <div className="pt-3 w-fit flex laptop:w-full laptop:flex-col">
        {data.map((item, index) => <Item key={index} item={item.attributes} />)}
    </div>
}

export default function CommunityStory() {

    const { pageData, loading } = useDataProvider()

    const storyData = useMemo(() => {
        const target = _.find(pageData, { name: '社區故事' });
        return target?.data || []
    }, [pageData])

    // console.log(storyData)
    return <div className="pt-5">
        <BannerTitle id="CommunityStory" title={`社區故事`} link="https://tw.tzuchi.org/community/" behavior="blank" />
        <div className="pt-2 w-full">
            <SlidesTrack>
                <CommunityStorySection data={storyData} />
            </SlidesTrack>
        </div>
    </div>
}

const ImageContainer = styled.div`
    width: 100%;
    height: 215px;
    width: 325px;
    @media(min-width: ${screens.tablet}) {
        height: 210px;
        width: 280px;
    }
    @media(min-width: ${screens.laptop}) {
        height: 218px;
        width: 340px;
    }
`
