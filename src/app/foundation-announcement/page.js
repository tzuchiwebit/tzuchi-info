"use client"
import Container from "@/shared/layout/Container"
// import { RadioGroup } from '@headlessui/react'
import { useEffect, useState } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import BannerImage from '@/asset/image/volunteer-morning-meeting.jpeg'
import Image from 'next/image'
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

  const testData = Array(12).fill({
    date: '2024-01-29',
    content: '112年「大愛共善 救拔苦難」募得款及使用情形成果報告'
  })

  // console.log(`testData`)
  // console.log(testData)


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
              label: '認識慈濟',
              link: ''
            },
            {
              label: '公益勸募',
              link: ''
            },
          ]} />
      </div>
      <div className="w-full flex flex-wrap mt-5">
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
              testData.map((item, index) => <tr key={index} className="font-medium text-gray-gray2">
                <td className="border border-gray-gray4 border-solid py-2 px-1 whitespace-nowrap">
                  {item.date}
                </td>
                <td className="border border-gray-gray4 border-solid py-2 px-1">
                  {item.content}
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
      <div className="w-full">
        <Pagination currentPage={currentPage} totalPage={5} onPageChange={setCurrentPage} />
      </div>
    </div>

  </Container>
}

