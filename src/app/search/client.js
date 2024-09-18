"use client"
import Container from "@/shared/layout/Container"
// import { RadioGroup } from '@headlessui/react'
import { useEffect, useState, useMemo } from "react"
import SearchInput from "@/shared/input/SearchInput"
// import CheckBox from "@/shared/button/CheckBox"
import PrimaryBtn from "@/shared/button/PrimaryBtn"
import Icon from "@/shared/Icon"
import SearchSelect from "@/shared/input/SearchSelect"
import Pagination from "@/shared/pagination/Pagination"
// import classNames from "@/utils/classNames"
import { useSearchParams } from "next/navigation"
import Highlighter from "react-highlight-words";
import styles from './search.module.css'
import { useRouter } from "next/navigation"
import _ from 'lodash'
import DefaultImage from '@/asset/image/default-article-intro.png'
import { getArticlesByKeyword } from "@/api/joomlaApi"
import { addHits } from "@/api/api"
import routes from "@/config/routes"
import { Linkfont } from "@/shared/styles/linkFont.js"
import * as classnames from "classnames"
const { useRequest } = require('ahooks');

const ResultCard = ({ keyword = "", item = {}, index, isLast = false }) => {
  // console.log(DefaultImage)
  const router = useRouter();

  return <div className="w-full flex gap-1">
    <div className={classnames(
      isLast ? 'border-b-2' : '',
      "max-w-[165px] laptop:max-w-[280px] py-3 laptop:py-8 flex-0 border-t-2 border-solid border-primary-blue1"
    )}>
      <img src={item.images?.image_intro || DefaultImage.src} width={'100%'} className="rounded" />
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
        <Linkfont>{index + 1}. {item.title}</Linkfont>
      </div>
      <div className="mt-1 laptop:mt-4">
        {/* {item.content} */}
        <Highlighter
          highlightClassName={styles.mark}
          unhighlightClassName={styles.content}
          searchWords={[keyword]}
          autoEscape={true}
          textToHighlight={item.metadesc}
        />
      </div>
      <div className="text-gray-gray2 mt-1 laptop:mt-4">
        發表日期：{item.publish_up}
      </div>
    </div>
  </div>
}

const pageSize = 12

export default function Page() {

  const router = useRouter();

  const [searchType, setSearchType] = useState('模糊');
  const [searchText, setSearchText] = useState('');
  const [listOrder, setListOrder] = useState('desc');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');

  const { data, loading, run: runGetArticles } = useRequest((keyword) => {
    if (!keyword) {
      return {
        data: []
      }
    }

    return getArticlesByKeyword({
      keyword: keyword || searchText,
      limit: pageSize,
      offset: pageSize * (currentPage - 1),
    })

  }, {
    // manual: true,
    // ready: !!(searchText),
    refreshDeps: [currentPage],
    onSuccess: (res) => {
      // console.log(res)
      setTotalPage(res.meta['total-pages']);
    }
  })


  const listData = useMemo(() => {
    const _list = data?.data?.map(i => i?.attributes || {}) || []
    return _.orderBy(_list || [], 'publish_up', listOrder);
  }, [data, listOrder])
  // console.log(`listData`)
  // console.log(listOrder)
  // console.log(listData)

  // const keyword = ''

  const options = [
    {
      label: '精確',
      value: '精確',
    },
    {
      label: '模糊',
      value: '模糊',
    }
  ]

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

  // const results = Array(12).fill({
  //   title: '教善導正 合心造福',
  //   content: '【證嚴上人行腳11月13日高雄溫馨座談開示】 「高雄和師父的情，其實是很長，莫忘那一年，莫忘那一人，更重要的也是莫忘那一些事。所以我們大家都共同在做事，大家共同做的事，也都有共同合一個心，所以這個叫做『合』。」 「合」是由一個「人」、一個「一」、一個「口」，組建而成。證嚴上人第一梯次歲末祝福行腳，11月13日於高雄靜思堂與慈誠、委員、慈青進行溫馨座談，透過「合」字的組合，提醒所有慈濟志工要「合心」。 【證嚴上人行腳11月13日高雄溫馨座談開示】 「高雄和師父的情，其實是很長，莫忘那一年，莫忘那一人，更重要的也是莫忘那一些事。所以我們大家都共同在做事，大家共同做的事，也都有共同合一個心，所以這個叫做『合』。」 「合」是由一個「人」、一個「一」、一個「口」，組建而成。證嚴上人第一梯次歲末祝福行腳，11月13日於高雄靜思堂與慈誠、委員、慈青進行溫馨座談，透過「合」字的組合，提醒所有慈濟志工要「合心」。 ',
  //   date: '2014/12/22',
  //   image: 'https://picsum.photos/280/180',
  // });

  useEffect(() => {
    if (keyword) {
      setSearchText(keyword)
      runGetArticles(keyword)
    }
  }, [keyword])


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
        {/* <RadioBtn options={options} selectedValue={searchType} onChange={setSearchType} /> */}
        <SearchInput
          className="laptop:max-w-[540px]"
          label='檢索詞'
          onChange={setSearchText}
          value={searchText}
        />
      </div>
      {/* <div className="flex flex-col gap-4">
        <AdvanceSearch />
        <DatePicker label='日期自' />
      </div> */}
    </div>
    <div className="mt-5 laptop:mt-10">
      <PrimaryBtn className={classnames(loading && 'disabled')} disabled={loading} onClick={() => {
        // runGetArticles(searchText)
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
          搜尋結果 - 共 {listData.length} 筆
        </div>
        <div className="font-bold w-full laptop:w-[340px] max-w-[480px]">
          <SearchSelect sm label={'排序 : '} onChange={(e) => setListOrder(e)} options={resultOrderOptions} />
        </div>
      </div>
      {/* result list */}
      <div className="mt-5">
        {
          listData.map((item, index) => <ResultCard
            keyword={searchText}
            key={index}
            item={item}
            index={index + ((currentPage - 1) * pageSize)}
            isLast={(index + 1) % pageSize === 0}
          />)
        }
      </div>
    </div>
    <div className="my-8 laptop:mb-0">
      <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={(e) => {
        setCurrentPage(e);
        window.scrollTo({
          top: 100,
          behavior: "smooth",
        });
      }} />
    </div>
  </Container>
}

