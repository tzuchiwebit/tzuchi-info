'use client'
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import Icon from "@/shared/Icon"
import Image from "next/image"
import { OuterContainer } from "./container"
import { useRouter } from 'next/navigation'
import routes from "@/config/routes"
import useDataProvider from "../useDataProvider"
import DefaultImage from '@/asset/image/default-article-intro-square.png'
import { useMemo } from "react"
import Skeleton from "react-loading-skeleton";
import { Linkfont } from "@/shared/styles/linkFont.js"

export default function Journal() {
  const router = useRouter();
  const { weeklyReports, loadingWeeklyReports } = useDataProvider();

  const weeklyReportItem = useMemo(() => {
    return weeklyReports?.[0] || {}
  }, [weeklyReports])

  const openSubscribeTab = (e) => {
    e.stopPropagation()
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSeRATEdx4-mOyykXIptMyXvbsJvw7XwzDWHWnqG1cMQTexZRA/viewform')
  }

  return <OuterContainer>
    <InnerContainer className="cursor-pointer" onClick={() => window.open(weeklyReportItem.base_book, '_blank', 'noopener=yes')}>
      <div className="flex px-1 justify-center">
        <div className="aspect-square relative laptop:w-[164px] w-[146px]">
          {
            loadingWeeklyReports ?
              <Skeleton className="aspect-square p-2" /> :
              <Image
                src={weeklyReportItem.cover_image ? weeklyReportItem.cover_image : DefaultImage}
                alt={weeklyReportItem.title}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
              />
          }
        </div>
      </div>
      <div className="flex flex-col px-2 pt-1 text-xl laptop:justify-start shrink min-h-[90px]">
        <div className="flex font-semibold leading-7 tracking-normal justify-between items-center tablet:flex-col tablet:items-start desktop:flex-row">
          <Linkfont>慈濟週報</Linkfont> <SubscribeTag onClick={openSubscribeTab}>訂閱 <Icon.Bell style={{ width: 13 }} /></SubscribeTag>
        </div>
        <div className="pt-1 justify-center laptop:justify-start line-clamp-2 text-gray-gray2 w-full shrink text-base cursor-pointer">
          {weeklyReportItem.title}
        </div>
      </div>

    </InnerContainer>
    <div className="bg-gray-gray8 p-1 w-full">
      <span
        className="cursor-pointer font-medium flex items-center justify-end text-lg text-primary-blue3 hover:text-primary-blue2"
        onClick={() => {
          router.push(`${routes.WEEKLY_REPORT}`)
          // window.open('https://tw.tzuchi.org/tzuchiweekly', '_blank')
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

const SubscribeTag = styled.button`
    background-color: ${color.complementary.pink};
    font-size: 13px;
    font-weight: 700;
    display: flex;
    gap: 5px;
    border-radius: 100px;
    color: white;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 25px;
`
