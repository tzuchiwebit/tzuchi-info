'use client'
import { BannerTitle } from "../components"
import dayjs from "dayjs"
// import Video from 'next-video';
import 'video-react/dist/video-react.css';
import { Player, BigPlayButton } from 'video-react';
import styled from "styled-components";
import color from "@/shared/styles/color";
import screens from "@/shared/styles/screens";
import { useState } from "react";

const src = [
    "/test.mp4",
    "/test-straight.mp4",
]

const YoutubeSection = () => {

    const [videoSrc, setVideoSrc] = useState(true);
    // console.log(videoSrc);
    return <div className="py-5 w-full">
        <div className="rounded-md overflow-hidden">
            {/* <video width="100%" height="240" controls src={'/test.mp4'} /> */}
            {/* http://www.w3schools.com/html/mov_bbb.mp4 */}
            {
                videoSrc ? <>
                    <div className="hidden">
                        123123
                    </div>
                    <VideoPlayer>
                        <source src={src[0]} />
                        <BigPlayButton position="center" />
                    </VideoPlayer>
                </> : <>
                    <VideoPlayer>
                        <source src={src[1]} />
                        <BigPlayButton position="center" />
                    </VideoPlayer>
                </>
            }
            {/* <VideoPlayer>
                <source src={videoSrc ? src[0] : src[1]} />
                <BigPlayButton position="center" />
            </VideoPlayer> */}
        </div>
        <div className="font-bold text-primary-blue1 text-xl pt-3" onClick={() => {
            setVideoSrc(!videoSrc);
        }}>
            小犬颱風重創蘭嶼 慈濟啟動關懷
        </div>
        <div className="font-medium text-gray-gray2 text-sm pt-3">
            {dayjs().format('YYYY-MM-DD')}
        </div>
    </div>
}

export default function Youtube() {

    return <div className="py-3 flex-1">
        <BannerTitle title={<div className="inherit">
            <div className="text-[26px] font-bold text-primary-blue1">Youtube</div>
            <div className="text-[26px] font-bold text-primary-blue1">小編精選</div>
        </div>} link={'#'} />
        <YoutubeSection />
    </div>
}

const VideoPlayer = styled(Player)`
    .video-react-big-play-button {
        width: 40px !important;
        height: 30px !important;
        background-color: ${color.primary.blue1};
        border: none;
        &:before {
            transform: scale(0.7);
            top:-5px;
        }
        &.video-react-big-play-button-center {
            transform: translate(-20px, -10px);
            margin-top: unset;
            margin-left: unset;
            @media(min-width: ${screens.tablet}) {
                transform: translate(-20px, -10px) scale(1.5);
            }
            @media(min-width: ${screens.laptop}) {
                transform: translate(-20px, -10px);
            }
        }

    }

   
`
