"use client"
import { useState, useEffect } from "react"
import Icon from "@/shared/Icon"
import styled from "styled-components"
import screens from "@/shared/styles/screens";
import { Transition } from '@headlessui/react'
import useScreenSize from '@/shared/hook/useScreenSize';
import * as classnames from "classnames"

const ModalContainer = styled.div`
    opacity: 0;
    background-color: #E8EEFE;
    box-shadow: 0px 5px 18px 0px #0000004D;
    color: #1B2D58;
    padding: 20px 13px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 12px;
    @media(max-width: ${screens["laptop-down"].max}) {
      width: 100vw;
      position: fixed;
      z-index: 99999;
      bottom: 0;
      left: 0;
      transition: all .3s ease-out;
      transform: translate(0px, 100px);
      &.show{
        opacity: 1;
        transform: translate(0px, 0px);
      }
    }
    @media(min-width: ${screens.laptop}) {
      width: 375px;
      position: absolute;
      top: -4px;
      right: -2px;
      border-radius: 4px;
      transition: all .3s ease-out;
      transform: translate(100px, 0px);
      &.show{
        opacity: 1;
        transform: translate(0px, 0px);
      }
    }
`

const ShareModal = ({ isOpen, toggleOpen }) => {
  const [isShow, setIsShow] = useState(false)
  const toggleShow = () => {
    setIsShow(!isShow)
    setTimeout(()=> {
      toggleOpen()
    }, 300)
  }
  useEffect(() => {
    setIsShow(isOpen)
  }, [isOpen])

  return (
    <ModalContainer className={classnames(isShow && 'show')}>
      <div className="flex flex-row items-center w-full">
        <div className="grow text-center text-xl font-bold">分享好文給您的朋友</div>
        <div onClick={toggleShow} className="cursor-pointer">
          <Icon.Cancel style={{ width: 32 }} />
        </div>
      </div>
      <div className="border-b-2 border-solid border-white w-full"></div>
      <div className="flex flex-col gap-y-[15px] laptop-down:w-[360px] w-full">
        <div className="grid grid-cols-4">
          <div className="flex flex-col items-center cursor-pointer">
            <Icon.ShareLine style={{ width: 32 }}></Icon.ShareLine>
            <span className="font-medium">Line</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <Icon.ShareMessenger style={{ width: 32 }}></Icon.ShareMessenger>
            <span className="font-medium">Messenger</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <Icon.ShareInstagram style={{ width: 32 }}></Icon.ShareInstagram>
            <span className="font-medium">Instagram</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <Icon.ShareWeChat style={{ width: 32 }}></Icon.ShareWeChat>
            <span className="font-medium">WeChat</span>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-center cursor-pointer">
            <Icon.ShareCopyLink style={{ width: 32 }}></Icon.ShareCopyLink>
            <span className="font-medium">複製連結</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <Icon.ShareSMS style={{ width: 32 }}></Icon.ShareSMS>
            <span className="font-medium">簡訊</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <Icon.ShareEmail style={{ width: 32 }}></Icon.ShareEmail>
            <span className="font-medium">電子郵件</span>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default function SocialShare({ isMobile}) {
  const screenSize = useScreenSize();
  const [isMobileDevice, setIsMobileDevice] = useState(screenSize.width < 1024)
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setIsMobileDevice(screenSize.width < 1024)
  }, [screenSize.width])

  return (
    <>
      {
        isMobile ?
          <>
            <div className="laptop:hidden grid grid-cols-[1fr_auto_1fr] bg-primary-blue3 h-[73px] py-4 text-white w-screen sticky bottom-0">
              <div className="flex flex-row items-center justify-center gap-x-1 cursor-pointer">
                <Icon.Like style={{ width: 32 }} />
                <span className="text-[26px] font-bold leading-[32px]">讚</span>
              </div>
              <div className="border-l-4 border-solid border-white"></div>
              <div onClick={toggleOpen} className="flex flex-row items-center justify-center gap-x-1 cursor-pointer">
                <Icon.Share style={{ width: 32 }} />
                <span className="text-[26px] font-bold leading-[32px]">分享</span>
              </div>
            </div>
            {
              isMobileDevice && isOpen &&
              <ShareModal isOpen={isOpen} toggleOpen={toggleOpen}></ShareModal>
            }
          </>:
          <div className="laptop:flex flex-row gap-x-2 hidden">
            <div className="text-gray-gray4 flex flex-row items-center gap-x-1 border-[1.5px] rounded border-solid border-gray-gray4 py-2 px-4 cursor-pointer">
              <Icon.Like style={{ width: 20 }} />
              <span className="text-[18px] font-bold leading-[20px]">讚</span>
            </div>
            <div className="relative">
              <div onClick={toggleOpen} className="text-gray-gray4 flex flex-row items-center gap-x-1 border-[1.5px] rounded border-solid border-gray-gray4 py-2 px-4 cursor-pointer">
                <Icon.Share style={{ width: 20 }} />
                <span className="text-[18px] font-bold leading-[20px]">分享</span>
              </div>
              {
                !isMobileDevice && isOpen &&
                <ShareModal isOpen={isOpen} toggleOpen={toggleOpen}></ShareModal>
              }
            </div>
          </div>
      }
    </>
  )
}
