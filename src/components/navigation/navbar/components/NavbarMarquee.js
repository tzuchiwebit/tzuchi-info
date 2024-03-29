import color from "@/shared/styles/color";
import Marquee from "react-fast-marquee";
import styled from "styled-components";
// import { Transition } from '@headlessui/react'
// import { Fragment, useState } from 'react'


const NavbarMarquee = () => {

    return (<div className="w-full h-[40px] text-white bg-primary-blue1 flex items-center justify-center">
        <Marquee>
            <div className="font-bold flex gap-3 items-center">
                <PrefixDialog>慈濟快報 <span className="absolute -right-[10px] text-secondary-blueGreen">►</span></PrefixDialog>
                愛心無國界 馳援烏克蘭
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