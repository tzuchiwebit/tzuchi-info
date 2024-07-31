"use client"
import { useState, useMemo, useEffect} from "react"
import Container from "@/shared/layout/Container"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import BannerImage from '@/asset/image/weekly-report-banner.jpeg'
import Image from 'next/image'
import Pagination from "@/shared/pagination/Pagination"
import { ReportCard, SocialBar } from "@/components/weeklyReport"
import { getWeeklyReport } from "@/api/api";

const Breadcrumb = ({className}) => {
  return (
    <div className={className}>
      <div className="flex gap-1 w-full">
        <PrimaryBreadcrumb
          items={[
            {
              label: '首頁',
              link: '/'
            },
            {
              label: '慈濟週報',
              link: ''
            }
          ]} />
      </div>
    </div>
  )
}

export default function Page() {
  const [listData, setListData] = useState([])
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageOffset = useMemo(() => (currentPage - 1) * 9, [currentPage]);

  const fetchData = async () => {
    const res = await getWeeklyReport(10, 0);
    setListData(res)
    console.log('rrrrr', res)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <>
    <Container>
      <FloatScrollTopButton />
      {/* breadcrumb */}
      <Breadcrumb className="tablet:mt-4 mt-2"></Breadcrumb>

      {/* title */}
      <div className="tablet:mt-6 mt-4 text-[30px] font-bold text-primary-blue1">
        慈濟週報
      </div>

      <div className="flex tablet:flex-row flex-col items-center gap-x-2 tablet:mt-2 mt-1">
        <div className="tablet-down:w-full flex flex-row gap-x-2 items-center">
          {/* metadata */}
          <span className="text-[14px] text-gray-gray4 font-medium">2024-01-21</span>
          <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
          <span className="text-[14px] text-gray-gray4 font-medium">慈濟基金會</span>
        </div>
        <div className="tablet-down:w-full flex flex-row items-center grow gap-x-2">
          {/* horizontal line */}
          <div className="grow flex flex-1 text-lg border-solid border-b-2 border-gray-gray7" />

          {/* social bar */}
          <SocialBar isMobileType={false}></SocialBar>
        </div>

      </div>

      {/* banner image */}
      <Image
        className="tablet:mt-6 mt-4"
        src={BannerImage}
        alt=""
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />

      {/* card list */}
      <div className="tablet:mt-6 mt-4 grid desktop:grid-cols-4 laptop:grid-cols-3 grid-cols-2 tablet:gap-x-5 gap-x-4 tablet:gap-y-6 gap-y-4">
        {
          listData.map((item, index) => (
            <ReportCard isHappy={index === 0 && currentPage === 1} key={index} data={item}></ReportCard>
          ))
        }
      </div>

      {/* pagination */}
      <div className="mt-10">
        <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
      </div>
    </Container>
    <SocialBar isMobileType={true}></SocialBar>
  </>
}
