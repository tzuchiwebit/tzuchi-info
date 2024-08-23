"use client"
import { useState, useEffect, useMemo } from "react"
import Icon from "@/shared/Icon"
import useScreenSize from '@/shared/hook/useScreenSize';
import SocialShareModal from "@/components/SocialShareModal"
import * as classnames from "classnames"
import database, { increaseLike , increaseShare, getLikeRef, getShareRef } from "@/config/database"
import { onValue, ref } from "firebase/database";
import useDataProvider from "@/components/article/useDataProvider"

export default function SocialShare({ articleId = '', isMobileType = false }) {
  const { hasLikeLocal, setHasLikeLocal, hasShareLocal, setHasShareLocal } = useDataProvider();

  const [like, setLike] = useState(0)
  const [share, setShare] = useState(0)

  const hasLike = useMemo(()=> {
    console.log('hasLikeLocal', hasLikeLocal)
    return !!hasLikeLocal
  }, [hasLikeLocal])

  const hasShare = useMemo(()=> {
    console.log('hasShareLocal', hasShareLocal)
    return !!hasShareLocal
  }, [hasShareLocal])

  const handleIncreaseLike = () => {
    if (hasLikeLocal) return
    setHasLikeLocal(true)
    increaseLike(articleId)
  }

  const handleIncreaseShare = () => {
    if (hasShareLocal) return
    setHasShareLocal(true)
    increaseShare(articleId)
  }

  useEffect(() => {
    if (!!articleId) {
      onValue(getLikeRef(articleId), snapshot => {
        const data = snapshot.val()
        setLike(data)
      })
      onValue(getShareRef(articleId), snapshot => {
        const data = snapshot.val()
        setShare(data)
      })
    }
  }, [articleId])

  const screenSize = useScreenSize();
  const [isMobileDevice, setIsMobileDevice] = useState(screenSize.width < 1024)
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    if (!isOpen) {
      handleIncreaseShare()
    }
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setIsMobileDevice(screenSize.width < 1024);
  }, [screenSize.width])

  return (
    <>
      {
        isMobileType ?
          <>
            <div className="laptop:hidden grid grid-cols-[1fr_auto_1fr] bg-primary-blue3 tablet:h-[73px] h-[65px] py-4 text-white w-screen sticky bottom-0">
              <div onClick={handleIncreaseLike}
                className="flex flex-row items-center justify-center gap-x-1 cursor-pointer select-none">
                { hasLikeLocal ? <Icon.LikeFull style={{ width: 32 }} /> : <Icon.Like style={{ width: 32 }} />}
                <span className="text-[26px] font-bold leading-[32px]">{like > 0 ? like + '個' : ''}讚</span>
              </div>
              <div className="border-l-4 border-solid border-white"></div>
              <div onClick={() => {
                toggleOpen();
              }} className="flex flex-row items-center justify-center gap-x-1 cursor-pointer select-none">
                { hasShareLocal ? <Icon.ShareFull style={{ width: 32 }} /> : <Icon.Share style={{ width: 32 }} />}
                <span className="text-[26px] font-bold leading-[32px]">{share > 0 ? share + '個' : ''}分享</span>
              </div>
            </div>
            {
              isMobileDevice && isOpen &&
              <SocialShareModal isOpen={isOpen} toggleOpen={toggleOpen} articleId={articleId}></SocialShareModal>
            }
          </> :
          <div className="laptop:flex flex-row gap-x-2 hidden">
            <div onClick={handleIncreaseLike}
              className={classnames({
                'flex flex-row items-center gap-x-1 border-[1.5px] rounded border-solid  py-2 px-4 cursor-pointer select-none': true,
                'text-complementary-blue3 border-complementary-blue3': hasLikeLocal,
                'text-gray-gray4 border-gray-gray4': !hasLikeLocal,
              })}
            >
              <Icon.Like style={{ width: 20 }} />
              <span className="text-[18px] font-bold leading-[20px]">{like > 0 ? like + '個' : ''}讚</span>
            </div>
            <div className="relative">
              <div onClick={() => {
                toggleOpen();
              }}
                className={classnames({
                  'flex flex-row items-center gap-x-1 border-[1.5px] rounded border-solid py-2 px-4 cursor-pointer select-none': true,
                  'text-complementary-blue3 border-complementary-blue3': hasShareLocal,
                  'text-gray-gray4 border-gray-gray4': !hasShareLocal,
                })
                }>
                <Icon.ShareFull style={{ width: 20 }} />
                <span className="text-[18px] font-bold leading-[20px]">{share > 0 ? share + '個' : ''}分享</span>
              </div>
              {
                !isMobileDevice && isOpen &&
                <SocialShareModal isOpen={isOpen} toggleOpen={toggleOpen} articleId={articleId}></SocialShareModal>
              }
            </div>
          </div>
      }
    </>
  )
}
