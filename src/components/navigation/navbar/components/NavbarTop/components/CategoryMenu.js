'use client'
import { Fragment, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import * as classnames from "classnames"
import Icon from '@/shared/Icon'
import { Transition } from '@headlessui/react'
import { AnchorLinkItems } from '../../../config'

export default function CategoryMenu({ openShield, navRef, setOpenShield, setCategoryMenuOpen, categoryMenuOpen }) {
  const menuBtnRef = useRef(null)
  const menuOpenRef = useRef(null)
  const router = useRouter()

  const handleClick = (event) => {
    if (navRef?.current?.contains(event.target)) {
      // click navbar
      if (menuOpenRef?.current?.contains(event.target) || menuBtnRef?.current?.contains(event.target)) {
        // do nothing
      } else {
        setCategoryMenuOpen(false)
        setOpenShield(false)
      }
    } else {
      // click outside, 全關
      setOpenShield(false)
      setCategoryMenuOpen(false)
    }
  }

  useEffect(() => {
    if (categoryMenuOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }
  }, [categoryMenuOpen])

  return (
    <div>
      <div ref={menuBtnRef}
        onClick={() => {
          setCategoryMenuOpen(!categoryMenuOpen)
          setOpenShield(!categoryMenuOpen)
        }}
        className={classnames(
          categoryMenuOpen ? 'bg-complementary-blue2 text-primary-blue1 border-transparent' : 'bg-white text-gray-text border-gray-gray7',
          "border border-solid inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 font-semibold whitespace-nowrap"
        )}>
        首頁分類
        <Icon.UpArrow className="-mr-1 h-5 w-5 text-gray-text transition-all" style={{ transform: categoryMenuOpen ? 'rotate(0)' : 'rotate(180deg)' }} aria-hidden="true" />
      </div>

      <Transition
        as={Fragment}
        show={categoryMenuOpen}
        className="tablet:hidden bg-white transition-all duration-300 overflow-hidden"
        enterFrom="transform -tranlateY-50 opacity-0 max-h-0"
        enterTo="transform tranlateY-0 opacity-100 max-h-[1000px]"
        leaveFrom="transform tranlateY-0 opacity-100 max-h-[1000px]"
        leaveTo="transform -tranlateY-50 opacity-0 max-h-0"
      >
        <div ref={menuOpenRef} className={classnames('absolute w-[112px] z-10 divide-solid divide-y-2 divide-gray-gray8 origin-top-right bg-white shadow-lg ring-2 ring-black ring-opacity-5 focus:outline-none', !categoryMenuOpen && 'hidden' )}>
          {
            AnchorLinkItems.map((item, index) => (
              <div key={index} className={classnames('px-4 py-2 font-semibold text-primary-blue1 hover:bg-complementary-blue2')}
                onClick={() => {
                  if (document.getElementById(item.link)) {
                    document.getElementById(item.link)?.scrollIntoView({ behavior: 'smooth' })
                  } else {
                    // TODO: when not at home page
                    router.push(`/`)
                  }

                  setOpenShield(false)
                  setCategoryMenuOpen(false)
                }}
              >
                {item.label}
              </div>
            ))
          }
        </div>
      </Transition>
    </div>
  )
}
