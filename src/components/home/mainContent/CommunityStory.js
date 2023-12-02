'use client'
import styled from "styled-components"
import { BannerTitle, SlidesTrack } from "../components"
import screens from "@/shared/styles/screens";
import dayjs from "dayjs"
import Icon from "@/shared/Icon";

const Item = () => (
    <div className="relative w-full p-1 min-w-[300px] laptop:min-w-0">
        <div className="w-full shadow-elevation-3 rounded-md overflow-hidden p-3 flex flex-col laptop:flex-row gap-4">
            <StyledImage style={{ backgroundImage: `url(${"https://picsum.photos/id/230/300/300"})` }} />
            <div className="relative h-[210px] laptop:h-[230px] laptop:max-w-[45%]">
                <div className="text-xl font-bold w-full text-primary-blue1 text-left line-clamp-2 h-14">
                延續人文環保美育營北港延續人文環保美育營北港延續人文環保美育營北港延續人文環保美育營北港延續人文環保美育營北港延續人文環保美育營北港
                </div>
                <div className="pt-2 font-md w-full text-gray-gray2 text-left line-clamp-4">
                    延續人文環保美育營北港兒班招生熱絡延續人文環保美育營北港兒班招生熱絡延續人文環保美育營北港兒班招生熱絡延續人文環保美育營北港兒班招生熱絡延續人文環保美育營北港兒班招生熱絡延續人文環保美育營北港兒班招生熱絡延續人文環保美育營北港兒班招生熱絡延續人文環保美育營北港兒班招生熱絡延續人文環保美育營北港兒班招生熱絡
                </div>
                <div className="w-full absolute bottom-0 pt-2 font-medium text-sm text-gray-gray4 border-t-2 border-solid border-gray-gray8 flex justify-between items-center">
                    <div>
                        {dayjs().format('YYYY-MM-DD')}
                    </div>
                    <div className="flex gap-1 text-lg">
                        <Icon.Like style={{width: 16}} /> 
                        <span>讚</span>
                        <Icon.Views style={{width: 16}} /> 
                        <span>200 次點閱</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const CommunityStorySection = () => {
    return <div className="pt-3 w-fit flex laptop:w-full laptop:flex-col">
        {Array(3).fill({}).map((i, index) => <Item key={index} />)}
    </div>
}

export default function CommunityStory() {

    return <div className="pt-5">
        <BannerTitle title={`社區故事`} link={'#'} />
        <div className="pt-2 w-full">
            <SlidesTrack>
                <CommunityStorySection />
            </SlidesTrack>
        </div>
    </div>
}


const StyledImage = styled.div`
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 180px;
    border-radius: 6px;
    @media(min-width: ${screens.laptop}) {
        width: 55%;
        height: 230px;
    }
`
