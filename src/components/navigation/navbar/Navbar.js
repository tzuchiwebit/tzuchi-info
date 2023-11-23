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
        <div className="h-1 w-full bg-gradient-to-r from-primary-blue1 to-primary-linear"></div>
        <NavbarBottom />
      </header>

    </>
  )
}
