"use client"
import Container from "@/shared/layout/Container"
import { useState, useMemo, useEffect, Fragment } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { getArticles } from "@/api/joomlaApi"
import { useRouter, useSearchParams } from "next/navigation"
import routes from "@/config/routes"
import { addHits } from "@/api/api"
import Icon from "@/shared/Icon"
import DefaultImage from '@/asset/image/default-article-intro.png'
import { useRequest } from 'ahooks';
import Spinner from "@/components/Spinner"

export default function Page({ tagInfo }) {
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

  const imageIntro = useMemo(()=> {
    if (!!tagInfo?.images?.image_intro) {
      if (tagInfo?.images?.image_intro?.indexOf("images") > -1) {
        return `${process.env.NEXT_PUBLIC_CMS_URL}/${tagInfo?.images?.image_intro}`
      }
      return tagInfo?.images?.image_intro
    }
    return null
  }, [tagInfo?.images?.image_intro])

  const { data: listDataRef, loading } = useRequest(() => getArticles({ tag: tagInfo?.id, limit: pageLimit, offset: pageOffset }), {
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
    <div className="flex w-full flex-col gap-y-6">
      {/* breadcrumbs */}
      <div className="flex gap-1 tablet:mt-6 mt-4">
        <PrimaryBreadcrumb
          items={[
            {
              label: '首頁',
              link: '/'
            },
            {
              label: tagInfo?.title,
              link: ''
            },
          ]} />
      </div>

      {/* banner image */}
      <div className="w-full desktop:h-[238px] laptop:h-[282px] grid desktop:grid-cols-[455px_1fr] laptop:grid-cols-[539px_1fr] grid-cols-1">
        <div className="relative tablet-only:w-auto tablet-only:h-[350px] tablet-down:w-auto tablet-down:h-[165px]">
          <Image
            src={imageIntro ? imageIntro : DefaultImage}
            priority={true}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="h-full w-full bg-[#E0E0E066] laptop:p-6 tablet:p-4 p-2 flex flex-col">
          <div className="flex flex-row items-center gap-x-2">
            <div style={{transform: 'rotate(180deg)'}}><Icon.Quotation width="24px" height="24px"/></div>
            <div className="border-b border-solid border-primary-blue1 w-full"></div>
          </div>
          <div className="grow laptop:py-4 py-2 px-2 flex flex-col gap-y-[6px]">
            <span className="font-bold text-primary-blue1 text-[30px]">{tagInfo?.title}</span>
            <div className="text-gray-gray2 text-base desktop:line-clamp-3 desktop:h-[4.5rem] laptop:line-clamp-4 laptop:h-[6rem] break-all">
              {tagInfo?.metadesc}
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <div className="border-b border-solid border-primary-blue1 w-full"></div>
            <Icon.Quotation width="24px" height="24px"/>
          </div>
        </div>
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

          {/* pagination */}
          <div className="w-full">
            <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={(index) => {
              router.push(`/tag/${tagInfo.id}?p=${index}`)
            }} />
          </div>
        </Fragment>
      }
    </div>

  </Container>
}

