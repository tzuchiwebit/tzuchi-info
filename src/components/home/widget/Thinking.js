'use client'
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import dayjs from "dayjs"
import Icon from "@/shared/Icon"
import Image from "next/image"
import { OuterContainer } from "./container"

export default function Thinking() {

    return <OuterContainer>
        <InnerContainer>
            <div className="px-2 laptop:justify-end justify-center flex">
                <Image
                    src="/bgImage/widget-default-img2.png"
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-[130px] w-auto laptop:h-auto laptop:w-full"
                    // style={{ width: '100%' }}
                />
            </div>
            <div className="flex flex-col justify-center font-semibold leading-7 tracking-normal p-2 text-xl laptop:justify-start laptop:max-w-[75%] desktop:max-w-full">
                證嚴上人<br />
                每日一叮嚀
                <div className="pt-0 justify-center laptop:justify-start truncate text-gray-gray2">
                    世間祥和在世間祥和在世間祥和在
                </div>
            </div>

        </InnerContainer>
        <div className="bg-gray-gray8 p-1.5 w-full">
            <span className="cursor-pointer font-medium flex items-center justify-end text-lg text-primary-blue3 hover:text-primary-blue2">
                更多 <Icon.RightArrow2 width="18px" />
            </span>
        </div>
    </OuterContainer>
}


const InnerContainer = styled.div`
    border: 4px solid ${color.gray.gray8};
    display: flex;
    flex-direction: column;
    color: ${color.primary.blue1};
    padding-top: 15px;
    width: 100%;
    height: 250px;
    @media(min-width: ${screens.laptop}) {   
        padding-top: 10px;
        padding-bottom: 10px;
        flex-direction: row;
        height: 135px;
    }
    @media(min-width: ${screens.desktop}) {   
        padding-top: 10px;
        padding-bottom: 0;
        flex-direction: column;
        height: fit-content;
    }
`