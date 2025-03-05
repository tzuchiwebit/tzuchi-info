"use client"
import Container from "@/shared/layout/Container"
import { useState, useMemo, useEffect, Fragment } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import BannerImage from '@/asset/image/activities-banner.jpeg'
import { BannerTitle } from "@/components/home/components"
import Image from 'next/image'
import PrimaryActivityCard from "@/shared/card/PrimaryActivityCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { getArticlesByCategory, getUserById } from "@/api/joomlaApi"
import { useRouter, useSearchParams } from "next/navigation"
import routes from "@/config/routes"
import { addHits } from "@/api/api"
import Icon from "@/shared/Icon"
import { useRequest } from 'ahooks';
import Spinner from "@/components/Spinner"

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

  const { data: listDataRef, loading } = useRequest(() => getArticlesByCategory({ label_name: "熱門活動", limit: pageLimit, offset: pageOffset }), {
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
      {/* <BannerTitle title="活動點位地圖" /> */}
      <BannerTitle title="活動資訊" />
      {
        loading ? <div className="h-[240px] flex justify-center items-center"><Spinner></Spinner></div> :
        <Fragment>
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
              router.push(`/activities?p=${index}`)
            }} />
          </div>
        </Fragment>
      }
    </div>

  </Container>
}

