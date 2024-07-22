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
        <InnerContainer>
            <div className="flex px-2 laptop:justify-end justify-center shrink-0 laptop:max-w-[50%] desktop:max-w-full max-h-[150px]">
                {   reminderItem?.id ?
                    <div className="aspect-square relative w-full">
                        <Image
                            src={reminderItem.image ? reminderItem.image : DefaultImage}
                            alt={reminderItem.imageAlt}
                            sizes="100vw"
                            layout='fill'
                            objectFit='contain'
                            className="w-full laptop:h-auto laptop:w-full desktop:max-w-[165px]"
                        // style={{ width: '100%' }}
                        />
                    </div> :
                    <Skeleton className="aspect-square" />
                }
            </div>
            <div
                className="flex flex-col font-semibold leading-7 tracking-normal p-2 text-xl laptop:justify-start shrink min-h-[90px] cursor-pointer"
                onClick={() => {
                    if (reminderItem.id) {
                        router.push(`${routes.ARITCLE}/${reminderItem.id}`);
                        addHits(reminderItem.id);
                    }
                }}>
                證嚴上人<br />
                每日一叮嚀
                <div className="pt-0 justify-center laptop:justify-start line-clamp-1 text-gray-gray2 w-full shrink text-base">
                    {loading ? <Skeleton /> : reminderItem.title}
                </div>
            </div>

        </InnerContainer>
        <div className="bg-gray-gray8 p-1.5 w-full">
            <span
              className="cursor-pointer font-medium flex items-center justify-end text-lg text-primary-blue3 hover:text-primary-blue2"
              onClick={() => {
                router.push(`https://tw.tzuchi.org/featured/help/2019%E6%96%B0%E5%9E%8B%E5%86%A0%E7%8B%80%E7%97%85%E6%AF%92%E9%98%B2%E7%96%AB/%E8%AD%89%E5%9A%B4%E4%B8%8A%E4%BA%BA%E6%AF%8F%E6%97%A5%E4%B8%80%E5%8F%AE%E5%9A%80`)
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
    padding-top: 8px;
    width: 100%;
    height: 260px;
    @media(min-width: ${screens.laptop}) {
        padding-top: 10px;
        padding-bottom: 10px;
        flex-direction: row;
        height: 135px;
    }
    @media(min-width: ${screens.desktop}) {
        padding-top: 10px;
        padding-bottom: 0;
        flex-direction: column;
        height: fit-content;
    }
`
