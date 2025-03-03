"use client"
import Container from "@/shared/layout/Container"
import { useState, useMemo, useEffect, Fragment } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { getExtendArticles } from "@/api/joomlaApi"
import { useRouter, useSearchParams } from "next/navigation"
import routes from "@/config/routes"
import { addHits } from "@/api/api"
import axios from "axios"
import Skeleton from "react-loading-skeleton"
import { useRequest } from 'ahooks';
import Spinner from "@/components/Spinner"
import useScreenSize from '@/shared/hook/useScreenSize';

export default function Page() {
  const pageLimit = 9
  const [listData, setListData] = useState(Array(pageLimit).fill({
    loading: true
  }))

  const router = useRouter();
  const searchParams = useSearchParams()
  
  const currentPage = useMemo(() => (searchParams.get('p') === null || isNaN(searchParams.get('p'))) ? 1 : parseInt(searchParams.get('p')))
  const [totalPage, setTotalPage] = useState(1);
  const pageOffset = useMemo(() => (currentPage - 1) * pageLimit, [currentPage]);
  const screenSize = useScreenSize();

  useEffect(() => {
    window.scrollTo(0, 0);
    setListData(Array(pageLimit).fill({
      loading: true
    }))
  }, [currentPage])

  // 吉祥月api,
  const { data: auspiciousMonthData, loading: loadingAuspiciousData } = useRequest(() => {
    return axios.get(`https://raw.githubusercontent.com/KaelLim/JSONFile/main/%E4%B8%83%E6%9C%88%E5%90%89%E7%A5%A5%E6%9C%88/api.json`);
  })

  const articleTagId = useMemo(() => auspiciousMonthData?.data?.article?.[0]?.tag_id, [auspiciousMonthData]);
  const bannerImage = useMemo(() => auspiciousMonthData?.data?.banner?.[0]?.img_bg_desktop, [auspiciousMonthData]);
  const bannerImageMobile = useMemo(() => auspiciousMonthData?.data?.banner?.[0]?.img_bg_mobile, [auspiciousMonthData]);

  const { data: listDataRef, loading } = useRequest(() => getExtendArticles([articleTagId], pageLimit, pageOffset), {
    refreshDeps: [pageOffset],
    ready: !!(articleTagId),
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
            src={screenSize?.width >= 768 ? bannerImage : bannerImageMobile}
            priority={true}
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
      {
        (loading || loadingAuspiciousData) ? <div className="h-[240px] flex justify-center items-center"><Spinner></Spinner></div> :
        <Fragment>
          <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 gap-x-5 gap-y-6">
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
              router.push(`/auspicious-month?p=${index}`)
            }} />
          </div>
        </Fragment>
      }
    </div>

  </Container>
}

