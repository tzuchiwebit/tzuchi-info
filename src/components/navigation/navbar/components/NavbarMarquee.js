import color from "@/shared/styles/color";
import Marquee from "react-fast-marquee";
import styled from "styled-components";
// import { Transition } from '@headlessui/react'
// import { Fragment, useState } from 'react'


const NavbarMarquee = () => {

  const openLink = (url) => {
    window.open(url)
  }

    return (<div className="w-full h-[40px] text-white bg-primary-blue1 flex items-center justify-center">
        <Marquee>
            <div className="ml-[20vw] font-bold flex gap-3 items-center">
                <PrefixDialog>慈濟快報 <span className="absolute -right-[10px] text-secondary-blueGreen">►</span></PrefixDialog>
                <Message onClick={()=> openLink('/article/220')}>善愛循環 敘利亞男孩投身慈濟志工</Message>
            </div>
            <div className="ml-[20vw] font-bold flex gap-3 items-center">
                <PrefixDialog>慈濟快報 <span className="absolute -right-[10px] text-secondary-blueGreen">►</span></PrefixDialog>
                <Message onClick={()=> openLink('/article/1822')}>滿納海敘利亞難民學童 齋戒月行善回饋</Message>
            </div>
            <div className="ml-[20vw] font-bold flex gap-3 items-center">
                <PrefixDialog>慈濟快報 <span className="absolute -right-[10px] text-secondary-blueGreen">►</span></PrefixDialog>
                <Message onClick={()=> openLink('/article/1834')}>美國慈青、慈少食物發放 加州貧苦家庭見證臺灣愛心</Message>
            </div>
        </Marquee>
    </div>)
}

export default NavbarMarquee

const PrefixDialog = styled.div`
    position: relative;
    background-color: ${color.secondary.blueGreen};
    color: white;
    border-radius: 8px;
    padding: 4px 16px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Message = styled.div`
  &:hover {
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-underline-offset: 4px;
    cursor: pointer;
  }
`
