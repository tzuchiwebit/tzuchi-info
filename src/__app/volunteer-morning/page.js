"use client"
import Container from "@/shared/layout/Container"
// import { RadioGroup } from '@headlessui/react'
import { useEffect, useState } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import BannerImage from '@/asset/image/volunteer-morning-meeting.jpeg'
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"

export default function Page() {

  const [currentPage, setCurrentPage] = useState(1);


  const results = Array(12).fill({
    title: '教善導正 合心造福',
    content: '【證嚴上人行腳11月13日高雄溫馨座談開示】 「高雄和師父的情，其實是很長，莫忘那一年，莫忘那一人，更重要的也是莫忘那一些事。所以我們大家都共同在做事，大家共同做的事，也都有共同合一個心，所以這個叫做『合』。」 「合」是由一個「人」、一個「一」、一個「口」，組建而成。證嚴上人第一梯次歲末祝福行腳，11月13日於高雄靜思堂與慈誠、委員、慈青進行溫馨座談，透過「合」字的組合，提醒所有慈濟志工要「合心」。 【證嚴上人行腳11月13日高雄溫馨座談開示】 「高雄和師父的情，其實是很長，莫忘那一年，莫忘那一人，更重要的也是莫忘那一些事。所以我們大家都共同在做事，大家共同做的事，也都有共同合一個心，所以這個叫做『合』。」 「合」是由一個「人」、一個「一」、一個「口」，組建而成。證嚴上人第一梯次歲末祝福行腳，11月13日於高雄靜思堂與慈誠、委員、慈青進行溫馨座談，透過「合」字的組合，提醒所有慈濟志工要「合心」。 ',
    date: '2014/12/22',
    image: 'https://picsum.photos/280/180',
    author: '顏博文 執行長'
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
              label: '志工早會',
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
      <div className="w-fit flex flex-wrap -mx-3">
          {
            results.map((item, index) => <PrimaryCard item={item} key={index} index={index} />)
          }
      </div>
      <div className="w-full">
        <Pagination currentPage={currentPage} totalPage={5} onPageChange={setCurrentPage} />
      </div>
    </div>

  </Container>
}

