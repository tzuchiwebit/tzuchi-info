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
import { getArticlesByCategory, getUserById } from "@/api/joomlaApi"
// import Skeleton from "react-loading-skeleton"
import { useRouter } from "next/navigation"
import routes from "@/config/routes"
import { addHits } from "@/api/api"
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

  const { data: listDataRef, loading } = useRequest(() => getArticlesByCategory({ label_name: "志工早會", limit: 9, offset: pageOffset }), {
    refreshDeps: [pageOffset],
    onSuccess: async (res) => {
      // console.log(`res.meta`)
      // console.log(res.meta)

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
      <div className="flex gap-1 tablet:mt-6 mt-4">
        <PrimaryBreadcrumb
          items={[
            {
              label: '首頁',
              link: '/'
            },
            {
              label: '上人開示',
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
      <div className="w-full">
        <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={(index) => {
          setCurrentPage(index);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      </div>
    </div>

  </Container>
}

