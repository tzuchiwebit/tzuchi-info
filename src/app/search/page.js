"use client"
import Container from "@/shared/layout/Container"
// import { RadioGroup } from '@headlessui/react'
import { useState } from "react"
import RadioBtn from "@/shared/button/RadioBtn"
import SearchInput from "@/shared/input/SearchInput"
import CheckBox from "@/shared/button/CheckBox"
import DatePicker from "@/components/search/DatePicker"

export default function Page() {

  let [searchType, setSearchType] = useState('模糊');
  let [searchText, setSearchText] = useState('歲末祝福');

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

  return <Container>
    <div className="flex pt-[30px] gap-1 mb-3">
      <div className="border-b border-solid border-gray-gray7 h-[42px] w-full" />
      <div className="text-primary-blue1 font-bold text-[30px] w-fit whitespace-nowrap border-b-2 border-solid border-primary-blue1 leading-[37.5px]">
        搜尋結果
      </div>
      <div className="border-b border-solid border-gray-gray7 h-[42px] w-full" />
    </div>
    <div className="w-full flex flex-col gap-4 laptop:gap-10">
      <div className="flex flex-col gap-4">
        <RadioBtn options={options} selectedValue={searchType} onChange={setSearchType} />
        <SearchInput label='檢索詞' onChange={setSearchText} value={searchText} />
      </div>
      <div className="flex flex-col gap-4">
        <CheckBox label='進階' />
        <DatePicker label='日期自' />
      </div>
    </div>
  </Container>
}

