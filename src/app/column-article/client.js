"use client"
import Container from "@/shared/layout/Container"
import { useState, useMemo, useEffect, Fragment } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import BannerImage from '@/asset/image/column-article.png'
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import classNames from "@/utils/classNames"
import Icon from "@/shared/Icon"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { getArticlesByCategory, getUserById } from "@/api/joomlaApi"
import { useRouter, useSearchParams } from "next/navigation"
import { addHits } from "@/api/api"
import routes from "@/config/routes"
import { useRequest } from 'ahooks';
import Spinner from "@/components/Spinner"

const tabs = [
  {
    label: '領航慈濟',
    icon: <Icon.Lotus style={{ width: 32 }} />
  },
  {
    label: '名人視角',
    icon: <Icon.Global style={{ width: 32 }} />
  },
]

export default function Page() {
  const pageLimit = 9;
  const [listData, setListData] = useState(Array(pageLimit).fill({
    loading: true
  }))

  const router = useRouter();
  const searchParams = useSearchParams()

  const activeTab = useMemo(() => (searchParams.get('t') === null || isNaN(searchParams.get('t'))) ? 0 : parseInt(searchParams.get('t')))
  const currentPage = useMemo(() => (searchParams.get('p') === null || isNaN(searchParams.get('p'))) ? 1 : parseInt(searchParams.get('p')))
  const [totalPage, setTotalPage] = useState(1);
  const pageOffset = useMemo(() => (currentPage - 1) * pageLimit, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setListData(Array(pageLimit).fill({
      loading: true
    }))
  }, [currentPage, activeTab])

  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  const { data: columnArticlesData, loading } = useRequest(() => getArticlesByCategory({
    label_name: `專欄文章-${tabs[activeTab].label}`,
    limit: pageLimit,
    offset: pageOffset,
    tag: activeTab === 0 ? 1486 : 1487
  }), {
    refreshDeps: [activeTab, currentPage],
    onSuccess: async(res) => {
      setListData(res.data)
      setTotalPage(res.meta['total-pages']);
    },
    onError: (err) => {
      console.error(err);
    }
  });


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
              label: '專欄文章',
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
        {/* tab button */}
        <div className="w-full flex flex-col tablet:flex-row -mt-[1px]">
          {
            tabs.map((item, index) => <button
              key={index}
              onClick={() => {
                router.push(`/column-article?p=1&t=${index}`)
              }}
              className={classNames(
                activeTab === index ? 'bg-primary-blue1 text-white' : 'bg-gray-gray9 text-primary-blue1',
                `flex items-center justify-center gap-2 py-2 px-3 font-bold text-lg tablet:text-[26px] leading-8 hover:bg-primary-blue1 hover:text-white transition-all w-full tablet:w-1/2`
              )}>
              {item.icon}{item.label}
            </button>)
          }

        </div>
      </div>
      {/* result cards */}
      {
        loading ? <div className="h-[480px] flex justify-center items-center"><Spinner></Spinner></div> :
        <Fragment>
          <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 gap-x-5 gap-y-6">
            {
              listData.map((item, index) => <PrimaryCard item={item?.attributes} key={index} index={index} onClick={() => {
                router.push(`${routes.ARITCLE}/${item.id}`);
                addHits(item.id);
              }} />)
            }
          </div>
          <div className="w-full">
            <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={(index) => {
              router.push(`/column-article?p=${index}&t=${activeTab}`)
            }} />
          </div>
        </Fragment>
      }
    </div>

  </Container>
}

