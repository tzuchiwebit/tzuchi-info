'use client'
import { useState } from "react"
import Icon from "@/shared/Icon"
import styled from "styled-components"
import { BannerTitle, SlidesTrack, Tag } from "../components"
import color from "@/shared/styles/color";
import screens from "@/shared/styles/screens";
import dayjs from "dayjs"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const tagOptions = [
    '全球',
    '台灣',
    '亞洲',
    '美洲',
    '歐洲',
    '非洲',
    '大洋洲',
]

const Item = ({ number }) => (
    <div className="relative w-full p-1 min-w-[300px] laptop:min-w-0">
        <div className="w-full shadow-elevation-3 rounded-md overflow-hidden p-2">
            <StyledImage style={{ backgroundImage: `url(${"https://picsum.photos/id/230/300/300"})` }} />
            <div className="pt-2 text-xl font-bold w-full text-primary-blue1 text-left h-28">
                結合多機構在烏克蘭發放 慈濟助難民過寒冬 {number}
            </div>
            <div className="pt-2 font-medium text-sm text-gray-gray4 border-t border-solid border-gray-gray8">
                {
                    dayjs().format('YYYY-MM-DD')
                }
            </div>
        </div>
    </div>
)

const SiteNewsSection = () => {
    return <div className="pt-3 w-fit laptop:w-full flex">
        {Array(3).fill({}).map(i => <Item />)}
    </div>
}

export default function SiteNews() {

    const [selctedIndex, setSelectedIndex] = useState(0);

    return <div className="pt-5">
        <BannerTitle title={`各據點消息`} link={'#'} />
        <div className="pt-5 w-full">
            <div className="flex gap-2 flex-wrap">
                {
                    tagOptions.map((tag, index) => (<Tag
                        onClick={() => { setSelectedIndex(index) }}
                        isSelected={(selctedIndex === index)}
                        key={index}
                    >
                        {tag}
                    </Tag>))
                }
            </div>
            <SlidesTrack>
                <SiteNewsSection />
            </SlidesTrack>
        </div>
    </div>
}


const StyledImage = styled.div`
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 200px;
    border-radius: 8px;
    @media(min-width: ${screens.tablet}) {
        height: 180px;
    }
    @media(min-width: ${screens.laptop}) {
        height: 120px;
    }
    
`
