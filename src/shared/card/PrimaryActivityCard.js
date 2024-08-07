'use client'
import styled from "styled-components"
import screens from "../styles/screens"
import dayjs from "dayjs"
import Skeleton from "react-loading-skeleton"
import SocialBar from "./components/SocialBar"
import Image from 'next/image'
import DefaultImage from '@/asset/image/default-article-intro.png'
import Icon from "@/shared/Icon"
import color from "@/shared/styles/color"

const PrimaryActivityCard = ({ item = {}, onClick = () => { } }) => {

  return <div className="w-full">
    <div className="bg-white border rounded-[4px] p-3 shadow-elevation-3 flex flex-col gap-2">
      <div onClick={onClick} className="cursor-pointer flex flex-col items-center">
        <ImageContainer>
          {
            item?.id ?
              <Image
                src={item?.images?.image_intro ? item?.images?.image_intro : DefaultImage}
                alt={item?.images?.image_intro_alt}
                fill
                style={{ objectFit:"cover", borderRadius: "4px" }}
              /> :
              <Skeleton className="aspect-[14/9]" />
          }
        </ImageContainer>
        <div className="w-full text-primary-blue1 font-bold text-xl mt-3 line-clamp-2 h-[3.5rem]">
          {item.title}
        </div>
        <div className="w-full text-gray-gray2 pl-2 border-l-2 border-solid border-primary-blue3 my-2 font-medium">
          活動開始：{dayjs(item?.['act-start']).format('YYYY-MM-DD HH:mm')}<br />
          活動結束：{dayjs(item?.['act-end']).format('YYYY-MM-DD HH:mm')}<br />
          <span className="flex gap-2">活動地點：{item?.['act-place']} <Icon.LocationPin style={{ width: 16, color: color.primary.blue2, cursor: 'pointer' }} /></span>
        </div>
        <div className="mt-1 w-full">
          <div className="text-gray-gray2 text-base line-clamp-4 h-[6rem]">
            {item.metadesc}
          </div>
        </div>
      </div>
      <div className="w-full pt-2 font-medium text-sm text-gray-gray4 border-t-2 border-solid border-gray-gray8 flex flex-col">
        <div className="w-full">
          {dayjs(item.publish_up).format('YYYY-MM-DD')}
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="border-l border-gray-gray4 border-solid pl-1 leading-[16px] h-[16px]">
            {/* {item?.creator?.name} */}
            {item?.metadata?.author || '慈濟基金會'}
          </div>
          <div className="hidden flex gap-1">
            <SocialBar articleId={item.id} likes={item?.like} shares={item?.share}></SocialBar>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default PrimaryActivityCard

const ImageContainer = styled.div`
  position: relative;
  width: 325px;
  height: 208px;
  @media(min-width: ${screens.tablet}) {
    width: 337px;
    height: 216px;
  }
  @media(min-width: ${screens.laptop}) {
    width: 276px;
    height: 177px;
  }
  @media(min-width: ${screens.desktop}) {
    width: 356px;
    height: 228px;
  }
`
