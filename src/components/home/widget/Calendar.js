'use client'
import { useState, useEffect, useMemo, Suspense } from "react"
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import dayjs from "dayjs"
import Icon from "@/shared/Icon"
import { OuterContainer } from "./container"
import { useRouter } from 'next/navigation'
import routes from "@/app/config/routes"
import useDataProvider from "../useDataProvider"
import _ from 'lodash'
import Skeleton from 'react-loading-skeleton'

export default function Calendar() {

    const router = useRouter();

    const { pageData, loading } = useDataProvider();
    console.log(pageData, loading)

    const morningDataTitle = useMemo(() => {
        const target = _.find(pageData, { name: '志工早會' });
        if (target?.data) {
            const title = target?.data[0]?.attributes?.title || '證嚴上人智慧法語'
            return title
        }
        return '證嚴上人智慧法語'
    }, [pageData])

    const [date, setDate] = useState({});

    useEffect(() => {
        setDate({
            dateUpper: dayjs().format('YYYY.MM'),
            dateLower: dayjs().format('DD'),
        })
    }, []);

    return <OuterContainer>
        <InnerContainer>
            <CalendarContainer style={{ backgroundImage: `url(/bgImage/bg-roof.svg)` }}>
                <div className="w-[48%] border-solid border-gray-gray8 border-r justify-center flex h-fit laptop:justify-end">
                    <div className="flex flex-col justify-center w-fit pr-1 laptop:text-right laptop:pr-2 desktop:text-center desktop:pr-1">
                        <div className="font-semibold text-lg w-fit leading-normal tablet:leading-5">
                            {date.dateUpper}
                        </div>
                        <div className="font-semibold text-[40px] leading-none w-auto text-center">
                            {date.dateLower}
                        </div>
                    </div>
                </div>
                <div className="w-[52%] flex flex-col h-fit text-lg laptop:text-xl whitespace-nowrap justify-center">
                    <div className="font-semibold text-center laptop:text-left laptop:pl-2 desktop:text-center desktop:pl-0 leading-7 tracking-normal pt-1">
                        世代輪轉<br />
                        法脈接續
                    </div>
                    <div className="hidden laptop:flex desktop:hidden laptop:text-left laptop:pl-2 desktop:text-center desktop:pl-0 flex-col justify-center font-semibold leading-7 tracking-normal p-2 text-xl laptop:justify-start shrink desktop:min-h-[90px]">
                        志工早會
                        <div className="pt-0 justify-center laptop:justify-start line-clamp-1 text-gray-gray2 w-full shrink text-base">
                            {loading ? <Skeleton /> : morningDataTitle}
                        </div>
                    </div>
                </div>
            </CalendarContainer>
            <div className="flex laptop:hidden desktop:flex flex-col font-semibold leading-7 tracking-normal p-2 text-xl laptop:justify-start shrink min-h-[94px]">
                志工早會
                <div className="pt-0 justify-center laptop:justify-start line-clamp-1 text-gray-gray2 w-full shrink text-base">
                    {loading ? <Skeleton /> : morningDataTitle}
                </div>
            </div>
        </InnerContainer>
        <div className="bg-gray-gray8 p-1.5 w-full">
            <span
                className="cursor-pointer font-medium flex items-center justify-end text-lg text-primary-blue3 hover:text-primary-blue2"
                onClick={() => {
                    router.push(`${routes.VOLUNTEER_MORNING_MEETING}`)
                }}>
                更多 <Icon.RightArrow2 width="18px" />
            </span>
        </div>
    </OuterContainer>
}

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 4px solid ${color.gray.gray8};
    color: ${color.primary.blue1};
    height: 260px;
    @media(min-width: ${screens.laptop}) {   
        height: 135px;
    }
    @media(min-width: ${screens.desktop}) {   
        height: 275px;
    }
`


const CalendarContainer = styled.div`
    background-repeat: no-repeat;
    display: flex;
    padding-top: 8px;
    background-size: 150%;
    background-position: -10px 100%;
    width: 100%;
    height: 160px;
    @media(min-width: ${screens.laptop}) {   
        padding-top: 8px;
        flex-direction: row;
        height: 135px;
        background-size: 100%;
        background-position: -30px 110%;
    }
    @media(min-width: ${screens.desktop}) {  
        min-height: 165px;
        padding-top: 16px;
        padding-left: unset;
        padding-right: unset;
        background-size: 200%;
        background-position: -45px 100%;
    }
`