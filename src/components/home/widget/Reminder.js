'use client'
import { useMemo } from "react"
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import Icon from "@/shared/Icon"
import Image from "next/image"
import { OuterContainer } from "./container"
import useDataProvider from "../useDataProvider"
import Skeleton from 'react-loading-skeleton'
import _ from 'lodash'
import { useRouter } from "next/navigation"
import routes from "@/config/routes"
import { addHits } from "@/api/api"
import DefaultImage from '@/asset/image/default-article-intro-square.png'
import { Linkfont } from "@/shared/styles/linkFont.js"

export default function Reminder() {

    const { pageData, loading } = useDataProvider()
    const router = useRouter();

    const reminderItem = useMemo(() => {
        const target = _.find(pageData, { name: '證嚴上人每日一叮嚀' });
        if (target?.data) {
            return {
                image: target?.data[0]?.attributes?.images?.image_intro || '',
                imageAlt: target?.data[0]?.attributes?.images?.image_intro_alt || '',
                title: target?.data[0]?.attributes?.title || '',
                id: target?.data[0]?.id
            }
        }
        return {
            title: '',
            id: ''
        }
    }, [pageData])

    return <OuterContainer>
        <InnerContainer className="cursor-pointer" onClick={() => {
            if (reminderItem.id) {
                router.push(`${routes.ARITCLE}/${reminderItem.id}`);
                addHits(reminderItem.id);
            }
        }}>
            <div className="flex px-1 justify-center">
                <div className="aspect-square relative laptop:w-[164px] w-[146px]">
                    {
                        loading ?
                            <Skeleton className="aspect-square p-2" /> :
                            <Image
                                src={reminderItem.image ? reminderItem.image : DefaultImage}
                                alt={reminderItem.imageAlt}
                                fill
                                // width={0}
                                // height={0}
                                sizes="100vw"
                                style={{ objectFit: "contain" }}
                            />
                    }
                </div>
            </div>
            <div
                className="flex flex-col font-semibold leading-7 tracking-normal px-2 pt-1 text-xl laptop:justify-start shrink min-h-[90px] cursor-pointer"
            >
                <Linkfont>
                    證嚴上人<br />
                    每日一叮嚀
                </Linkfont>
                <div className="pt-0 justify-center laptop:justify-start line-clamp-1 text-gray-gray2 w-full shrink text-base">
                    {reminderItem.title}
                </div>
            </div>

        </InnerContainer>
        <div className="bg-gray-gray8 p-1 w-full">
            <span
                className="cursor-pointer font-medium flex items-center justify-end text-lg text-primary-blue3 hover:text-primary-blue2"
                onClick={() => {
                    // window.open(`https://tw.tzuchi.org/featured/help/2019%E6%96%B0%E5%9E%8B%E5%86%A0%E7%8B%80%E7%97%85%E6%AF%92%E9%98%B2%E7%96%AB/%E8%AD%89%E5%9A%B4%E4%B8%8A%E4%BA%BA%E6%AF%8F%E6%97%A5%E4%B8%80%E5%8F%AE%E5%9A%80`)
                    router.push(`${routes.DAILY_REMINDER}`);
                }}>
                更多 <Icon.RightArrow2 width="18px" />
            </span>
        </div>
    </OuterContainer>
}


const InnerContainer = styled.div`
    border: 4px solid ${color.gray.gray8};
    display: flex;
    flex-direction: column;
    color: ${color.primary.blue1};
    padding: 8px 4px 0;
    width: 100%;
    height: 256px;

    @media(min-width: ${screens.laptop}) {
        padding: 4px 0 4px;
        flex-direction: row;
        height: 180px;
    }
    @media(min-width: ${screens.desktop}) {
        padding: 4px 0 0;
        flex-direction: column;
        height: 260px;
    }
`
