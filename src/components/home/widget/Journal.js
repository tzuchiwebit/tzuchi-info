'use client'
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import Icon from "@/shared/Icon"
import Image from "next/image"
import { OuterContainer } from "./container"
import { useRouter } from 'next/navigation'
import routes from "@/config/routes"
import Skeleton from "react-loading-skeleton"
import DefaultImage from '@/asset/image/default-article-intro-square.png'

export default function Journal() {

    const router = useRouter();

    const reminderItem = {};


    return <OuterContainer>
        <InnerContainer>
            <div className="flex px-1 justify-center">
              <div className="aspect-square relative laptop:w-[164px] w-[146px]">
                  <Image
                      src={reminderItem.image ? reminderItem.image: DefaultImage}
                      alt={reminderItem.imageAlt}
                      width={0}
                      height={0}
                      sizes="100vw"
                      layout='fill'
                      objectFit='cover'
                      className="laptop:w-[164px] w-[146px]"
                  />
              </div>
            </div>
            <div className="flex flex-col px-2 pt-1 text-xl laptop:justify-start shrink min-h-[90px]">
                <div className="flex font-semibold leading-7 tracking-normal justify-between items-center tablet:flex-col tablet:items-start desktop:flex-row">
                    慈濟週報 <SubscribeTag onClick={()=> window.open('https://docs.google.com/forms/d/e/1FAIpQLSeRATEdx4-mOyykXIptMyXvbsJvw7XwzDWHWnqG1cMQTexZRA/viewform')}>訂閱 <Icon.Bell style={{ width: 13 }} /></SubscribeTag>
                </div>
                <div className="pt-1 justify-center laptop:justify-start line-clamp-2 text-gray-gray2 w-full shrink text-base">
                    慈濟一週重點訊息
                </div>
            </div>

        </InnerContainer>
        <div className="bg-gray-gray8 p-1 w-full">
            <span
                className="cursor-pointer font-medium flex items-center justify-end text-lg text-primary-blue3 hover:text-primary-blue2"
                onClick={() => {
                    router.push(`${routes.WEEKLY_REPORT}`)
                }}>
                更多 <Icon.RightArrow2 width="18px" />
            </span>
        </div>
    </OuterContainer>
}


const InnerContainer = styled.div`
    border: 4px solid ${color.gray.gray8};
    display: flex;
    flex-direction: column;
    color: ${color.primary.blue1};
    padding: 8px 4px 0;
    width: 100%;
    height: 256px;

    @media(min-width: ${screens.laptop}) {
      padding: 4px 0 4px;
      flex-direction: row;
      height: 172px;
    }
    @media(min-width: ${screens.desktop}) {
      padding: 4px 0 0;
      flex-direction: column;
      height: 260px;
    }
`

const SubscribeTag = styled.button`
    background-color: ${color.complementary.pink};
    font-size: 13px;
    font-weight: 700;
    display: flex;
    gap: 5px;
    border-radius: 100px;
    color: white;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 25px;
`
