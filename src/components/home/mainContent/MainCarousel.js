'use client'
import { useState } from "react"
import Icon from "@/shared/Icon"
import styled from "styled-components"
import { BannerTitle } from "../components"
import color from "@/shared/styles/color";
import screens from "@/shared/styles/screens";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Item = ({ number }) => (
    <div className="relative w-full">
        {/* <div className="w-full h-[480px] p-1"> */}
        <div className={"w-full p-1"}>
            <div className="w-full shadow-elevation-3 rounded-md overflow-hidden">
                <StyledImage
                    style={{ backgroundImage: `url(${"https://picsum.photos/id/230/300/300"})` }}
                // alt="image 1"
                // className="w-full desktop:max-w-full"
                />
                <div className="px-5 pt-2 text-xl font-bold w-full text-primary-blue1 text-left">
                    結合多機構在烏克蘭發放 慈濟助難民過寒冬 {number}
                </div>
                <div className="flex flex-row justify-end px-5 pb-2">
                    <div className="border-2 border-solid border-primary-blue2 rounded-md text-primary-blue2 py-1 px-2 flex font-bold">
                        <Icon.ShareFull style={{ width: 24 }} /> 分享
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const CarouselSection = () => {

    return <CarouselContainer>
        <Carousel
            showArrows={true}
            swipeable
            infiniteLoop
            emulateTouch
            showThumbs={false}
            statusFormatter={() => { }}
            renderArrowPrev={(clickHandler) => (<div
                onClick={clickHandler}
                className="absolute z-10 bottom-5 left-4 border border-solid border-gray-gray7/50 p-1 bg-white rounded-4xl shadow-elevation-3 hover:shadow-elevation-4 text-gray-gray2 hover:text-primary-blue1">
                <Icon.PageArrowLeft
                    style={{ width: 24 }}
                />
            </div>)}
            renderArrowNext={(clickHandler) => (<div
                onClick={clickHandler}
                className="absolute z-10 bottom-5 right-4 border border-solid border-gray-gray7/50 p-1 bg-white rounded-4xl shadow-elevation-3 hover:shadow-elevation-4 text-gray-gray2 hover:text-primary-blue1">
                <Icon.PageArrowRight
                    style={{ width: 24 }}
                />
            </div>)}
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
            <div style={{ marginBottom: 60 }}>
                <Item />
            </div>
            <div>
                <Item />
            </div>
            <div>
                <Item />
            </div>
            <div>
                <Item />
            </div>
            <div>
                <Item />
            </div>
            <div>
                <Item />
            </div>
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


const StyledImage = styled.div`
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 320px;
    @media(min-width: ${screens.tablet}) {
        height: 430px;
    }
    @media(min-width: ${screens.laptop}) {
        height: 400px;
    }
    @media(min-width: ${screens.desktop}) {
        height: 430px;
    }
`

const CarouselContainer = styled.div`
    .control-dots {
        display: flex;
        gap: 15px;
        justify-content: center;
    }
`