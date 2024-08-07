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
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { getArticlesByCategory, getUserById } from "@/api/joomlaApi"
// import Skeleton from "react-loading-skeleton"
import { useRouter } from "next/navigation"
import routes from "@/config/routes"
import { addHits } from "@/api/api"
import Icon from "@/shared/Icon"
const { useRequest } = require('ahooks')

const loadingData = Array(12).fill({
  loading: true
});


export default function Page() {
  const [listData, setListData] = useState(loadingData)
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageOffset = useMemo(() => (currentPage - 1) * 9, [currentPage]);

  const router = useRouter();

  const { data: listDataRef, loading } = useRequest(() => getArticlesByCategory({ label_name: "熱門活動", limit: 9, offset: pageOffset }), {
    refreshDeps: [pageOffset],
    onSuccess: async (res) => {
      // console.log(`res`)
      // console.log(res)

      const creatorPool = {}
      for (let article of res.data) {
        if (creatorPool[article?.attributes?.created_by]) {
          article.attributes.creator = creatorPool[article?.attributes?.created_by]
        } else {
          const creator = (await getUserById(article?.attributes?.created_by))
          creatorPool[article?.attributes?.created_by] = creator
          article.attributes.creator = creator
        }
      }

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
              label: '熱門活動',
              link: ''
            },
          ]} />
      </div>
      <div className="w-full text-[30px] font-bold text-primary-blue1">
        熱門活動
        <div className="flex justify-between items-center">
          <div className="flex text-gray-gray5 font-medium items-center flex-0">
            <div className="border-r border-gray-gray7 border-solid pr-2 mr-2 h-fit text-[14px]">
              2024-01-21
            </div>
            <div className="pr-2 text-[16px]">
              慈濟基金會
            </div>
          </div>
          <div className="border-t-2 border-solid border-gray-gray7 flex-1" />
          <div className="flex flex-0 px-1 gap-1 mx-1">
            <Icon.SocialFacebook className="cursor-pointer" />
            <Icon.SocialLine className="cursor-pointer" />
          </div>
        </div>
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
      {/* <BannerTitle title="活動點位地圖" /> */}
      <BannerTitle title="活動資訊" />
      <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 gap-x-5 gap-y-6">
        {
          listData.map((item, index) => <PrimaryActivityCard
            item={item?.attributes}
            key={index}
            index={index}
            onClick={() => {
              onPageHit(item.id)
            }}
          />)
        }
      </div>
      <div className="w-full">
        <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={(index) => {
          setCurrentPage(index);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      </div>
    </div>

  </Container>
}

