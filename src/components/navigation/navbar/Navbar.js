'use client'

import { useState, useEffect } from 'react'
import NavbarTop from './components/NavbarTop'
import NavbarBottom from './components/NavbarBottom'
// import NavbarMarquee from './components/NavbarMarquee'
import screens from '@/shared/styles/screens'
import styled from 'styled-components'
import NewsMarquee from './components/NewsMarquee'
import NewsEmergency from './components/NewsEmergency'
// import { useHash } from '@/shared/hook/useHash';
// import { scrollToSection } from '@/utils';

const ScreenShield = () => {
  return (
    <div className='fixed z-10 inset-0'>
      <div id="ScreenShield" className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
    </div>
  )
}

export default function Navbar() {
  const [hasMarquee, setHasMarquee] = useState(false);
  const [openShield, setOpenShield] = useState(false);

  // const hash = useHash();
  // useEffect(() => {
  //   const section = hash.replace("#", "");
  //   if (section) {
  //     setTimeout(()=> {
  //       console.log('gogogo')
  //       scrollToSection(section)
  //     }, 3000)
  //   }
  // }, [hash]);

  return (
    <StyledHeaderPadding $hasMarquee={hasMarquee}>
      <header className="bg-white w-full z-20 shadow-elevation-3 relative">
        <NavbarTop setOpenShield={setOpenShield} openShield={openShield} />
        <NavbarBottom />
      </header>
      <NewsEmergency />
      {
        hasMarquee &&
        <NewsMarquee />
      }
      {
        openShield && <ScreenShield></ScreenShield>
      }
    </StyledHeaderPadding>
  )
}


const StyledHeaderPadding = styled.div`
  height: ${props => props.$hasMarquee ? 174 : 68}px;
  position: fixed;
  z-index: 100;
  width: 100%;

  @media(min-width: ${screens.tablet}) {
    position: relative;
    height: ${props => props.$hasMarquee ? 164 : 118}px;
  }
  @media(min-width: ${screens.laptop}) {
    height: ${props => props.$hasMarquee ? 180 : 130}px;
  }
  @media(min-width: ${screens.desktop}) {
    height: ${props => props.$hasMarquee ? 204 : 154}px;
  }
`
