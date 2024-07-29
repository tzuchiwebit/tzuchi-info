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

  return (
    <InnerContainer>
      <CalendarContainer>
        <MessageContainer>
          <div className="flex flex-col px-2 gap-y-0 border-solid border-gray-gray8 border-r">
            <div className="font-bold text-base w-fit">
              {date.dateUpper}
            </div>
            <div className="font-bold text-[40px] leading-none w-auto text-center">
              {date.dateLower}
            </div>
          </div>
          <div className="pl-2 pt-1 font-bold text-[19px] flex flex-col">
            <span>世代輪轉</span>
            <span>法脈接續</span>
          </div>
        </MessageContainer>
        <BackgroundContainer style={{ backgroundImage: `url(/bgImage/bg-roof.svg)`, backgroundRepeat: 'no-repeat' }}></BackgroundContainer>
      </CalendarContainer>
    </InnerContainer>
  )
}

const InnerContainer = styled.div`
  width: 180px
  display: flex;
  flex-direction: column;
  border: 4px solid ${color.gray.gray8};
  color: ${color.primary.blue1};
  // height: 180px;
  padding: 4px;
`

const BackgroundContainer = styled.div`
  width: 161px;
  height: 101px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 30% 30px;

  @media(min-width: ${screens.tablet}) {
    width: 432px;
    background-position: 20% 0;
  }

  @media(min-width: ${screens.laptop}) {
    width: 310px;
    background-position: 20% 10px;
  }

  @media(min-width: ${screens.desktop}) {
    width: 100%;
    height: 78px;
    background-position: 24% 0;
  }
`

const MessageContainer = styled.div`
  flex-grow: 1;
  // display: grid;
  // grid-template-columns: 48% 52%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-top: 18px;
  @media(min-width: ${screens.desktop}) {
    padding-top: unset;
  }
`

const CalendarContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
  column-gap: 10px;

  @media(min-width: ${screens.desktop}) {
    flex-direction: column;
    row-gap: 4px;
    height: 164px;
    padding-top: 16px;
    padding-left: unset;
    padding-right: unset;
  }
`
