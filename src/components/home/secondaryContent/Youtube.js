'use client'
import { BannerTitle } from "../components"
import dayjs from "dayjs"
// import Video from 'next-video';
import 'video-react/dist/video-react.css';
import { Player, BigPlayButton } from 'video-react';
import styled from "styled-components";
import color from "@/shared/styles/color";
import screens from "@/shared/styles/screens";
import { useMemo, useState } from "react";
import { getArticlesByCategory } from "@/api/joomlaApi";
import YouTube from 'react-youtube';
import Icon from "@/shared/Icon";
import { useRouter } from "next/router";
import routes from "@/config/routes";
import axios from 'axios';
import classNames from "classnames";


const { useRequest } = require('ahooks');

const src = [
    "/test.mp4",
    "/test-straight.mp4",
]

const YoutubeSection = () => {

    const router = useRouter();

    const [youtubeData, setYoutubeData] = useState({});

    const [youtubeDetail, setYoutubeDetail] = useState({ width: 0, height: 0 });

    const {
        runAsync: getYoutubeInfo
    } = useRequest((yt_id) => axios.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${yt_id}&format=json`), {
        manual: true
    })

    useRequest(() => getArticlesByCategory({
        label_name: 'Youtube小編精選',
        limit: 1,
    }), {
        onSuccess: async (res) => {
            const _data = res?.data?.[0].attributes || false
            if (_data) {
                const _ytString = _data['yt-url']
                const splitArray = _ytString.split("v=");
                const YTId = splitArray[1];
                // const YTId = `e4HluMzNNXQ`;

                const ytInfo = await getYoutubeInfo(YTId);

                setYoutubeDetail(ytInfo.data);
                setYoutubeData({
                    youtubeId: YTId,
                    bgImage: `http://img.youtube.com/vi/${YTId}/hqdefault.jpg`,
                    ..._data,
                })
            }
        }
    })

    // console.log(data)
    const [onPlay, setOnPlay] = useState(false);

    const opts = {
        height: '240px',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    // console.log(videoSrc);
    return <div className="py-7 w-full">
        <div className="rounded-md overflow-hidden">
            {/* <video width="100%" height="240" controls src={'/test.mp4'} /> */}
            {/* http://www.w3schools.com/html/mov_bbb.mp4 */}
            {/* {
                videoSrc ? <>
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
            } */}
            {
                onPlay ? <StyledYoutube className="w-full aspect-4/3" videoId={youtubeData.youtubeId} opts={opts} /> :
                    (<div
                        className={classNames(
                            "relative flex justify-center items-center w-full bg-contain bg-no-repeat aspect-4/3 bg-center"
                        )}
                        style={{ backgroundImage: `url(${youtubeData.bgImage ? youtubeData.bgImage : ''})` }}
                        onClick={() => setOnPlay(true)}>
                        <div className="w-[60px] h-[45px] z-100 flex justify-center items-center cursor-pointer">
                            <div className="w-[30px] h-[30px] bg-white z-5 absolute" />
                            <Icon.PlayButton position="center" className="w-full z-10" />
                        </div>
                    </div>)
            }
            {/* <VideoPlayer>
                <source src={videoSrc ? src[0] : src[1]} />
                <BigPlayButton position="center" />
            </VideoPlayer> */}
        </div>
        <div className="font-bold text-primary-blue1 text-xl pt-3 cursor-pointer" onClick={() => {
            // router.push(`${routes.ARITCLE}/${youtubeData.id}`)
        }}>
            {youtubeData.title}
        </div>
        <div className="font-medium text-gray-gray2 text-sm pt-3">
            {dayjs(youtubeData.publish_up).format('YYYY-MM-DD')}
        </div>
    </div>
}

export default function Youtube() {

    return <div className="pt-5 flex-1">
        <BannerTitle title={<div className="inherit">
            <div className="text-[26px] font-bold text-primary-blue1">社群影片</div>
            <div className="text-[26px] font-bold text-primary-blue1">小編精選</div>
        </div>} link="https://www.youtube.com/@tzuchi_official" behavior="blank"/>
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

const StyledYoutube = styled(YouTube)`
    .ytp-title{
        display: none;
    }
`
