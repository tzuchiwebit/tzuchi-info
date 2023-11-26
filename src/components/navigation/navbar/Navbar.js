'use client'

import { Fragment, useState } from 'react'
import NavbarTop from './components/NavbarTop'
import NavbarBottom from './components/NavbarBottom'

export default function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <>
      <header className="bg-white">
        <NavbarTop />
        <NavbarBottom />
      </header>

    </>
  )
}
