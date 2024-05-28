"use client"
import Container from "@/shared/layout/Container"
import { useState, useMemo, useEffect, useRef } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { useParams } from 'next/navigation'
import Skeleton from "react-loading-skeleton"
import joomlaGlobal from '@/api/joomlaGlobal'
import { getArticlesByCategory } from "@/api/joomlaApi"
import { useRouter } from "next/router"
import routes from "@/config/routes"
const { useRequest } = require('ahooks')

const loadingData = Array(9).fill({
  loading: true
});

const Breadcrumb = ({className}) => {
  const params = useParams();

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
              label: '全球志業 ',
              link: '/the-base-messages'
            },
            {
              label: joomlaGlobal[params?.slug?.toString()]?.label,
              link: ''
            },
          ]} />
      </div>
    </div>
  )
}

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageOffset = useMemo(() => (currentPage - 1) * 9, [currentPage]);
  const prevSlug = useRef(params?.slug);

  const banner = useMemo(() => {
    if (params?.slug) return require(`@/asset/image/place-${params?.slug}.jpeg`)
}, [params?.slug])

const { data: listDataRef, loading, run } = useRequest(() => getArticlesByCategory({ label_name: "全球志業", tag: joomlaGlobal[params?.slug?.toString()]?.tag, limit: 9, offset: pageOffset, ordering: 'created', sort: 'desc' }), {
  refreshDeps: [pageOffset, params?.slug],
  manual: true,
  onSuccess: (res) => {
    setTotalPage(res.meta['total-pages']);
  },
  onError: (err) => {
    console.error(err);
  }
})

useEffect(()=> {
  console.log('prevSlug.current', prevSlug.current)
  console.log('params?.slug', params?.slug)
  console.log('setCurrentPage', params?.slug !== prevSlug.current)
  if (params?.slug && params?.slug !== prevSlug.current) {
    setCurrentPage(1)
  } else if (params?.slug) {
    run()
  }
  prevSlug.current = params?.slug
}, [pageOffset, params?.slug])

// useEffect(()=> {
//   if (params?.slug) {
//     setCurrentPage(1)
//     run()
//   }
// }, [params?.slug])

const listData = useMemo(() => loading ? loadingData : listDataRef?.data || [], [listDataRef, loading]);

  return <Container>
    <FloatScrollTopButton />
    {/* filter options section */}
    <div className="flex flex-col w-full tablet:gap-y-6 gap-y-4">
      {/* breadcrumbs */}
      <Breadcrumb className="tablet:mt-6 mt-4"></Breadcrumb>

      {/* banner image */}
      <div className="w-full">
        {
          banner ?
          <Image
          src={banner}
          alt=""
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }} />:
          <Skeleton className="aspect-[1066/219]" />
        }
      </div>

      {/* result cards */}
      <div className="w-fit flex flex-wrap -mx-3">
        {
          listData.map((item, index) => <PrimaryCard
            item={item?.attributes}
            key={index}
            index={index}
            onClick={()=> {
              router.push(`${routes.ARITCLE}/${item.id}`);
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

