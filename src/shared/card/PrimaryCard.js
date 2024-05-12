'use client'
import styled from "styled-components"
import screens from "../styles/screens"
import dayjs from "dayjs"
import Skeleton from "react-loading-skeleton"
import SocialBar from "./components/SocialBar"
import Image from 'next/image'
import DefaultImage from '@/asset/image/default-article-intro.png'

const PrimaryCard = ({ item = {}, onClick = () => { } }) => {

    return <div className="w-full tablet:w-1/2 laptop:w-1/3 px-3 mb-6">
      <div className="bg-white border rounded-[4px] p-3 shadow-elevation-3 flex flex-col gap-2">
        <div onClick={onClick} className="cursor-pointer">
          <ImageContainer>
            {
              item?.id ?
              <Image
                src={item?.images?.image_intro ? item?.images?.image_intro: DefaultImage}
                alt={item?.images?.image_intro_alt}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />:
              <Skeleton className="aspect-[14/9]" />
            }
          </ImageContainer>
          <div className="text-primary-blue1 font-bold text-xl">
              {item.title}
          </div>
          <div className="pb-5">
              <div className="text-gray-gray2 line-clamp-4">
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
              {item.created_by_alias}
            </div>
            <div className="flex gap-1">
              <SocialBar likes={item?.like} shares={item?.share}></SocialBar>
            </div>
          </div>
        </div>
      </div>
    </div>
}

export default PrimaryCard

const ImageContainer = styled.div`
    width: 100%;
    height: auto;
    // min-height: 160px;
    overflow: hidden;
    border-radius: 4px;
    @media(min-width: ${screens.tablet}) {
        // height: 210px;
    }
    @media(min-width: ${screens.laptop}) {
        // height: 218px;
    }
`
