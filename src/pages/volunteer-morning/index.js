"use client"
import Container from "@/shared/layout/Container"
// import { RadioGroup } from '@headlessui/react'
import { useEffect, useState, useMemo } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import BannerImage from '@/asset/image/volunteer-morning-meeting.jpeg'
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { getArticlesByCategory } from "@/api/joomlaApi"
// import Skeleton from "react-loading-skeleton"
import { useRouter } from "next/navigation"
import routes from "@/config/routes"
import { addHits } from "@/api/api"
const { useRequest } = require('ahooks')

const loadingData = Array(12).fill({
  loading: true
});


export default function Page() {

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageOffset = useMemo(() => (currentPage - 1) * 9, [currentPage]);

  const router = useRouter();

  const { data: listDataRef, loading } = useRequest(() => getArticlesByCategory("志工早會", 9, pageOffset), {
    refreshDeps: [pageOffset],
    onSuccess: (res) => {
      // console.log(`res.meta`)
      // console.log(res.meta)
      setTotalPage(res.meta['total-pages']);
    },
    onError: (err) => {
      console.error(err);
    }
  })

  const listData = useMemo(() => loading ? loadingData : listDataRef?.data || [], [listDataRef, loading]);

  // console.log(listData)
  const onPageHit = (id) => {
    router.push(`${routes.ARITCLE}/${id}`)
    // addHits(id);
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
              label: '志工早會',
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
      <div className="w-fit flex flex-wrap -mx-3">
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
      <div className="w-full">
        <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={(index) => {
          setCurrentPage(index);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      </div>
    </div>

  </Container>
}

