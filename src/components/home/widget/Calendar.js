'use client'
import { useState, useEffect } from "react"
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import dayjs from "dayjs"
import { OuterContainer } from "./container"
import _ from 'lodash'

export default function Calendar() {
  const [date, setDate] = useState({});

  useEffect(() => {
    setDate({
        dateUpper: dayjs().format('YYYY.MM'),
        dateLower: dayjs().format('DD'),
    })
  }, []);

  return <OuterContainer className="hidden desktop:block">
    <InnerContainer>
      <CalendarContainer style={{ backgroundImage: `url(/bgImage/bg-roof.svg)` }}>
        <div className="w-[48%] border-solid border-gray-gray8 border-r justify-center flex h-fit laptop:justify-end">
          <div className="flex flex-col justify-center w-fit pr-1 laptop:text-right laptop:pr-2 desktop:text-center desktop:pr-1">
            <div className="font-semibold text-lg w-fit leading-normal tablet:leading-5">
                {date.dateUpper}
            </div>
            <div className="font-semibold text-[40px] leading-none w-auto text-center">
                {date.dateLower}
            </div>
          </div>
        </div>
        <div className="w-[52%] flex flex-col h-fit text-lg laptop:text-xl whitespace-nowrap justify-center">
          <div className="font-semibold text-center laptop:text-left laptop:pl-2 desktop:text-center desktop:pl-0 leading-7 tracking-normal pt-1">
              世代輪轉<br />
              法脈接續
          </div>
        </div>
      </CalendarContainer>
    </InnerContainer>
  </OuterContainer>
}

const InnerContainer = styled.div`
    width: 180px
    display: flex;
    flex-direction: column;
    border: 4px solid ${color.gray.gray8};
    color: ${color.primary.blue1};
    height: 180px;
    padding: 4px;
`

const CalendarContainer = styled.div`
    background-repeat: no-repeat;
    display: flex;
    padding-top: 8px;
    background-size: 150%;
    background-position: -10px 100%;
    width: 100%;
    height: 160px;
    @media(min-width: ${screens.laptop}) {
        padding-top: 8px;
        flex-direction: row;
        height: 135px;
        background-size: 100%;
        background-position: -30px 110%;
    }
    @media(min-width: ${screens.desktop}) {
        min-height: 165px;
        padding-top: 16px;
        padding-left: unset;
        padding-right: unset;
        background-size: 200%;
        background-position: -45px 100%;
    }
`
