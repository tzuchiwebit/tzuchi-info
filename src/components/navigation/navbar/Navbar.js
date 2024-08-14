'use client'

import { Fragment, useState } from 'react'
import NavbarTop from './components/NavbarTop'
import NavbarBottom from './components/NavbarBottom'
import NavbarMarquee from './components/NavbarMarquee'
import screens from '@/shared/styles/screens'
import styled from 'styled-components'
import NewsMarquee from './components/NewsMarquee'

const ScreenShield = () => {
  return (
    <div className='fixed z-10 inset-0'>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
    </div>
  )
}

export default function Navbar() {
  const [hasMarquee, setHasMarquee] = useState(false);
  const [openShield, setOpenShield] = useState(false);
  // const [openCloudTagSearch, setOpenCloudTagSearch] = useState(false);

  return (
    <StyledHeaderPadding $hasMarquee={hasMarquee}>
      <header className="bg-white w-full z-20 shadow-elevation-3 relative">
        <NavbarTop setOpenShield={setOpenShield} openShield={openShield} />
        <NavbarBottom />
        {
          hasMarquee &&
          <NewsMarquee />
        }
      </header>
      {
        openShield && <ScreenShield></ScreenShield>
      }
    </StyledHeaderPadding>
  )
}


const StyledHeaderPadding = styled.div`
  height: ${props => props.$hasMarquee ? 174 : 134}px;
  position: relative;
  z-index: 100;
  @media(min-width: ${screens.tablet}) {
    height: ${props => props.$hasMarquee ? 164 : 118}px;
  }
  @media(min-width: ${screens.laptop}) {
    height: ${props => props.$hasMarquee ? 180 : 130}px;
  }
  @media(min-width: ${screens.desktop}) {
    height: ${props => props.$hasMarquee ? 204 : 154}px;
  }
`
