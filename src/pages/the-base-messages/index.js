"use client"
import Container from "@/shared/layout/Container"
import _ from 'lodash'
// import { RadioGroup } from '@headlessui/react'
import { useMemo, useState } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import BannerImage from '@/asset/image/the-base-messages.png'
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import dayjs from "dayjs"
import Icon from "@/shared/Icon"
import { BannerTitle } from "@/components/home/components"
import color from "@/shared/styles/color"
import styled from "styled-components"
import joomlaGlobal from '@/api/joomlaGlobal'
import { getArticlesByCategory } from "@/api/joomlaApi"
import { useRouter } from "next/router"

const { useRequest } = require('ahooks');

export default function Page() {

  // const [currentPage, setCurrentPage] = useState(1);


  // const tagOptions = [
  //   {
  //     title: '臺灣',
  //     id: 15
  //   },
  //   {
  //     title: '亞洲',
  //     id: 25
  //   },
  //   {
  //     title: '美洲',
  //     id: 33
  //   },
  //   {
  //     title: '歐洲',
  //     id: 170
  //   },
  //   {
  //     title: '非洲',
  //     id: 188
  //   },
  //   {
  //     title: '大洋洲',
  //     id: 60
  //   },
  // ]

  const { data: baseDataList, loading } = useRequest(() => {
    return Promise.all([
      getArticlesByCategory({ label_name: "全球志業", tag: 15, limit: 5 }), // 台灣
      getArticlesByCategory({ label_name: "全球志業", tag: 25, limit: 5 }), // 亞洲
      getArticlesByCategory({ label_name: "全球志業", tag: 33, limit: 5 }), // 美洲
      getArticlesByCategory({ label_name: "全球志業", tag: 170, limit: 5 }), // 歐洲
      getArticlesByCategory({ label_name: "全球志業", tag: 188, limit: 5 }), // 非洲
      getArticlesByCategory({ label_name: "全球志業", tag: 60, limit: 5 }), // 大洋洲
    ])
  })

  const baseData = useMemo(() => {
    return {
      taiwan: baseDataList?.[0].data || [],
      asia: baseDataList?.[1].data || [],
      america: baseDataList?.[2].data || [],
      europe: baseDataList?.[3].data || [],
      africa: baseDataList?.[4].data || [],
      oceania: baseDataList?.[5].data || [],
    }
  }, [baseDataList])

  // console.log(`baseData`)
  // console.log(baseData)

  const SiteCard = ({ items, place }) => {

    const router = useRouter();
    // console.log(items)

    return <div className="w-full tablet:w-1/2 laptop:w-1/3 px-3 mb-6">
      <div className="bg-white border rounded-[4px] p-5 shadow-elevation-3 flex flex-col gap-2">
        <BannerTitle title={joomlaGlobal[place]?.label} link={joomlaGlobal[place]?.link} />
        <div className="text-primary-blue1 font-bold text-xl">
          {items.title}
        </div>
        <div className="flex flex-col">
          {
            items.map((i, _index) => (<div
              key={_index}
              className="border-b border-solid border-gray-gray8 py-2 cursor-pointer flex items-center justify-between"
              onClick={() => {
                router.push(`/article/${i.id}`)
              }}
            >
              <div className="text-primary-blue1 text-xl font-bold line-clamp-2 ">
                {i.attributes.title}
              </div>

              {
                dayjs(i.attributes.publish_up).isAfter(dayjs().subtract(14, 'D')) ? <div className="pl-5">
                  <IsNewTag><span className="absolute -left-[5px] text-complementary-pink z-0">◄</span>NEW</IsNewTag>
                </div> : <></>
              }
            </div>))
          }
        </div>
      </div>
    </div>
  }


  return <Container>
    <FloatScrollTopButton />
    {/* filter options section */}
    <div className="flex w-full flex-col gap-5">
      {/* breadcrumbs */}
      <div className="flex pt-[30px] gap-1">
        <PrimaryBreadcrumb
          items={[
            {
              label: '首頁',
              link: '/'
            },
            {
              label: '全球志業',
              link: ''
            },
          ]} />
      </div>
      {/* banner image */}
      <div className="w-full">
        <Image
          src={BannerImage}
          alt=""
          sizes="100vw"
          // Make the image display full width
          style={{
            width: '100%',
            height: 'auto',
          }} />
      </div>
      {/* result cards */}
      <div className="w-auto flex flex-wrap -mx-3">
        {
          Object.keys(baseData).map((key, index) => <SiteCard place={key} items={baseData[key]} key={index} />)
        }
      </div>
    </div>

  </Container>
}

const IsNewTag = styled.div`
  position: relative;
  background-color: ${color.complementary.pink};
  padding-left: 5px;
  padding-right: 5px;
  color: white;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
`
