'use client'

import { Fragment, useState } from 'react'
import NavbarTop from './components/NavbarTop'
import NavbarBottom from './components/NavbarBottom'
import screens from '@/shared/styles/screens'
import styled from 'styled-components'

export default function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <StyledHeaderPadding>
      <header className="bg-white fixed w-full z-20 shadow-elevation-3">
        <NavbarTop />
        <NavbarBottom />
      </header>
    </StyledHeaderPadding>
  )
}


const StyledHeaderPadding = styled.div`
  height: 120px;
  @media(min-width: ${screens.tablet}) {
    height: 110px;
  }
  @media(min-width: ${screens.laptop}) {
    height: 102px;
  }
  @media(min-width: ${screens.desktop}) {
    height: 150px;
  }
`