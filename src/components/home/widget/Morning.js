'use client'
import { useMemo } from "react"
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import Icon from "@/shared/Icon"
import Image from "next/image"
import { OuterContainer } from "./container"
import { useRouter } from 'next/navigation'
import routes from "@/config/routes"
import Skeleton from "react-loading-skeleton"
import useDataProvider from "../useDataProvider"
import _ from 'lodash'
import { addHits } from "@/api/api"
import DefaultImage from '@/asset/image/default-article-intro-square.png'
import dayjs from "dayjs"

export default function Morning() {
  const router = useRouter();
  const { pageData, loading } = useDataProvider();

  const morningData = useMemo(() => {
    const target = _.find(pageData, { name: '志工早會' });
    if (target?.data) {
      return {
          title: target?.data[0]?.attributes?.title || '證嚴上人智慧法語',
          id: target?.data[0]?.id,
          image: target?.data[0]?.attributes?.images?.image_intro || '',
          imageAlt: target?.data[0]?.attributes?.images?.image_intro_alt || '',
          publishUp: target?.data[0]?.attributes?.publish_up || '',
      }
    }
    return {}
  }, [pageData])

    return <OuterContainer>
      <InnerContainer>
        <div className="flex px-1 justify-center">
          {morningData?.id ?
            <div className="aspect-square relative laptop:w-[164px] w-[146px]">
              <Image
                src={morningData.image ? morningData.image : DefaultImage}
                alt={morningData.imageAlt}
                sizes="100vw"
                layout='fill'
                objectFit='cover'
                className="laptop:w-[164px] w-[146px]"
              />
            </div> :
            <Skeleton/>
          }
        </div>
        <div className="flex flex-col px-2 pt-1 text-xl laptop:justify-start shrink min-h-[90px]">
          <div className="flex font-semibold leading-7 tracking-normal justify-between items-center tablet:flex-col tablet:items-start desktop:flex-row">
            志工早會
          </div>
          <div
              className="pb-1 line-clamp-2 text-gray-gray2 w-full shrink text-base font-medium border-b border-solid border-gray-gray8 cursor-pointer"
              onClick={() => {
                  if (morningData.id) {
                      router.push(`${routes.ARITCLE}/${morningData.id}`);
                      addHits(morningData.id);
                  }
              }}>
              {loading ? <Skeleton /> : morningData.title}
          </div>
          <div className="pt-0.5 justify-center laptop:justify-start line-clamp-2 text-gray-gray4 text-sm font-medium w-full shrink">
          {loading ? <Skeleton /> : dayjs(morningData.publishUp).format('YYYY-MM-DD')}
          </div>
        </div>
      </InnerContainer>
      <div className="bg-gray-gray8 p-1 w-full">
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
      height: 172px;
    }
    @media(min-width: ${screens.desktop}) {
      padding: 4px 0 0;
      flex-direction: column;
      height: 260px;
    }
`
