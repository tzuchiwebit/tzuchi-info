"use client"
import Container from "@/shared/layout/Container"
import { useState, useMemo, useEffect, Fragment } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { useRouter, useSearchParams } from "next/navigation"
import { getArticlesByCategory } from "@/api/joomlaApi"
import routes from "@/config/routes"
import dayjs from "dayjs"
import Spinner from "@/components/Spinner"
import { addHits } from "@/api/api";
import { useRequest } from 'ahooks';

const categoryName = '基金會公告'

export default function Page() {
  const pageLimit = 10
  const [listData, setListData] = useState(Array(pageLimit).fill({
    loading: true
  }))

  const router = useRouter();
  const searchParams = useSearchParams()

  const currentPage = useMemo(() => (searchParams.get('p') === null || isNaN(searchParams.get('p'))) ? 1 : parseInt(searchParams.get('p')))
  const [totalPage, setTotalPage] = useState(0);
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

  const { loading } = useRequest(() => getArticlesByCategory({ label_name: categoryName, limit: pageLimit, offset: pageOffset }), {
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
              label: categoryName,
              link: ''
            },
          ]} />
      </div>
      <div className="w-full flex flex-wrap mt-5 relative">
        {
          loading &&
          <div className="absolute" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}><Spinner></Spinner></div>
        }
        <table className="w-full border-collapse tablet:text-center">
          <thead>
            <tr className="text-xl font-bold text-primary-blue1 bg-complementary-blue2">
              <th className="border border-gray-gray4 border-solid py-2 px-1 whitespace-nowrap">
                時間
              </th>
              <th className="border border-gray-gray4 border-solid py-2 px-1">
                公告事項
              </th>
            </tr>
          </thead>
          <tbody>
            {
              listData.map((item, index) => <tr key={index} className="font-medium text-gray-gray2  h-[41px]">
                <td className="border border-gray-gray4 border-solid py-2 px-1 whitespace-nowrap laptop:w-40">
                  {
                    item?.attributes?.created && dayjs(item?.attributes?.created).format('YYYY-MM-DD')
                  }
                </td>
                <td className="border border-gray-gray4 border-solid py-2 px-1 text-center">
                  <div className="font-medium text-primary-blue1 flex-1 line-clamp-2 cursor-pointer hover:text-primary-blue2"
                    onClick={() => {
                      onPageHit(item.id)
                  }}>{item?.attributes?.title}</div>
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
      {
        totalPage > 0 &&
        <div className="w-full">
          <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={(index) => {
            router.push(`/foundation-announcement?p=${index}`)
          }} />
        </div>
      }
    </div>

  </Container>
}

