'use client'
import Icon from "@/shared/Icon"
import styled from "styled-components"
import { BannerTitle } from "../components"
import screens from "@/shared/styles/screens";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"
import BlurBGImage from "@/shared/image/BlurBGImage";
import SeBtn from "@/shared/button/SeBtn";
import { useMemo } from "react";
import useDataProvider from "../useDataProvider";
import _ from 'lodash'
import Skeleton from 'react-loading-skeleton'
import { useRouter } from "next/navigation";
import routes from "@/app/config/routes";

const data = [
    {
        title: '結合多機構在烏克蘭發放 慈濟助難民過寒冬 結合多機構在烏克蘭發放 慈濟助難民過寒冬',
        image: "https://picsum.photos/id/230/200/300",
    },
    {
        title: '結合多機構在烏克蘭發放 慈濟助難民過寒冬 結合多機構在烏克蘭發放 慈濟助難民過寒冬',
        image: "https://picsum.photos/id/232/400/300",
    },
    {
        title: '結合多機構在烏克蘭發放 慈濟助難民過寒冬 結合多機構在烏克蘭發放 慈濟助難民過寒冬',
        image: "https://picsum.photos/id/233/500/300",
    },
    {
        title: '結合多機構在烏克蘭發放 慈濟助難民過寒冬 結合多機構在烏克蘭發放 慈濟助難民過寒冬',
        image: "https://picsum.photos/id/234/100/300",
    },
    {
        title: '結合多機構在烏克蘭發放 慈濟助難民過寒冬 結合多機構在烏克蘭發放 慈濟助難民過寒冬',
        image: "https://picsum.photos/id/234/100/300",
    },
    {
        title: '結合多機構在烏克蘭發放 慈濟助難民過寒冬 結合多機構在烏克蘭發放 慈濟助難民過寒冬',
        image: "https://picsum.photos/id/234/100/300",
    },
    {
        title: '結合多機構在烏克蘭發放 慈濟助難民過寒冬 結合多機構在烏克蘭發放 慈濟助難民過寒冬',
        image: "https://picsum.photos/id/234/100/300",
    },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Item = ({ item, loading = false }) => {

    const router = useRouter();

    return (
        <div className="relative w-full mb-[60px]">
            {/* <div className="w-full h-[480px] p-1"> */}
            <div className={"w-full p-1"}>
                <div className="w-full shadow-elevation-3 rounded-md overflow-hidden">
                    {
                        loading ? <div className="">
                            <Skeleton className="aspect-video" />
                        </div> : <ImageContainer className='cursor-pointer' onClick={() => {
                            router.push(`${routes.ARITCLE}`)
                        }}>
                            <BlurBGImage url={item?.attributes?.images?.image_intro || "https://picsum.photos/id/232/400/300"} />
                        </ImageContainer>
                    }
                    <div className="px-4 flex flex-col tablet:flex-row laptop:flex-col items-center py-4 w-full gap-y-1 gap-x-4">
                        <div className="text-xl font-bold w-full text-primary-blue1 text-left flex-1 line-clamp-2 cursor-pointer" onClick={() => {
                            router.push(`${routes.ARITCLE}`)
                        }}>
                            {
                                loading ? <Skeleton /> : item?.attributes?.title
                            }
                        </div>
                        <div className="flex flex-row self-end w-fit flex-none">
                            <SeBtn>
                                <Icon.ShareFull style={{ width: 24 }} /> 分享
                            </SeBtn>
                            {/* <div className="border-2 border-solid border-primary-blue2 rounded-md text-primary-blue2 py-1 px-2 flex font-bold whitespace-nowrap">
                                
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CarouselSection = () => {

    const { pageData, loading } = useDataProvider();

    const baseInfos = useMemo(() => {
        const target = _.find(pageData, { name: '各據點消息' });
        return target?.data || [{}]
    }, [pageData])

    // console.log(`baseInfos`)
    // console.log(baseInfos)

    return <CarouselContainer>
        <Carousel
            showArrows={true}
            swipeable
            infiniteLoop
            emulateTouch
            showThumbs={false}
            statusFormatter={() => { }}
            renderArrowPrev={(clickHandler) => (<button
                onClick={clickHandler}
                className="absolute z-10 bottom-5 left-1 p-1 bg-white rounded-4xl shadow-elevation-3 cursor-pointer text-gray-gray2 hover:bg-complementary-blue2 focus:bg-complementary-blue1">
                <Icon.PageArrowLeft
                    style={{ width: 24 }}
                />
            </button>)}
            renderArrowNext={(clickHandler) => (<button
                onClick={clickHandler}
                className="absolute z-10 bottom-5 right-1 p-1 bg-white rounded-4xl shadow-elevation-3 cursor-pointer text-gray-gray2 hover:bg-complementary-blue2 focus:bg-complementary-blue1">
                <Icon.PageArrowRight
                    style={{ width: 24 }}
                />
            </button>)}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
                const defStyle = { marginLeft: 20, color: "green", cursor: "pointer", bottom: 10, position: 'relative' };
                const style = isSelected
                    ? { ...defStyle, color: "red" }
                    : { ...defStyle };
                return (
                    <div
                        onClick={onClickHandler}
                        onKeyDown={onClickHandler}
                        tabIndex={0}
                        role="button"
                        className={classNames(isSelected ? 'bg-primary-blue2' : 'bg-gray-gray7', 'w-3 h-3 bottom-5 relative rounded-full')}
                    />
                );
            }}
        >
            {
                baseInfos.map((_i, _index) => (
                    <div key={_index}>
                        <Item loading={loading} item={_i} />
                    </div>
                ))
            }
        </Carousel>
    </CarouselContainer>
}

export default function MainCarousel() {

    return <div>
        <BannerTitle title={`近期焦點`} />
        <div className="pt-5 w-full">
            <CarouselSection />
        </div>
    </div>
}


const ImageContainer = styled.div`
    width: 100%;
    height: 230px;
    @media(min-width: ${screens.tablet}) {
        height: 475px;
    }
    @media(min-width: ${screens.laptop}) {
        height: 400px;
    }
    @media(min-width: ${screens.desktop}) {
        height: 435px;
    }
`

const CarouselContainer = styled.div`
    .control-dots {
        display: flex;
        gap: 15px;
        justify-content: center;
    }
`