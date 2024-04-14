"use client"
import { useState, useEffect } from "react"
import Icon from "@/shared/Icon"
import useScreenSize from '@/shared/hook/useScreenSize';
import SocialShareModal from "@/components/SocialShareModal"
import * as classnames from "classnames"

export default function SocialShare({ isMobileType, likes, shares }) {
  const screenSize = useScreenSize();
  const [isMobileDevice, setIsMobileDevice] = useState(screenSize.width < 1024)
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    if (!isOpen) {
      setSharedNum(sharedNum+1)
    }
    setIsOpen(!isOpen)
  }
  const [clickedNum, setClickedNum] = useState(0)
  const [sharedNum, setSharedNum] = useState(0)

  useEffect(() => {
    setIsMobileDevice(screenSize.width < 1024)
  }, [screenSize.width])

  useEffect(()=> {
    setClickedNum(Number(likes) || 0)
    setSharedNum(Number(shares) || 0)
  }, [likes, shares])

  return (
    <>
      {
        isMobileType ?
          <>
            <div className="laptop:hidden grid grid-cols-[1fr_auto_1fr] bg-primary-blue3 tablet:h-[73px] h-[65px] py-4 text-white w-screen sticky bottom-0">
              <div onClick={() => setClickedNum(clickedNum+1)}
              className="flex flex-row items-center justify-center gap-x-1 cursor-pointer select-none">
                <Icon.Like style={{ width: 32 }} />
                <span className="text-[26px] font-bold leading-[32px]">{clickedNum > 0 ? clickedNum + '個' : ''}讚</span>
              </div>
              <div className="border-l-4 border-solid border-white"></div>
              <div onClick={toggleOpen} className="flex flex-row items-center justify-center gap-x-1 cursor-pointer select-none">
                <Icon.Share style={{ width: 32 }} />
                <span className="text-[26px] font-bold leading-[32px]">{sharedNum > 0 ? sharedNum + '個' : ''}分享</span>
              </div>
            </div>
            {
              isMobileDevice && isOpen &&
              <SocialShareModal isOpen={isOpen} toggleOpen={toggleOpen}></SocialShareModal>
            }
          </>:
          <div className="laptop:flex flex-row gap-x-2 hidden">
            <div onClick={() => setClickedNum(clickedNum+1)}
            className={classnames({
              'flex flex-row items-center gap-x-1 border-[1.5px] rounded border-solid  py-2 px-4 cursor-pointer select-none': true,
              'text-complementary-blue3 border-complementary-blue3': clickedNum > 0,
              'text-gray-gray4 border-gray-gray4': clickedNum === 0,
            })}
            >
              <Icon.Like style={{ width: 20 }} />
              <span className="text-[18px] font-bold leading-[20px]">{clickedNum > 0 ? clickedNum + '個' : ''}讚</span>
            </div>
            <div className="relative">
              <div onClick={toggleOpen}
              className={classnames({
                'flex flex-row items-center gap-x-1 border-[1.5px] rounded border-solid py-2 px-4 cursor-pointer select-none': true,
                'text-complementary-blue3 border-complementary-blue3': sharedNum > 0,
                'text-gray-gray4 border-gray-gray4': sharedNum === 0,
              })

              }>
                <Icon.ShareFull style={{ width: 20 }} />
                <span className="text-[18px] font-bold leading-[20px]">{sharedNum > 0 ? sharedNum + '個' : ''}分享</span>
              </div>
              {
                !isMobileDevice && isOpen &&
                <SocialShareModal isOpen={isOpen} toggleOpen={toggleOpen}></SocialShareModal>
              }
            </div>
          </div>
      }
    </>
  )
}
