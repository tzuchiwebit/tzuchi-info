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

export default function Journal() {

    const router = useRouter();

    const reminderItem = {};


    return <OuterContainer>
        <InnerContainer>
            <div className="flex px-2 laptop:justify-end justify-center shrink-0 laptop:max-w-[50%] desktop:max-w-full max-h-[150px]">
                {reminderItem.image ?
                    <div className="aspect-square relative">
                        <Image
                            src={reminderItem.image}
                            alt={reminderItem.imageAlt}
                            width={0}
                            height={0}
                            sizes="100vw"
                            layout='fill'
                            objectFit='contain'
                            className="w-full laptop:h-auto laptop:w-full desktop:max-w-[165px]"
                        // style={{ width: '100%' }}
                        />
                    </div> :
                    <></>
                    // <Skeleton className="aspect-square w-full laptop:h-auto laptop:w-full max-w-[150px] desktop:max-w-[165px]" />
                }
                <Image
                    src="https://picsum.photos/id/201/200/300"
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="aspect-square w-full laptop:h-auto laptop:w-full max-w-[150px] desktop:max-w-[165px]"
                />
            </div>
            <div className="flex flex-col p-2 text-xl laptop:justify-start shrink min-h-[90px]">
                <div className="flex font-semibold leading-7 tracking-normal justify-between items-center tablet:flex-col tablet:items-start desktop:flex-row">
                    慈濟週報 <SubscribeTag onClick={()=> window.open('https://docs.google.com/forms/d/e/1FAIpQLSeRATEdx4-mOyykXIptMyXvbsJvw7XwzDWHWnqG1cMQTexZRA/viewform')}>訂閱 <Icon.Bell style={{ width: 13 }} /></SubscribeTag>
                </div>
                <div className="pt-1 justify-center laptop:justify-start line-clamp-2 text-gray-gray2 w-full shrink text-base">
                    慈濟一週重點訊息
                </div>
            </div>

        </InnerContainer>
        <div className="bg-gray-gray8 p-1.5 w-full">
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
    padding-top: 8px;
    width: 100%;
    height: 260px;
    @media(min-width: ${screens.laptop}) {
        padding-top: 10px;
        padding-bottom: 10px;
        flex-direction: row;
        height: 135px;
    }
    @media(min-width: ${screens.desktop}) {
        padding-top: 10px;
        padding-bottom: 0;
        flex-direction: column;
        height: fit-content;
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
