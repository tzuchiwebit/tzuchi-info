import { Fragment, useState, useEffect } from 'react'
import Icon from "@/shared/Icon"
import SocialShareModal from "@/components/SocialShareModal"
import * as classnames from "classnames"
import useScreenSize from '@/shared/hook/useScreenSize';

export default function SocialBar({ likes, shares, isMobileType }) {
  const screenSize = useScreenSize();
  const [isMobileDevice, setIsMobileDevice] = useState(screenSize.width < 1024)
  const [isOpen, setIsOpen] = useState(false);

  const [likedNum, setLikedNum] = useState(0)
  const [sharedNum, setSharedNum] = useState(0)
  const [liked, setLiked] = useState(false)
  const [shared, setShared] = useState(false)

  const toggleOpen = () => {
    if (!isOpen) {
      setSharedNum(sharedNum + 1)
      setShared(true)
    }
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setIsMobileDevice(screenSize.width < 1024)
  }, [screenSize.width])

  useEffect(()=> {
    setLikedNum(Number(likes) || 0)
    setSharedNum(Number(shares) || 0)
  }, [likes, shares])

  const clickLike = () => {
    setLikedNum(likedNum + 1)
    setLiked(true)
  }
  const clickShare = () => {
    setSharedNum(sharedNum + 1)
    setShared(true)
  }

  return (
    <div className="flex gap-x-1">
      <div className="flex gap-x-1 cursor-pointer select-none" onClick={clickLike}>
        {
          likedNum ?
          <Fragment>
            <Icon.LikeFull style={{ width: 16 }} className={classnames({'text-alert-light-red': liked})}/>
            <p>{likedNum}</p>
          </Fragment>:
          <Fragment>
            <Icon.Like style={{ width: 16 }}/>
            <p>讚</p>
          </Fragment>
        }
      </div>
      <div className='relative'>
        <div className="flex gap-x-1 cursor-pointer select-none" onClick={toggleOpen}>
          {
            sharedNum ?
            <Fragment>
              <Icon.ShareFull style={{ width: 16 }} className={classnames({'text-primary-blue3': shared})}/>
              <p>{sharedNum}</p>
            </Fragment> :
            <Fragment>
              <Icon.Share style={{ width: 16 }} />
              <p>分享</p>
            </Fragment>
          }
        </div>
        {
          !isMobileDevice && isOpen &&
          <SocialShareModal isOpen={isOpen} toggleOpen={toggleOpen}></SocialShareModal>
        }
        {
          isMobileDevice && isOpen &&
          <SocialShareModal isOpen={isOpen} toggleOpen={toggleOpen}></SocialShareModal>
        }
      </div>
  </div>
  )
}
