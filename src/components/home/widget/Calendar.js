'use client'
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import dayjs from "dayjs"
import Icon from "@/shared/Icon"

export default function Calendar() {

    return <OuterContainer>
        <InnerContainer style={{ backgroundImage: `url(/bgImage/bg-roof-top.svg)` }}>
            <div className="flex-1 border-solid border-gray-gray8 laptop:border-r px-2 laptop:justify-end justify-center flex h-fit">
                <div className="flex flex-col justify-center w-fit">
                    <div className="font-semibold text-lg w-fit">
                        {dayjs().format('YYYY.MM')}
                    </div>
                    <div className="font-semibold text-[40px] leading-none w-auto text-center">
                        {dayjs().format('DD')}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex items-center font-semibold text-center leading-7 tracking-normal p-2 h-fit text-xl whitespace-nowrap justify-center laptop:justify-start">
                世代輪轉<br />
                法脈接續
            </div>
        </InnerContainer>
        <div className="bg-gray-gray8 p-1.5 w-full">
            <span className="cursor-pointer font-medium flex items-center justify-end text-lg text-primary-blue3 hover:text-primary-blue2">
                更多志工早會 <Icon.RightArrow2 width="18px" />
            </span>
        </div>
    </OuterContainer>
}

const OuterContainer = styled.div`
    flex-basis: 50%;
    @media(min-width: ${screens.tablet}) {
        flex-basis: 25%;
    }
    @media(min-width: ${screens.laptop}) {
        flex-basis: 50%;
    }
    @media(min-width: ${screens.desktop}) {
        flex-basis: 100%;
    }
`

const InnerContainer = styled.div`
    background-repeat: no-repeat;
    border: 4px solid ${color.gray.gray8};
    display: flex;
    flex-direction: column;
    color: ${color.primary.blue1};
    padding-top: 15px;
    padding-bottom: 75px;
    background-size: 150%;
    background-position: -20px 100%;
    width: 100%;
    @media(min-width: ${screens.laptop}) {   
        padding-top: 15px;
        padding-bottom: 25px;
        flex-direction: row;
        height: 135px;
        background-size: 60%;
        background-position: center 100%;
    }
`