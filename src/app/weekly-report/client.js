"use client"
import { useState, useMemo, useEffect, Fragment } from "react"
import Container from "@/shared/layout/Container"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import BannerImage from '@/asset/image/weekly-report-banner.jpeg'
import Image from 'next/image'
import Pagination from "@/shared/pagination/Pagination"
import { ReportCard, SocialBar } from "@/components/weeklyReport"
import { getWeeklyReportNew } from "@/api/api";
import _ from 'lodash'
import { useRequest } from 'ahooks';
import Spinner from "@/components/Spinner"
import { useRouter, useSearchParams } from "next/navigation"

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
  const pageLimit = 12
  const [listData, setListData] = useState([])

  const router = useRouter();
  const searchParams = useSearchParams()

  const currentPage = useMemo(() => (searchParams.get('p') === null || isNaN(searchParams.get('p'))) ? 1 : parseInt(searchParams.get('p')))
  const [totalPage, setTotalPage] = useState(1);
  const pageOffset = useMemo(() => (currentPage - 1) * pageLimit, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setListData(Array(pageLimit).fill({
      loading: true
    }))
  }, [currentPage])

  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  const { data: listDataRef, loading, run } = useRequest(() => getWeeklyReportNew({ limit: pageLimit, offset: pageOffset }), {
    refreshDeps: [pageOffset, currentPage],
    manual: false,
    onSuccess: async (res) => {
      setListData(res?.results || [])
      setTotalPage((res.total && res.total > pageLimit) ? Math.ceil((res.total) / pageLimit) : 1)
    },
    onError: (err) => {
      console.error(err);
    }
  })

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
          {/* <SocialBar isMobileType={false}></SocialBar> */}
        </div>

      </div>

      {/* banner image */}
      <Image
        className="tablet:mt-6 mt-4"
        priority={true}
        src={BannerImage}
        alt=""
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />

      {/* card list */}
      {
        loading ? <div className="h-[240px] flex justify-center items-center"><Spinner></Spinner></div> :
        <Fragment>
          <div className="tablet:mt-6 mt-4 grid desktop:grid-cols-4 laptop:grid-cols-3 grid-cols-2 tablet:gap-x-5 gap-x-4 tablet:gap-y-6 gap-y-4">
            {
              listData.map((item, index) => (
                <ReportCard isHappy={index === 0 && currentPage === 1} key={index} data={item}></ReportCard>
              ))
            }
          </div>

          {/* pagination */}
          <div className="mt-10">
            <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={(index) => {
              router.push(`/weekly-report?p=${index}`)
            }} />
          </div>
        </Fragment>
      }
    </Container>
    {/* <SocialBar isMobileType={true}></SocialBar> */}
  </>
}
