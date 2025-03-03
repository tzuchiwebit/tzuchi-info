"use client"
import Container from "@/shared/layout/Container"
import { useState, useMemo, useEffect, Fragment } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import BannerImage from '@/asset/image/volunteer-morning-meeting.jpeg'
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { getArticlesByCategory } from "@/api/joomlaApi"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import routes from "@/config/routes"
import { addHits } from "@/api/api"
import { useRequest } from 'ahooks';
import Spinner from "@/components/Spinner"

const pageLimit = 9

export default function Page() {
  const [listData, setListData] = useState(Array(pageLimit).fill({
    loading: true
  }))

  const router = useRouter();
  const searchParams = useSearchParams()
  const pathname = usePathname();
  
  const currentPage = useMemo(() => (searchParams.get('p') === null || isNaN(searchParams.get('p'))) ? 1 : parseInt(searchParams.get('p')))
  const [totalPage, setTotalPage] = useState(1);
  const pageOffset = useMemo(() => (currentPage - 1) * pageLimit, [currentPage]);

  useEffect(() => {
    // window.scrollTo(0, 0);
    setListData(Array(pageLimit).fill({
      loading: true
    }))
  }, [currentPage])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Scroll to top on route change

  const { data: listDataRef, loading } = useRequest(() => getArticlesByCategory({ label_name: "志工早會", limit: pageLimit, offset: pageOffset }), {
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
          priority={true}
          alt=""
          sizes="100vw"
          // Make the image display full width
          style={{
            width: '100%',
            height: 'auto',
          }} />
      </div>
      {/* result cards */}
      {
        loading ? <div className="h-[480px] flex justify-center items-center"><Spinner></Spinner></div> :
        <Fragment>
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
              router.push(`/master-talk?p=${index}`)
            }} />
          </div>
        </Fragment>
      }
    </div>

  </Container>
}

