"use client"
import Container from "@/shared/layout/Container"
import _ from 'lodash'
// import { RadioGroup } from '@headlessui/react'
import { useEffect, useState } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import BannerImage from '@/asset/image/the-base-messages.png'
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import dayjs from "dayjs"
import Icon from "@/shared/Icon"
import { BannerTitle } from "@/components/home/components"
import color from "@/shared/styles/color"
import styled from "styled-components"
import joomlaGlobal from '@/api/joomlaGlobal'

export default function Page() {

  const [currentPage, setCurrentPage] = useState(1);


  const resultsTW = Array(5).fill({
    title: '文字文字文字文字文字文字文文字文字文字文字文字文字文文字文字文字文字文字文字文字文文字文字文字文字文字文字文文字文字文字文字文字文字文字文文字文字文字文字文字文字文文字',
    link: '',
    place: 'taiwan',
  });

  const resultsAsia = Array(5).fill({
    title: '文字文字文字文字文字文字文文字文字文字文字文字文字文文字',
    link: '',
    place: 'asia',
  });
  const resultsAmerica = Array(5).fill({
    title: '文字文字文字文字文字文字文文字文字文字文字文字文字文文字',
    link: '',
    place: 'america',
  });
  const resultsEurope = Array(5).fill({
    title: '文字文字文字文字文字文字文文字文字文字文字文字文字文文字',
    link: '',
    place: 'europe',
  });
  const resultsAfrica = Array(5).fill({
    title: '文字文字文字文字文字文字文文字文字文字文字文字文字文文字',
    link: '',
    place: 'africa',
  });
  const resultsOceania = Array(5).fill({
    title: '文字文字文字文字文字文字文文字文字文字文字文字文字文文字',
    link: '',
    place: 'oceania',
  });

  const testData = _.chain(resultsTW).concat(resultsAmerica, resultsAsia, resultsEurope, resultsAfrica, resultsOceania).groupBy('place').value()

  // console.log(`testData`)
  // console.log(testData)

  const SiteCard = ({ item, place }) => {

    return <div className="w-full tablet:w-1/2 laptop:w-1/3 px-3 mb-6">
      <div className="bg-white border rounded-[4px] p-5 shadow-elevation-3 flex flex-col gap-2">
        <BannerTitle title={joomlaGlobal[place]?.label} link={joomlaGlobal[place]?.link} />
        <div className="text-primary-blue1 font-bold text-xl">
          {item.title}
        </div>
        <div className="flex flex-col">
          {
            item.map((i, _index) => (<div key={_index} className="border-b border-solid border-gray-gray8 py-2 cursor-pointer flex items-center">
              <div className="text-primary-blue1 text-xl font-bold line-clamp-2 ">
                {i.title}
              </div>


              {
                _index === 0 ? <div className="pl-5">
                  <IsNewTag><span className="absolute -left-[5px] text-complementary-pink z-0">◄</span>NEW</IsNewTag>
                </div> : <></>
              }
            </div>))
          }
        </div>
      </div>
    </div>
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
              label: '全球志業',
              link: ''
            },
          ]} />
      </div>
      {/* banner image */}
      <div className="w-full">
        <Image
          src={BannerImage}
          alt=""
          sizes="100vw"
          // Make the image display full width
          style={{
            width: '100%',
            height: 'auto',
          }} />
      </div>
      {/* result cards */}
      <div className="w-auto flex flex-wrap -mx-3">
        {
          Object.keys(testData).map((item, index) => <SiteCard place={item} item={testData[item]} key={index} />)
        }
      </div>
    </div>

  </Container>
}

const IsNewTag = styled.div`
  position: relative;
  background-color: ${color.complementary.pink};
  padding-left: 5px;
  padding-right: 5px;
  color: white;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
`
