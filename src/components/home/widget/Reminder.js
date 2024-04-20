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

export default function Reminder() {

    const { pageData, loading } = useDataProvider()
    const router = useRouter();

    const reminderItem = useMemo(() => {
        const target = _.find(pageData, { name: '證嚴上人每日一叮嚀' });
        if (target?.data) {
            return {
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
            <div className="flex px-2 laptop:justify-end justify-center shrink-0 laptop:max-w-[50%] desktop:max-w-full">
                <Image
                    src="https://picsum.photos/id/208/200/300"
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="aspect-square w-full laptop:h-auto laptop:w-full max-w-[150px] desktop:max-w-[165px]"
                // style={{ width: '100%' }}
                />
            </div>
            <div
                className="flex flex-col font-semibold leading-7 tracking-normal p-2 text-xl laptop:justify-start shrink min-h-[90px] cursor-pointer"
                onClick={() => {
                    if (reminderItem.id) {
                        router.push(`${routes.ARITCLE}/${reminderItem.id}`);
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
            <span className="cursor-pointer font-medium flex items-center justify-end text-lg text-primary-blue3 hover:text-primary-blue2">
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