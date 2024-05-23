import { Fragment, useState, useEffect } from 'react'
import Icon from "@/shared/Icon"
import SocialShareModal from "@/components/SocialShareModal"
import * as classnames from "classnames"
import useScreenSize from '@/shared/hook/useScreenSize';
import { useLikeAndShare } from '@/shared/hook';

export default function SocialBar({ articleId = '', likes, shares, isMobileType }) {


  const { like, share, set, hasLike, hasShare, handleLike, handleShare, setLike = () => { }, setShare = () => { } } = useLikeAndShare({
    id: articleId
  });

  const screenSize = useScreenSize();
  const [isMobileDevice, setIsMobileDevice] = useState(screenSize.width < 1024)
  const [isOpen, setIsOpen] = useState(false);

  // const [likedNum, setLikedNum] = useState(0)
  // const [sharedNum, setSharedNum] = useState(0)
  // const [liked, setLiked] = useState(false)
  // const [shared, setShared] = useState(false)

  const toggleOpen = () => {
    if (!isOpen) {
      // setSharedNum(sharedNum + 1)
      // setShared(true)
      handleShare(articleId)
    }
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setIsMobileDevice(screenSize.width < 1024)
  }, [screenSize.width])

  useEffect(()=> {
    setLike(likes);
    setShare(shares);
  }, [likes, shares])

  // useEffect(()=> {
  //   setLikedNum(Number(likes) || 0)
  //   setSharedNum(Number(shares) || 0)
  // }, [likes, shares])

  const clickLike = () => {
    // setLikedNum(likedNum + 1)
    // setLiked(true)
    handleLike(articleId)
  }
  // const clickShare = () => {
  //   setSharedNum(sharedNum + 1)
  //   setShared(true)
  // }

  return (
    <div className="flex gap-x-1">
      <div className="flex gap-x-1 cursor-pointer select-none" onClick={clickLike}>
        {
          like > 0 ?
          <Fragment>
            <Icon.LikeFull style={{ width: 16 }} className={classnames({'text-alert-light-red': hasLike})}/>
            <p>{like}</p>
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
            share > 0 ?
            <Fragment>
              <Icon.ShareFull style={{ width: 16 }} className={classnames({'text-primary-blue3': hasShare})}/>
              <p>{share}</p>
            </Fragment> :
            <Fragment>
              <Icon.Share style={{ width: 16 }} />
              <p>分享</p>
            </Fragment>
          }
        </div>
        {
          isOpen &&
          <SocialShareModal isOpen={isOpen} toggleOpen={toggleOpen}></SocialShareModal>
        }
      </div>
  </div>
  )
}
