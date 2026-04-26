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
import routes from "@/config/routes";
import axios from 'axios';
import classNames from "classnames";
import { Linkfont } from "@/shared/styles/linkFont.js";


const { useRequest } = require('ahooks');

const src = [
    "/test.mp4",
    "/test-straight.mp4",
]

const extractYouTubeId = (input) => {
    if (!input) return ''
    const raw = String(input).trim()

    // Already an id
    if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw

    try {
        const u = new URL(raw)

        // youtu.be/<id>
        if (u.hostname === 'youtu.be') {
            const id = u.pathname.split('/').filter(Boolean)[0]
            if (id) return id
        }

        // youtube.com/watch?v=<id>
        const v = u.searchParams.get('v')
        if (v) return v

        // youtube.com/embed/<id> or youtube.com/shorts/<id>
        const parts = u.pathname.split('/').filter(Boolean)
        const idx = parts.findIndex((p) => p === 'embed' || p === 'shorts')
        if (idx !== -1 && parts[idx + 1]) return parts[idx + 1]
    } catch (err) {
        // ignore URL parse errors
    }

    // Fallback regexes
    const vMatch = raw.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
    if (vMatch?.[1]) return vMatch[1]
    const shortMatch = raw.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
    if (shortMatch?.[1]) return shortMatch[1]
    const embedMatch = raw.match(/\/(embed|shorts)\/([a-zA-Z0-9_-]{11})/)
    if (embedMatch?.[2]) return embedMatch[2]

    return ''
}

const YoutubeSection = () => {

    const [youtubeData, setYoutubeData] = useState({});
    const [thumbIndex, setThumbIndex] = useState(0);

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
                const YTId = extractYouTubeId(_ytString);
                // const YTId = `e4HluMzNNXQ`;
                if (!YTId) return

                const ytInfo = await getYoutubeInfo(YTId);

                setYoutubeDetail(ytInfo.data);
                setThumbIndex(0);
                setYoutubeData({
                    youtubeId: YTId,
                    ..._data,
                })
            }
        }
    })

    // Thumbnail ladder: level 3 -> 2 -> 1
    // hqdefault (3) -> mqdefault (2) -> default (1)
    const thumbCandidates = useMemo(() => {
        if (!youtubeData?.youtubeId) return [];
        return [
            `https://img.youtube.com/vi/${youtubeData.youtubeId}/hqdefault.jpg`,
            `https://img.youtube.com/vi/${youtubeData.youtubeId}/mqdefault.jpg`,
            `https://img.youtube.com/vi/${youtubeData.youtubeId}/default.jpg`,
        ];
    }, [youtubeData?.youtubeId]);

    const currentThumbUrl = useMemo(() => {
        return thumbCandidates[thumbIndex] || '';
    }, [thumbCandidates, thumbIndex]);

    const handleThumbError = () => {
        setThumbIndex((idx) => {
            const next = idx + 1;
            return next < thumbCandidates.length ? next : idx;
        });
    }

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
            {
                onPlay ? <StyledYoutube className="w-full aspect-4/3" videoId={youtubeData.youtubeId} opts={opts} /> :
                    (<div
                        className={classNames(
                            "relative flex justify-center items-center w-full bg-contain bg-no-repeat aspect-4/3 bg-center"
                        )}
                        onClick={() => setOnPlay(true)}>
                        {
                            currentThumbUrl ? (
                                <img
                                    className="absolute inset-0 w-full h-full object-contain"
                                    src={currentThumbUrl}
                                    onError={handleThumbError}
                                    alt=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            ) : null
                        }
                        <div className="w-[60px] h-[45px] z-100 flex justify-center items-center cursor-pointer">
                            <div className="w-[30px] h-[30px] bg-white z-5 absolute" />
                            <Icon.PlayButton position="center" className="w-full z-10" />
                        </div>
                    </div>)
            }
        </div>
        <div onClick={() => window.open(`https://youtu.be/${youtubeData.youtubeId}`, '_blank')}>
            <div className="font-bold text-primary-blue1 text-xl pt-3 cursor-pointer" >
                <Linkfont>{youtubeData.title}</Linkfont>
            </div>
            <div className="font-medium text-gray-gray2 text-sm pt-3">
                {dayjs(youtubeData.publish_up).format('YYYY-MM-DD')}
            </div>
        </div>
    </div>
}

export default function Youtube() {

    return <div className="pt-5 flex-1">
        <BannerTitle id="Youtube" title={<div className="inherit">
            <div className="text-[26px] font-bold text-primary-blue1">社群影片</div>
            <div className="text-[26px] font-bold text-primary-blue1">小編精選</div>
        </div>} link="https://www.youtube.com/@tzuchi_official" behavior="blank" />
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
