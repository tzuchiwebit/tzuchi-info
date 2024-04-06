"use client"
import { useState, useEffect } from "react"
import Icon from "@/shared/Icon"
import useScreenSize from '@/shared/hook/useScreenSize';
import SocialShareModal from "@/components/SocialShareModal"

export default function SocialBar({ isMobileType }) {
  const screenSize = useScreenSize();
  const [isMobileDevice, setIsMobileDevice] = useState(screenSize.width < 1024)
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const openSubscribe = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSeRATEdx4-mOyykXIptMyXvbsJvw7XwzDWHWnqG1cMQTexZRA/viewform', 'subscribe', 'noopener=yes');
  }

  useEffect(() => {
    setIsMobileDevice(screenSize.width < 1024)
  }, [screenSize.width])

  return (
    <>
      {
        isMobileType ?
          <>
            <div className="laptop:hidden grid tablet:grid-cols-[1fr_auto_1fr] grid-cols-1 bg-primary-blue3 tablet:h-[73px] h-[65px] py-4 text-white w-screen sticky bottom-0">
              {
                screenSize.width >= 768 && <>
                  <div className="flex flex-row items-center justify-center gap-x-1 cursor-pointer">
                    <Icon.Like style={{ width: 32 }} />
                    <span className="text-[26px] font-bold leading-[32px]">讚</span>
                  </div>
                  <div className="border-l-4 border-solid border-white"></div>
                </>
              }
              <div onClick={toggleOpen} className="flex flex-row items-center justify-center gap-x-1 cursor-pointer">
                <Icon.Share style={{ width: 32 }} />
                <span className="text-[26px] font-bold leading-[32px]">分享</span>
              </div>
            </div>
            {
              isMobileDevice && isOpen &&
              <SocialShareModal isOpen={isOpen} toggleOpen={toggleOpen}></SocialShareModal>
            }
          </>:
          <div className="flex flex-row gap-x-2">
            <div className="text-gray-gray4 flex flex-row items-center gap-x-1 border-[1.5px] rounded border-solid border-gray-gray4 py-2 px-4 cursor-pointer"
              onClick={openSubscribe}
            >
              <Icon.BookGray style={{ width: 20 }} />
              <span className="text-[18px] font-bold leading-[20px]">訂閱</span>
            </div>
            <div className="relative laptop-down:hidden">
              <div onClick={toggleOpen} className="text-gray-gray4 flex flex-row items-center gap-x-1 border-[1.5px] rounded border-solid border-gray-gray4 py-2 px-4 cursor-pointer">
                <Icon.ShareFull style={{ width: 20 }} />
                <span className="text-[18px] font-bold leading-[20px]">分享</span>
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
