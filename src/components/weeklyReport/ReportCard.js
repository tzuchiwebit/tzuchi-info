"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import WeeklyReportImg from '@/asset/image/weekly-report.png'
import Icon from "@/shared/Icon"
import screens from "@/shared/styles/screens";
import * as classnames from "classnames"
import useScreenSize from '@/shared/hook/useScreenSize';

const StyledImage = styled.div`
  position: relative;
  width: 90px;
  height: 120px;
  // background-image: url("https://picsum.photos/id/49/900");
  background-image: url(${WeeklyReportImg.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: -6px 0px 42px -6px rgba(0,0,0,0.6);
  @media(min-width: ${screens.tablet}) {
    width: 220px;
    height: 300px;
  }
  @media(min-width: ${screens.laptop}) {
    width: 180px;
    height: 240px;
  }
  @media(min-width: ${screens.desktop}) {
    width: 160px;
    height: 220px;
  }
`
const SyledFirstTriangle = styled.div`
  width: 66px;
  height: 51px;
  background: linear-gradient(to top left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, #717071 50%, #717071 100%);
  display: flex;
  flex-direction: column;
  &.happy {
    background: linear-gradient(to top left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, #83483D 50%, #83483D 100%);
  }
  @media(min-width: ${screens.tablet}) {
    width: 150px;
    height: 115px;
  }
  @media(min-width: ${screens.laptop}) {
    width: 123px;
    height: 94px;
  }
  @media(min-width: ${screens.desktop}) {
    width: 114px;
    height: 87px;
  }
`

const StyledDate = styled.span`
  color: #fff;
  padding-left: 2px;
  font-size: 6px;
  font-weight: 400;
  line-height: 6.9px;
  @media(min-width: ${screens.tablet}) {
    padding-left: 4px;
    font-size: 13.56px;
    font-weight: 400;
    line-height: 15.6px;
  }
  @media(min-width: ${screens.laptop}) {
    padding-left: 3px;
    font-size: 11.11px;
    font-weight: 400;
    line-height: 12.77px;
  }
  @media(min-width: ${screens.desktop}) {
    padding-left: 3px;
    font-size: 10.3px;
    font-weight: 400;
    line-height: 11.85px;
  }
`
const StyledPeriod = styled.span`
  color: #fff;
  font-size: 12.34px;
  font-weight: 400;
  line-height: 14.93px;
  @media(min-width: ${screens.tablet}) {
    font-size: 27.9px;
    font-weight: 400;
    line-height: 33.76px;
  }
  @media(min-width: ${screens.laptop}) {
    font-size: 22.85px;
    font-weight: 400;
    line-height: 27.65px;
  }
  @media(min-width: ${screens.desktop}) {
    font-size: 21.19px;
    font-weight: 400;
    line-height: 25.65px;
  }
`

const Badge = ({isHappy}) => {
  return (
    <div className="absolute -left-3 top-4">
      <SyledFirstTriangle className={classnames(isHappy && 'happy')}>
        <div className="flex flex-col -mt-[2px]" style={{transform: 'rotate(-36.29deg)'}}>
          <StyledDate>2023.03.03</StyledDate>
          <StyledPeriod>第3期</StyledPeriod>
        </div>
      </SyledFirstTriangle>
      <div style={{marginTop: "-10px"}}>
        <Icon.Triangle />
      </div>
    </div>
  )
}
export default function ReportCard({isHappy}) {
  const screenSize = useScreenSize();
  const [isDesktop, setIsDesktop] = useState(screenSize.width >= 1600)

  useEffect(() => {
    setIsDesktop(screenSize.width >= 1600)
  }, [screenSize.width])

  return (
    <div className="border border-solid border-gray-gray7 rounded p-3">
      <div className=" bg-gray-gray9 rounded flex items-center justify-center p-3 cursor-pointer">
        <StyledImage>
          <Badge isHappy={isHappy}></Badge>
        </StyledImage>
      </div>
      <span className="mt-3 block text-primary-blue1 tablet:text-xl text-base font-bold">慈濟週報第十八期</span>
      <div className="flex flex-row items-center mt-1">
        <div className="flex flex-1 text-lg border-solid border-b border-gray-gray8" />
        <div className="flex flex-row gap-x-1 ml-2">
          <div className="desktop:w-8 desktop:h-8 w-6 h-6 bg-secondary-light-blueGreen3 rounded-full flex justify-center items-center cursor-pointer">
            <Icon.Video style={{ width: (isDesktop ? 24 : 18) }}/>
          </div>
          <div className="desktop:w-8 desktop:h-8 w-6 h-6 bg-secondary-light-blueGreen3 rounded-full flex justify-center items-center cursor-pointer">
            <Icon.Download style={{ width: (isDesktop ? 24 : 18) }} />
          </div>
          <div className="desktop:w-8 desktop:h-8 w-6 h-6 bg-secondary-light-blueGreen3 rounded-full flex justify-center items-center cursor-pointer">
            <Icon.BookBlue style={{ width: isDesktop ? 24 : 18 }} />
          </div>
        </div>
      </div>
    </div>
  )
}
