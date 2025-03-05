"use client"
import Container from "@/shared/layout/Container"
import { useState, useMemo, useEffect, useRef } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import Skeleton from "react-loading-skeleton"
import joomlaGlobal from '@/api/joomlaGlobal'
import { getArticlesByCategory } from "@/api/joomlaApi"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import routes from "@/config/routes"
import { useRequest } from 'ahooks';
import Spinner from "@/components/Spinner"

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
  const pageLimit = 9
  const [listData, setListData] = useState(Array(0).fill({
    loading: true
  }))

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams()

  const prevSlug = useRef(params?.slug);
  const currentPage = useMemo(() => (searchParams.get('p') === null || isNaN(searchParams.get('p'))) ? 1 : parseInt(searchParams.get('p')))
  const [totalPage, setTotalPage] = useState(0);
  const pageOffset = useMemo(() => (currentPage - 1) * pageLimit, [currentPage]);

  const banner = useMemo(() => {
    if (params?.slug) return require(`@/asset/image/place-${params?.slug}.jpeg`)
  }, [params?.slug])

  useEffect(() => {
    window.scrollTo(0, 0);
    setListData(Array(0).fill({
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

  const { data: listDataRef, loading, run } = useRequest(() => getArticlesByCategory({ label_name: "全球志業", tag: joomlaGlobal[params?.slug?.toString()]?.tag, limit: pageLimit, offset: pageOffset, ordering: 'created', sort: 'desc' }), {
    refreshDeps: [pageOffset, params?.slug],
    manual: true,
    onSuccess: async (res) => {
      setListData(res.data)
      setTotalPage(res.meta['total-pages']);
    },
    onError: (err) => {
      console.error(err);
    }
  })

  useEffect(()=> {
    if (params?.slug && params?.slug !== prevSlug.current) {
      router.push(`/global/${params.slug}`)
    }
    if (params?.slug) {
      run()
    }
    prevSlug.current = params?.slug
  }, [pageOffset, params?.slug])

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
          priority={true}
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
      {
        loading ? <div className="h-[480px] flex justify-center items-center"><Spinner></Spinner></div> :
          <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 gap-x-5 gap-y-6">
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
      }

      {/* pagination */}
      {
        totalPage > 0 &&
        <div className="w-full">
          <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={(index) => {
            router.push(`/global/${params.slug}?p=${index}`)
          }} />
        </div>
      }
    </div>

  </Container>
}

