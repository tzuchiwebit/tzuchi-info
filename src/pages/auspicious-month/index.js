"use client"
import Container from "@/shared/layout/Container"
// import { RadioGroup } from '@headlessui/react'
import { useEffect, useState, useMemo } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { getUserById, getExtendArticles } from "@/api/joomlaApi"
import { useRouter } from "next/navigation"
import routes from "@/config/routes"
import { addHits } from "@/api/api"
import axios from "axios"
import Skeleton from "react-loading-skeleton"
const { useRequest, useResponsive } = require('ahooks')

const loadingData = Array(12).fill({
  loading: true
});


export default function Page() {
  const [listData, setListData] = useState(loadingData)
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageOffset = useMemo(() => (currentPage - 1) * 9, [currentPage]);
  const responsive = useResponsive();
  const router = useRouter();

  // 吉祥月api, 
  const { data: auspiciousMonthData, loading: loadingAuspiciousData } = useRequest(() => {
    return axios.get(`https://raw.githubusercontent.com/KaelLim/JSONFile/main/%E4%B8%83%E6%9C%88%E5%90%89%E7%A5%A5%E6%9C%88/api.json`);
  })

  const articleTagId = useMemo(() => auspiciousMonthData?.data?.article?.[0]?.tag_id, [auspiciousMonthData]);
  const bannerImage = useMemo(() => auspiciousMonthData?.data?.banner?.[0]?.img_bg_desktop, [auspiciousMonthData]);
  const bannerImageMobile = useMemo(() => auspiciousMonthData?.data?.banner?.[0]?.img_bg_mobile, [auspiciousMonthData]);

  const { data: listDataRef, loading } = useRequest(() => getExtendArticles([articleTagId], ""), {
    // refreshDeps: [pageOffset],
    ready: !!(articleTagId),
    onSuccess: async (res) => {

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
              label: '吉祥月',
              link: ''
            },
          ]} />
      </div>
      {/* banner image */}
      <div className="w-full">
        {
          !!(bannerImage || bannerImageMobile) ? <Image
            src={responsive?.sm ? bannerImage : bannerImageMobile}
            priority
            alt=""
            sizes="100vw"
            width="1200"
            height="600"
            // Make the image display full width
            style={{
              width: '100%',
              height: 'auto',
            }} /> : <></>
        }

      </div>
      {/* result cards */}
      <div className="w-fit flex flex-wrap -mx-3">
        {
          (loading || loadingAuspiciousData) ? <Skeleton /> : listData.map((item, index) => <PrimaryCard
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

