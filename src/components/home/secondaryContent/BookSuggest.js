'use client'
import Icon from "@/shared/Icon"
import styled from "styled-components"
import { BannerTitle } from "../components"
import screens from "@/shared/styles/screens";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"
import { useState, useMemo } from "react";
import _ from "lodash";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import color from "@/shared/styles/color";
import useDataProvider from "../useDataProvider";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import routes from "@/config/routes";
import { SlidesTrack } from "../components";
// import routes from "@/app/config/routes";
// import { useRouter } from "next/navigation";
import Image from 'next/image'
import DefaultImage from '@/asset/image/default-article-intro-square.png'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const tagOptions = [
    '靜思人文',
    '慈濟書庫',
]

// const data = [
//     {
//         title: '《印順導師年譜》開放線上預購 慈善購書兩不誤',
//         image: 'https://picsum.photos/id/229/300/300',
//     },
//     {
//         title: '環保輔具平台缺你一分力 擴大招募志工中',
//         image: 'https://picsum.photos/id/229/300/300',
//     },
//     {
//         title: '澤爸親子講座 打開親子溝通的黃金之鑰',
//         image: 'https://picsum.photos/id/229/300/300',
//     },
//     {
//         title: '《印順導師年譜》開放線上預購 慈善購書兩不誤',
//         image: 'https://picsum.photos/id/229/300/300',
//     },
//     {
//         title: '環保輔具平台缺你一分力 擴大招募志工中',
//         image: 'https://picsum.photos/id/229/300/300',
//     },
//     {
//         title: '澤爸親子講座 打開親子溝通的黃金之鑰',
//         image: 'https://picsum.photos/id/229/300/300',
//     },
// ]


const Item = ({ item }) => {

    const router = useRouter();

    return (
        <div className="relative laptop:w-[180px] w-[165px] tablet:w-full">
            {/* <div className="w-full h-[480px] p-1"> */}
            <div className={"w-full p-1"}>
                <div
                    className="w-full rounded-md overflow-hidden cursor-pointer"
                    onClick={() => {
                        // router.push(`${routes.ARITCLE}/${item.id}`)
                    }}>
                    {
                      item?.title ?
                      <Image
                        src={item?.image ? item?.image: DefaultImage}
                        alt={""}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: 'auto',
                        }}
                        className="rounded-md"
                      />:
                      <Skeleton className="aspect-square" />
                    }

                    <div className="pt-2 pl-2 pr-0 text-xl font-bold w-full text-primary-blue1 text-left line-clamp-2">
                        {item?.title}
                    </div>
                </div>
            </div>
        </div>
    )
}


const PrevBtn = ({ onClick }) => (<button
    onClick={onClick}
    className="absolute z-10 bottom-5 left-1 p-1 bg-white rounded-4xl shadow-elevation-3 text-gray-gray2 hover:bg-complementary-blue2 focus:bg-complementary-blue1">
    <Icon.PageArrowLeft
        style={{ width: 24 }}
    />
</button>)

const NextBtn = ({ onClick }) => (<button
    onClick={onClick}
    className="absolute z-10 bottom-5 right-1 p-1 bg-white rounded-4xl shadow-elevation-3 text-gray-gray2 hover:bg-complementary-blue2 focus:bg-complementary-blue1">
    <Icon.PageArrowRight
        style={{ width: 24 }}
    />
</button>)

// const CarouselSection = ({ data }) => {

//     const sliderData = useMemo(() => {
//         if (data.length === 1) {
//             return Array(4).fill(data[0])
//         } else if (data.length === 2) {
//             return _.concat(data, data);
//         }
//         return data
//     }, [data])

//     const settings = {
//         customPaging: function (i) {
//             return (
//                 <div
//                     tabIndex={0}
//                     role="button"
//                     // className={classNames((selectedIndex === i) ? 'bg-primary-blue2' : 'bg-gray-gray7', 'w-3 h-3 bottom-5 relative rounded-full')}
//                     className='w-3 h-3 bottom-5 relative rounded-full translate-x-1'
//                 />
//             );
//         },
//         dots: true,
//         dotsClass: "slick-dots",
//         infinite: true,
//         centerMode: true,
//         centerPadding: '11%',
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         initialSlide: 0,
//         nextArrow: <NextBtn />,
//         prevArrow: <PrevBtn />,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     centerMode: false,
//                     slidesToShow: 4,
//                     slidesToScroll: 1,
//                     initialSlide: 0,
//                     infinite: true,
//                     arrows: false,
//                     dots: false,
//                     swipe: false,
//                 }
//             },
//             {
//                 breakpoint: 767,
//                 settings: {
//                     centerMode: false,
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                     infinite: true,
//                 }
//             }
//         ]
//     };

//     return (
//         <Slider style={{ paddingBottom: 60 }} {...settings}>
//             {
//                 sliderData.map((item, index) => (<div key={index}>
//                     <Item item={item.attributes} />
//                 </div>))
//             }
//         </Slider>
//     );
// }

const onReadMore = () => {
    window.open(`https://tzuchi-ebooks.web.app`)
}

export default function BookSuggest() {

    const router = useRouter();

    const { loadingBooks, suggestBooks: booksData } = useDataProvider();

    const sliderData = useMemo(() => {
        if (booksData.length === 1) {
            return Array(4).fill(booksData[0])
        } else if (booksData.length === 2) {
            return _.concat(booksData, booksData);
        }
        return booksData.slice(0, 4)
    }, [booksData])

    return <div className="pt-3 w-full">
        <BannerTitle title={`好書推薦`} />
        <div className="flex flex-row w-full gap-2 items-center pt-4">
            <div className="flex-0 text-[24px] font-bold text-primary-blue1">
                靜思人文
            </div>
            <div className="flex flex-1 text-lg border-solid border-b-2 border-gray-gray7" />
            <div className="flex-0 font-medium justify-end items-end text-lg text-primary-blue3">
                <div
                    onClick={onReadMore}
                    target="_blank"
                    className="cursor-pointer flex flex-row whitespace-nowrap">
                    更多<Icon.RightArrow2 width={20} />
                </div>
            </div>
        </div>

        <div className="w-full overflow-hidden">
            <SlidesTrack>
                {
                    sliderData.map((item, index) => (<div className='w-fit' key={index}>
                        <Item item={item} />
                    </div>))
                }
            </SlidesTrack>

            {/* <CarouselContainer>
                <CarouselSection data={booksData} />
            </CarouselContainer> */}
        </div>
        <div className="flex flex-row w-full gap-2 items-center  pt-4">
            <div className="flex-0 text-[24px] font-bold text-primary-blue1">
                慈濟書庫
            </div>
            <div className="flex flex-1 text-lg border-solid border-b-2 border-gray-gray7" />
            <div className="flex-0 font-medium justify-end items-end text-lg text-primary-blue3">
                <div
                    onClick={onReadMore}
                    target="_blank"
                    className="cursor-pointer flex flex-row whitespace-nowrap">
                    更多<Icon.RightArrow2 width={20} />
                </div>
            </div>
        </div>
        <div className="w-full overflow-hidden">
            <SlidesTrack>
                {
                    sliderData.map((item, index) => (<div className='w-fit' key={index}>
                        <Item item={item} />
                    </div>))
                }
            </SlidesTrack>
        </div>
    </div>
}


const StyledImage = styled.div`
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    aspect-ratio: 1;
    border-radius: 5px;
`

// const CarouselContainer = styled.div`
//     @media(min-width: ${screens.laptop}) {
//         .slick-track {
//             left: -33px;
//         }
//     }
//     .slick-dots {
//         bottom: -6px;
//         > li {
//             * {
//                 background-color: ${color.gray.gray7};
//             }
//             &.slick-active > *{
//                 background-color: ${color.primary.blue2};
//             }
//         }
//     }

// `
