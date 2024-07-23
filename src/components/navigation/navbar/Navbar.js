'use client'

import { Fragment, useState } from 'react'
import NavbarTop from './components/NavbarTop'
import NavbarBottom from './components/NavbarBottom'
import NavbarMarquee from './components/NavbarMarquee'
import screens from '@/shared/styles/screens'
import styled from 'styled-components'
import NewsMarquee from './components/NewsMarquee'

export default function Navbar() {

  const [hasMarquee, setHasMarquee] = useState(false);
  // const [openCloudTagSearch, setOpenCloudTagSearch] = useState(false);

  return (
    <StyledHeaderPadding $hasMarquee={hasMarquee}>
      <header className="bg-white w-full z-20 shadow-elevation-3">
        <NavbarTop />
        <NavbarBottom />
        {
          hasMarquee &&
          <NewsMarquee />
        }
      </header>
    </StyledHeaderPadding>
  )
}


const StyledHeaderPadding = styled.div`
  height: ${props => props.$hasMarquee ? 174 : 134}px;
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
