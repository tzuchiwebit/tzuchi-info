'use client'

import { useState, useEffect } from 'react'
import NavbarTop from './components/NavbarTop'
import NavbarBottom from './components/NavbarBottom'
// import NavbarMarquee from './components/NavbarMarquee'
import screens from '@/shared/styles/screens'
import styled from 'styled-components'
import NewsMarquee from './components/NewsMarquee'
import DataProvider from "./DataProvider"

const ScreenShield = () => {
  return (
    <div className='fixed z-10 inset-0'>
      <div id="ScreenShield" className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
    </div>
  )
}

export default function Navbar() {
  const [hasMarquee, setHasMarquee] = useState(false);
  const [hasEmergency, setHasEmergency] = useState(true);
  const [openShield, setOpenShield] = useState(false);

  return (
    <DataProvider>
      <StyledHeaderPadding $hasMarquee={hasMarquee}>
        <header className="bg-white w-full z-20 shadow-elevation-3 relative">
          <NavbarTop setOpenShield={setOpenShield} openShield={openShield} />
          <NavbarBottom />
        </header>
        {
          hasMarquee &&
          <NewsMarquee />
        }
        {
          openShield && <ScreenShield></ScreenShield>
        }
      </StyledHeaderPadding>
    </DataProvider>
  )
}


const StyledHeaderPadding = styled.div`
  height: ${props => props.$hasMarquee ? 174 : 58}px;
  position: fixed;
  z-index: 100;
  width: 100%;

  @media(min-width: ${screens.tablet}) {
    position: relative;
    height: ${props => props.$hasMarquee ? 164 : 124}px;
  }
  @media(min-width: ${screens.laptop}) {
    height: ${props => props.$hasMarquee ? 180 : 124}px;
  }
  @media(min-width: ${screens.desktop}) {
    height: ${props => props.$hasMarquee ? 204 : 150}px;
  }
`
