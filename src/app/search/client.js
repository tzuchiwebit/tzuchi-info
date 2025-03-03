"use client"
import Container from "@/shared/layout/Container"
import { useEffect, useState, useMemo, Fragment } from "react"
import SearchInput from "@/shared/input/SearchInput"
import PrimaryBtn from "@/shared/button/PrimaryBtn"
import Icon from "@/shared/Icon"
import SearchSelect from "@/shared/input/SearchSelect"
import Pagination from "@/shared/pagination/Pagination"
import { useRouter, useSearchParams } from "next/navigation"
import Highlighter from "react-highlight-words";
import styles from './search.module.css'
import _ from 'lodash'
import DefaultImage from '@/asset/image/default-article-intro.png'
import { getArticlesByKeyword } from "@/api/joomlaApi"
import { addHits } from "@/api/api"
import routes from "@/config/routes"
import { Linkfont } from "@/shared/styles/linkFont.js"
import classnames from "classnames"
import { useRequest } from 'ahooks';
import Spinner from "@/components/Spinner"

const ResultCard = ({ keyword = "", item = {}, index, isLast = false }) => {
  const router = useRouter();

  return <div className="w-full flex gap-1">
    <div className={classnames(
      isLast ? 'border-b-2' : '',
      "max-w-[165px] laptop:max-w-[280px] py-3 laptop:py-8 flex-0 border-t-2 border-solid border-primary-blue1"
    )}>
      <img src={item?.attributes?.images?.image_intro || DefaultImage.src} width={'100%'} className="rounded" />
    </div>
    <div className={classnames(
      isLast ? 'border-b' : '',
      "py-3 laptop:py-8 pl-2 pr-0 laptop:px-4 flex-1 border-t border-solid border-gray-gray7 flex flex-col"
    )}>
      <div
        className="text-lg laptop:text-2xl font-bold text-primary-blue1 line-clamp-1 cursor-pointer"
        onClick={() => {
          addHits(item.id);
          router.push(`${routes.ARITCLE}/${item.id}`);
        }}>
        <Linkfont>{index + 1}. {item?.attributes?.title}</Linkfont>
      </div>
      <div className="mt-1 laptop:mt-4">
        {/* {item.content} */}
        <Highlighter
          highlightClassName={styles.mark}
          unhighlightClassName={styles.content}
          searchWords={[keyword]}
          autoEscape={true}
          textToHighlight={item?.attributes?.metadesc}
        />
      </div>
      <div className="text-gray-gray2 mt-1 laptop:mt-4">
        發表日期：{item?.attributes?.publish_up}
      </div>
    </div>
  </div>
}

const pageLimit = 12

export default function Page() {
  const [listData, setListData] = useState([])

  const router = useRouter();
  const searchParams = useSearchParams()

  const keyword = searchParams.get('keyword');
  const currentPage = useMemo(() => (searchParams.get('p') === null || isNaN(searchParams.get('p'))) ? 1 : parseInt(searchParams.get('p')))
  const [totalPage, setTotalPage] = useState(1);
  const pageOffset = useMemo(() => (currentPage - 1) * pageLimit, [currentPage]);

  const [searchText, setSearchText] = useState('');
  const [listOrder, setListOrder] = useState('desc');

  useEffect(() => {
    window.scrollTo(0, 0);
    setListData(Array(0).fill({
      loading: true
    }))
  }, [currentPage])

  const { data, loading, run } = useRequest(() => getArticlesByKeyword({ keyword: keyword, limit: pageLimit, offset: pageOffset, sorting:  listOrder}), {
    manual: true,
    refreshDeps: [pageOffset],
    onSuccess: async (res) => {
      setListData(res.data)
      setTotalPage(res.meta['total-pages']);
    },
    onError: (err) => {
      console.error(err);
    }
  })

  const resultOrderOptions = [
    {
      label: '日期較新',
      value: 'desc',
    },
    {
      label: '日期較舊',
      value: 'asc',
    }
  ]

  useEffect(() => {
    if (!!keyword) {
      setSearchText(keyword)
      run(keyword)
    }
  }, [keyword, currentPage, listOrder])

  return <Container>
    {/* filter options section */}
    <div className="flex pt-[30px] gap-1 mb-3">
      <div className="border-b border-solid border-gray-gray7 h-[42px] w-full" />
      <div className="text-primary-blue1 font-bold text-[30px] w-fit whitespace-nowrap border-b-2 border-solid border-primary-blue1 leading-[37.5px]">
        搜尋結果
      </div>
      <div className="border-b border-solid border-gray-gray7 h-[42px] w-full" />
    </div>
    <div className="w-full flex flex-col gap-4 laptop:gap-10">
      <div className="flex flex-col gap-4">
        <SearchInput
          className="laptop:max-w-[540px]"
          label='檢索詞'
          onChange={setSearchText}
          value={searchText}
        />
      </div>
    </div>
    <div className="mt-5 laptop:mt-10">
      <PrimaryBtn className={classnames(loading && 'disabled')} disabled={loading} onClick={() => {
        router.push(`/search?keyword=${searchText}`)
      }}>
        <Icon.Search style={{ width: 28 }} /> 搜尋
      </PrimaryBtn>
    </div>
    {/* result section */}
    <div className="mt-10 w-full">
      {/* result summary */}
      <div className="flex flex-col tablet:flex-row justify-between items-start tablet:items-center gap-3">
        <div className="font-bold text-lg w-full">
          搜尋結果&nbsp;-&nbsp;
          {
            listData?.length === 0 ? '共 0 筆' : `第 ${currentPage} / ${totalPage} 頁`
          }
        </div>
        <div className="font-bold w-full laptop:w-[340px] max-w-[480px]">
          <SearchSelect sm label={'排序 : '} onChange={(e) => setListOrder(e)} options={resultOrderOptions} />
        </div>
      </div>
    </div>
    {/* result list */}
    {
      loading ? <div className="h-[480px] flex justify-center items-center"><Spinner></Spinner></div> :
      <Fragment>
          <div className="mt-5">
            {
              listData.map((item, index) => <ResultCard
                keyword={keyword}
                key={index}
                item={item}
                index={index + ((currentPage - 1) * pageLimit)}
                isLast={(index + 1) % pageLimit === 0}
              />)
            }
          </div>
        <div className="my-8 laptop:mb-0">
          <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={(index) => {
            router.push(`/search?keyword=${keyword}&p=${index}`)
          }} />
        </div>
      </Fragment>
    }
  </Container>
}

