"use client"
import Container from "@/shared/layout/Container"
// import { RadioGroup } from '@headlessui/react'
import { useMemo, useState } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import BannerImage from '@/asset/image/column-article.png'
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import classNames from "@/utils/classNames"
import Icon from "@/shared/Icon"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { getArticlesByCategory } from "@/api/joomlaApi"
import useScreenSize from '@/shared/hook/useScreenSize';
import Skeleton from "react-loading-skeleton"
const { useRequest } = require('ahooks')

const tabs = [
  {
    label: '領航慈濟',
    icon: <Icon.Lotus style={{ width: 32 }} />
  },
  {
    label: '名人視角',
    icon: <Icon.Global style={{ width: 32 }} />
  },
]

export default function Page() {

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const screenSize = useScreenSize();
  const [isMobileDevice, setIsMobileDevice] = useState(screenSize.width < 1024)
  // const loading = true;

  const { data: columnArticlesData, loading } = useRequest(() => getArticlesByCategory({
    label_name: `專欄文章-${tabs[activeTab].label}`,
    limit: isMobileDevice ? 8 : 9,
    offset: isMobileDevice ? (currentPage - 1) * 8 : (currentPage - 1) * 9,
    tag: activeTab === 0 ? 1486 : 1487
  }), {
    refreshDeps: [activeTab, currentPage]
  });

  const listData = useMemo(() => columnArticlesData?.data || [], [columnArticlesData]);
  const totalPage = useMemo(() => columnArticlesData?.meta?.['total-pages'] || 1, [columnArticlesData]);
  
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
              label: '專欄文章',
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
        {/* tab button */}
        <div className="w-full flex flex-col tablet:flex-row -mt-[1px]">
          {
            tabs.map((item, index) => <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={classNames(
                activeTab === index ? 'bg-primary-blue1 text-white' : 'bg-gray-gray9 text-primary-blue1',
                `flex items-center justify-center gap-2 py-2 px-3 font-bold text-lg tablet:text-[26px] leading-8 hover:bg-primary-blue1 hover:text-white transition-all w-full tablet:w-1/2`
              )}>
              {item.icon}{item.label}
            </button>)
          }

        </div>
      </div>
      {/* result cards */}
      {
        loading ? (<div className="w-full tablet:w-1/2 laptop:w-1/3">
          <Skeleton className="w-full aspect-video" />
          <Skeleton count={3} className="w-full" />
        </div>) : (<div className="w-fit flex flex-wrap -mx-3">
          {
            listData.map((item, index) => <PrimaryCard item={item?.attributes} key={index} index={index} />)
          }
        </div>)
      }
      <div className="w-full">
        <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
      </div>
    </div>

  </Container>
}

