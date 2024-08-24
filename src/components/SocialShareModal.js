"use client"
import { useState, useEffect } from "react"
import Icon from "@/shared/Icon"
import styled from "styled-components"
import * as classnames from "classnames"
import screens from "@/shared/styles/screens";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      z-index: 1000;
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

export default function SocailShareModal({ isOpen, toggleOpen, articleId })  {
  const subject = "慈濟資訊網文章分享";
  const articleUrl = `${process.env.NEXT_PUBLIC_URL}/article/${articleId}`
  const body = `歡迎來到慈濟資訊網 ${process.env.NEXT_PUBLIC_URL}\n\n分享作品給您參考 ${articleUrl}`
  const [isShow, setIsShow] = useState(false)

  const toggleShow = () => {
    setIsShow(!isShow)
    setTimeout(()=> {
      toggleOpen()
    }, 300)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(body);
    toast.success('複製成功', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const mailTo = () => {
    window.open(`mailto:?subject=${subject}&body=${encodeURIComponent(body)}`)
  }

  const sendSms = () => {
    const smsLink = `sms:?&body=${encodeURIComponent(body)}`;
    window.open(smsLink);
  }

  const sendLine = () => {
    const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${articleUrl}`;
    window.open(lineShareUrl);
  }

  const sendMessager = () => {
    // const link = `${process.env.NEXT_PUBLIC_URL}/article/${articleId}`
    const link = 'https://tzuchi-ebooks.web.app/book/865'
    const messengerShareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(link)}`;
    window.open(messengerShareUrl);
  }

  const sendInstagram = () => {
    const url = encodeURIComponent('https://www.example.com'); // URL to be shared
    window.open(`https://www.instagram.com`, '_blank');
  }

  const sendWechat = () => {
    const link = `${process.env.NEXT_PUBLIC_URL}/article/${articleId}`
    window.open(`weixin://dl/business/?t=ta428dhj739hg3efe6e`)
  }

  const sendDeviceShare = () => {
    if (navigator.share) {
      navigator.share({
        title: subject,
        text: body,
        url: articleUrl,
      })
        .then(() => console.log('成功！'))
        .catch((error) => console.log('發生錯誤', error));
    }
  }

  useEffect(() => {
    setIsShow(isOpen)
  }, [isOpen])

  return (<>
    <ModalContainer className={classnames(isShow && 'show', 'select-none')}>
      <div className="flex flex-row items-center w-full">
        <div className="grow text-center text-xl font-bold">分享好文給您的朋友</div>
        <div onClick={toggleShow} className="cursor-pointer">
          <Icon.Cancel style={{ width: 32 }} />
        </div>
      </div>
      <div className="border-b-2 border-solid border-white w-full"></div>
      <div className="flex flex-col gap-y-[15px] laptop-down:w-[360px] w-full">
        <div className="grid grid-cols-4">
          <div className="flex flex-col items-center cursor-pointer" onClick={sendLine}>
            <Icon.ShareLine style={{ width: 32 }}></Icon.ShareLine>
            <span className="font-medium">Line</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={sendMessager}>
            <Icon.ShareMessenger style={{ width: 32 }}></Icon.ShareMessenger>
            <span className="font-medium">Messenger</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={sendDeviceShare}>
            <Icon.ShareInstagram style={{ width: 32 }}></Icon.ShareInstagram>
            <span className="font-medium">Instagram</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={sendDeviceShare}>
            <Icon.ShareWeChat style={{ width: 32 }}></Icon.ShareWeChat>
            <span className="font-medium">WeChat</span>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-center cursor-pointer" onClick={copyLink}>
            <Icon.ShareCopyLink style={{ width: 32 }}></Icon.ShareCopyLink>
            <span className="font-medium">複製連結</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={sendSms}>
            <Icon.ShareSMS style={{ width: 32 }}></Icon.ShareSMS>
            <span className="font-medium">簡訊</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={mailTo}>
            <Icon.ShareEmail style={{ width: 32 }}></Icon.ShareEmail>
            <span className="font-medium">電子郵件</span>
          </div>
        </div>
      </div>
    </ModalContainer>
    <ToastContainer />
  </>)
}
