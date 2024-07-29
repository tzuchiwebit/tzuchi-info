"use client"
import { useState, useEffect } from "react"
import Icon from "@/shared/Icon"
import useScreenSize from '@/shared/hook/useScreenSize';
import SocialShareModal from "@/components/SocialShareModal"
import * as classnames from "classnames"
import { useLikeAndShare } from "@/shared/hook";

export default function SocialShare({ articleId = '', isMobileType = false, likes = 0, shares = 0 }) {

  const { like, share, hasLike, hasShare, handleLike, handleShare, setLike = () => { }, setShare = () => { } } = useLikeAndShare({
    id: articleId
  });

  const screenSize = useScreenSize();
  const [isMobileDevice, setIsMobileDevice] = useState(screenSize.width < 1024)
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    if (!isOpen) {
      setSharedNum(sharedNum + 1)
    }
    setIsOpen(!isOpen)
  }
  const [clickedNum, setClickedNum] = useState(0)
  const [sharedNum, setSharedNum] = useState(0)

  useEffect(() => {
    setIsMobileDevice(screenSize.width < 1024);
    setLike(likes)
    setShare(shares)
  }, [screenSize.width])

  // useEffect(() => {
  //   setClickedNum(Number(likes) || 0)
  //   setSharedNum(Number(shares) || 0)
  // }, [likes, shares])

  return (
    <>
      {
        isMobileType ?
          <>
            <div className="laptop:hidden grid grid-cols-[1fr_auto_1fr] bg-primary-blue3 tablet:h-[73px] h-[65px] py-4 text-white w-screen sticky bottom-0">
              <div onClick={() => handleLike(articleId)}
                className="flex flex-row items-center justify-center gap-x-1 cursor-pointer select-none">
                <Icon.Like style={{ width: 32 }} />
                <span className="text-[26px] font-bold leading-[32px]">{like > 0 ? like + '個' : ''}讚</span>
              </div>
              <div className="border-l-4 border-solid border-white"></div>
              <div onClick={() => {
                toggleOpen();
                handleShare(articleId);
              }} className="flex flex-row items-center justify-center gap-x-1 cursor-pointer select-none">
                <Icon.Share style={{ width: 32 }} />
                <span className="text-[26px] font-bold leading-[32px]">{share > 0 ? share + '個' : ''}分享</span>
              </div>
            </div>
            {
              isMobileDevice && isOpen &&
              <SocialShareModal isOpen={isOpen} toggleOpen={toggleOpen}></SocialShareModal>
            }
          </> :
          <div className="laptop:flex flex-row gap-x-2 hidden">
            <div onClick={() => handleLike(articleId)}
              className={classnames({
                'flex flex-row items-center gap-x-1 border-[1.5px] rounded border-solid  py-2 px-4 cursor-pointer select-none': true,
                'text-complementary-blue3 border-complementary-blue3': hasLike,
                'text-gray-gray4 border-gray-gray4': !hasLike,
              })}
            >
              <Icon.Like style={{ width: 20 }} />
              <span className="text-[18px] font-bold leading-[20px]">{like > 0 ? like + '個' : ''}讚</span>
            </div>
            <div className="relative">
              <div onClick={() => {
                toggleOpen();
                handleShare(articleId);
              }}
                className={classnames({
                  'flex flex-row items-center gap-x-1 border-[1.5px] rounded border-solid py-2 px-4 cursor-pointer select-none': true,
                  'text-complementary-blue3 border-complementary-blue3': hasShare,
                  'text-gray-gray4 border-gray-gray4': !hasShare,
                })
                }>
                <Icon.ShareFull style={{ width: 20 }} />
                <span className="text-[18px] font-bold leading-[20px]">{share > 0 ? share + '個' : ''}分享</span>
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
