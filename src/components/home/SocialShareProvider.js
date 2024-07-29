import { createContext, useMemo, useState, useEffect, useRef } from "react"
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import classnames from "@/utils/classNames"
import Icon from "@/shared/Icon"
import { useOutsideDetector } from "@/shared/hook"


const ModalDesktopContainer = styled.div`
    opacity: 0;
    background-color: ${color.complementary.blue2};
    box-shadow: 0px 5px 18px 0px #0000004D;
    color: #1B2D58;
    row-gap: 12px;
    z-index: 999;
    width: 375px;
    position: fixed;
    border-radius: 4px;
    transition: opacity .3s ease-out;
    &.show{
      opacity: 1;
    }
`

const ModalContent = ({
  setOpen = () => { }
}) => (
  <div className="flex flex-col gap-4 w-full py-5 px-3 items-center text-primary-blue1">
    <div className="flex flex-row items-center w-full">
      <div className="grow text-center text-xl font-bold">分享好文給您的朋友</div>
      <div onClick={() => setOpen(false)} className="cursor-pointer">
        <Icon.Cancel style={{ width: 32 }} />
      </div>
    </div>
    <div className="border-b-2 border-solid border-white w-full"></div>
    <div className="flex flex-col gap-y-[15px] laptop-down:w-[360px] w-full">
      <div className="grid grid-cols-4">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => console.log("share through line")}>
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
  </div>
)

function SocailShareModal({
  position = { x: 0, y: 0 },
  isOpen = false,
  setOpen = () => { },
}) {

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const ref = useRef();
  const refMobile = useRef();

  useOutsideDetector(ref, () => {
    if (isOpen) {
      setOpen(false);
    }
  });

  useOutsideDetector(refMobile, () => {
    if (isOpen) {
      setOpen(false);
    }
  });

  return (
    <>
      {/* desktop layout */}
      <ModalDesktopContainer
        ref={ref}
        style={{
          top: position.y,
          left: position.x,
        }}
        className={classnames(isOpen ? 'show' : 'h-0 overflow-hidden w-0', "hidden laptop:block")}
      >
        <ModalContent setOpen={setOpen} />
      </ModalDesktopContainer>
      {/* mobile layout */}
      <div
        ref={refMobile}
        className={
          classnames(isOpen ? '' : 'h-0 overflow-hidden translate-y-6',
            "laptop:hidden fixed bottom-0 w-full bg-complementary-blue2 z-50 shadow-elevation-4 transition-all"
          )}
      >
        <ModalContent setOpen={setOpen} />
      </div>
    </>
  )
}


export const SocialShareContext = createContext(null);

export default function SocialShareProvider({ children }) {

  const [socialShareArticleId, setSocialShareArticleId] = useState(null);
  const [showSocialShareModal, setShowSocialShareModal] = useState(false);
  const [socialShareModalPosition, setSocialShareModalPosition] = useState({
    x: 0, y: 0
  });

  const toggleSocialShareModal = (e) => {
    const windowSize = {
      x: e.view?.innerWidth,
      y: e.view?.innerHeight,
    }
    const pos = {
      x: e.clientX,
      y: ((windowSize.y - e.clientY) > (windowSize.y / 2)) ? e.clientY + 20 : e.clientY - 250,
    }

    setShowSocialShareModal(!showSocialShareModal);
    setSocialShareModalPosition(pos)
  };

  return (
    <SocialShareContext.Provider value={{
      toggleSocialShareModal,
    }}>
      <div className="relative">
        {children}
        <SocailShareModal
          isOpen={showSocialShareModal}
          setOpen={setShowSocialShareModal}
          position={socialShareModalPosition}
          setSocialShareArticleId={setSocialShareArticleId}
        />
      </div>
    </SocialShareContext.Provider>
  );
}
