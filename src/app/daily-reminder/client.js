"use client"
import Container from "@/shared/layout/Container"
// import { RadioGroup } from '@headlessui/react'
import { useEffect, useState, useMemo } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import BannerImage from '@/asset/image/activities-banner.jpeg'
import { BannerTitle } from "@/components/home/components"
import Image from 'next/image'
import PrimaryActivityCard from "@/shared/card/PrimaryActivityCard"
import PrimaryCard from "@/shared/card/PrimaryCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { getArticlesByCategory, getUserById } from "@/api/joomlaApi"
// import Skeleton from "react-loading-skeleton"
import { useRouter } from "next/navigation"
import routes from "@/config/routes"
import { addHits } from "@/api/api"
import Icon from "@/shared/Icon"
import DefaultImage from '@/asset/image/default-article-intro.png'

const { useRequest } = require('ahooks')

const loadingData = Array(9).fill({
  loading: true
});


export default function Page({ tagInfo }) {
  const [listData, setListData] = useState(loadingData)
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageOffset = useMemo(() => (currentPage - 1) * 9, [currentPage]);

  const router = useRouter();

  const { data: listDataRef, loading } = useRequest(() => getArticlesByCategory({ label_name: "證嚴上人每日一叮嚀", limit: 9, offset: pageOffset }), {
    refreshDeps: [pageOffset],
    onSuccess: async (res) => {
      setListData(res.data)
      setTotalPage(res.meta['total-pages']);
    },
    onError: (err) => {
      console.error(err);
    }
  })

  const onPageHit = (id) => {
    router.push(`${routes.ARITCLE}/${id}`)
    addHits(id);
  }

  return <Container>
    <FloatScrollTopButton />
    {/* filter options section */}
    <div className="flex w-full flex-col gap-y-6">
      {/* breadcrumbs */}
      <div className="flex gap-1 tablet:mt-6 mt-4">
        <PrimaryBreadcrumb
          items={[
            {
              label: '首頁',
              link: '/'
            },
            {
              label: tagInfo?.title,
              link: ''
            },
          ]} />
      </div>

      {/* banner image */}
      <div className="w-full desktop:h-[238px] laptop:h-[282px] grid desktop:grid-cols-[455px_1fr] laptop:grid-cols-[539px_1fr] grid-cols-1">
        <div className="relative tablet-only:w-[742px] tablet-only:h-[350px] tablet-down:w-[349px] tablet-down:h-[165px]">
          <Image
            src={tagInfo?.images?.image_intro ? tagInfo?.images?.image_intro : DefaultImage}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="h-full w-full bg-[#E0E0E066] laptop:p-6 tablet:p-4 p-2 flex flex-col">
          <div className="flex flex-row items-center gap-x-2">
            <div style={{transform: 'rotate(180deg)'}}><Icon.Quotation width="24px" height="24px"/></div>
            <div className="border-b border-solid border-primary-blue1 w-full"></div>
          </div>
          <div className="grow laptop:py-4 py-2 px-2 flex flex-col gap-y-[6px]">
            <span className="font-bold text-primary-blue1 text-[30px]">每日一叮嚀</span>
            <div className="text-gray-gray2 text-base desktop:line-clamp-3 desktop:h-[4.5rem] laptop:line-clamp-4 laptop:h-[6rem] break-all">
              {tagInfo.metadesc}
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <div className="border-b border-solid border-primary-blue1 w-full"></div>
            <Icon.Quotation width="24px" height="24px"/>
          </div>
        </div>
      </div>

      {/* result cards */}
      <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 gap-x-5 gap-y-6">
        {
          listData.map((item, index) => <PrimaryCard
            item={item?.attributes}
            key={index}
            index={index}
            onClick={() => {
              onPageHit(item.id)
            }}
          />)
        }
      </div>

      {/* pagination */}
      <div className="w-full">
        <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={(index) => {
          setCurrentPage(index);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      </div>
    </div>

  </Container>
}

