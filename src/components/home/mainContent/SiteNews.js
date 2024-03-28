'use client'
import { useState } from "react"
import styled from "styled-components"
import { BannerTitle, SlidesTrack } from "../components"
import screens from "@/shared/styles/screens";
import dayjs from "dayjs"
import BlurBGImage from "@/shared/image/BlurBGImage";
import PrimaryTag from "@/shared/tag/PrimaryTag";

const tagOptions = [
    '臺灣',
    '亞洲',
    '美洲',
    '歐洲',
    '非洲',
    '大洋洲',
    '全球',
]

const Item = () => (
    <div className="relative w-full p-1 min-w-[300px] laptop:min-w-0">
        <div className="w-full shadow-elevation-3 rounded-md overflow-hidden p-2">
            {/* <StyledImage style={{ backgroundImage: `url(${"https://picsum.photos/id/230/300/300"})` }} /> */}
            <ImageContainer>
                <BlurBGImage url={"https://picsum.photos/id/230/500/300"} />
            </ImageContainer>
            <div className="pt-2 text-xl font-bold w-full text-primary-blue1 text-left h-24 tablet:h-20 laptop:h-32 desktop:h-28 laptop:pb-2">
                結合多機構在烏克蘭發放 慈濟助難民過寒冬
            </div>
            <div className="pt-2 font-medium text-sm text-gray-gray4 border-t border-solid border-gray-gray8">
                { dayjs().format('YYYY-MM-DD') } <br />
                報導地點
            </div>
        </div>
    </div>
)

const SiteNewsSection = () => {
    return <div className="pt-3 w-fit laptop:w-full flex">
        {Array(3).fill({}).map((i, index) => <Item key={index} />)}
    </div>
}

export default function SiteNews() {

    const [selctedIndex, setSelectedIndex] = useState(0);

    return <div className="pt-5">
        <BannerTitle title={`各據點消息`} link={'#'} />
        <div className="pt-5 w-full">
            <div className="flex gap-2 flex-wrap">
                {
                    tagOptions.map((tag, index) => (<PrimaryTag
                        onClick={() => { setSelectedIndex(index) }}
                        selected={(selctedIndex === index)}
                        key={index}
                    >
                        {tag}
                    </PrimaryTag>))
                }
                
            </div>
            <SlidesTrack>
                <SiteNewsSection />
            </SlidesTrack>
        </div>
    </div>
}

const ImageContainer = styled.div`
    width: 100%;
    height: 215px;
    @media(min-width: ${screens.tablet}) {
        height: 210px;
    }
    @media(min-width: ${screens.laptop}) {
        height: 110px;
    }
    @media(min-width: ${screens.desktop}) {
        height: 121px;
    }
`
