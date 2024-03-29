'use client'

import { Fragment, useState } from 'react'
import NavbarTop from './components/NavbarTop'
import NavbarBottom from './components/NavbarBottom'
import NavbarMarquee from './components/NavbarMarquee'
import screens from '@/shared/styles/screens'
import styled from 'styled-components'

export default function Navbar() {

  const [hasMarquee, setHasMarquee] = useState(true);
  // const [openCloudTagSearch, setOpenCloudTagSearch] = useState(false);

  return (
    <StyledHeaderPadding $hasMarquee={hasMarquee}>
      <header className="bg-white fixed w-full z-20 shadow-elevation-3">
        <NavbarTop />
        <NavbarBottom />
        {
          hasMarquee ? <NavbarMarquee /> : <></>
        }
      </header>
    </StyledHeaderPadding>
  )
}


const StyledHeaderPadding = styled.div`
  height: ${props => props.$hasMarquee ? 174 : 134}px;
  @media(min-width: ${screens.tablet}) {
    height: ${props => props.$hasMarquee ? 154 : 118}px;
  }
  @media(min-width: ${screens.laptop}) {
    height: ${props => props.$hasMarquee ? 170 : 130}px;
  }
  @media(min-width: ${screens.desktop}) {
    height: ${props => props.$hasMarquee ? 194 : 154}px;
  }
`