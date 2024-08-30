'use client'
import { Fragment, useEffect, useRef, useState } from 'react'
import color from '@/shared/styles/color'
import Icon from '@/shared/Icon'
import { Transition, Disclosure } from '@headlessui/react'
import * as classnames from 'classnames'
import { HeaderLinkItems, NavLinkItems } from '../../../config'

export default function HamburgMenu({ navRef, hamburgMenuOpen, setHamburgMenuOpen, setOpenShield }) {
  const [currentDialogIndex, setCurrentDialogIndex] = useState(-1);
  const menuBtnRef = useRef(null)
  const menuOpenRef = useRef(null)

  const handleClick = (event) => {
    if (navRef?.current?.contains(event.target)) {
      // click navbar
      if (menuOpenRef?.current?.contains(event.target) || menuBtnRef?.current?.contains(event.target)) {
        // do nothing
      } else {
        setHamburgMenuOpen(false)
        setOpenShield(false)
      }
    } else {
      // click outside, 全關
      setOpenShield(false)
      setHamburgMenuOpen(false)
    }
  }

  useEffect(() => {
    if (hamburgMenuOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }
  }, [hamburgMenuOpen])

  return (
    <>
      <button ref={menuBtnRef}
        type="button"
        className="w-[58px] h-[58px] flex flex-row justify-center items-center"
        style={{
          backgroundColor: hamburgMenuOpen ? color.complementary.blue2 : 'transparent',
          color: hamburgMenuOpen ? color.primary.blue1 : color.gray.gray4,
        }}
        onClick={() => {
          setHamburgMenuOpen(!hamburgMenuOpen);
          setOpenShield(!hamburgMenuOpen)
        }}
      >
        <span className="sr-only">Open main menu</span>
        <Icon.Menu width="32px" />
      </button>

      <div ref={menuOpenRef} className={classnames('w-[270px] absolute shadow-elevation-4 bg-white right-0 top-[62px] border-2 border-gray-gray8 border-solid', !hamburgMenuOpen && 'hidden' )}>
        <Transition
          as={Fragment}
          show={hamburgMenuOpen}
          className=" tablet:hidden bg-white transition-all duration-300 overflow-hidden"
          enterFrom="transform -tranlateY-50 opacity-0 max-h-0"
          enterTo="transform tranlateY-0 opacity-100 max-h-[1000px]"
          leaveFrom="transform tranlateY-0 opacity-100 max-h-[1000px]"
          leaveTo="transform -tranlateY-50 opacity-0 max-h-0"
        >
          <div className="flow-root px-1">
            <div className="divide-y-2 divide-gray-gray8 divide-solid transition-all">
              {NavLinkItems.map((nav, index) => {
                const isDisclosure = !!(nav?.children);

                return (<div className="" key={index}>
                  <Disclosure as="div" className="">
                    <>
                      <Disclosure.Button
                        className="flex gap-x-2 w-full items-center justify-start py-2 pl-5 font-semibold leading-7 text-primary-blue1 hover:bg-complementary-blue2 "
                        onClick={() => {
                          if (!isDisclosure) {
                            return window.open(nav.link, '_blank');
                          } else if (currentDialogIndex === index) {
                            return setCurrentDialogIndex(-1);
                          }
                          setCurrentDialogIndex(index);
                        }}
                      >
                        {
                          !!nav?.children?.length &&
                          <Icon.CyanTriangle className="transition-all"
                            width="12px"
                            style={{
                              visibility: nav?.children?.length ? 'visible' : 'hidden',
                              transform: (isDisclosure && currentDialogIndex === index) ? 'rotate(90deg)' : '',
                            }}
                          />
                        }
                        {nav.label}
                      </Disclosure.Button>
                      <Transition
                        show={isDisclosure && (currentDialogIndex === index)}
                        enter="transition-height duration-500 ease-in-out"
                        enterFrom="h-0"
                        enterTo="h-auto"
                        leave="transition-height duration-0 "
                        leaveFrom="h-auto"
                        leaveTo="h-0"
                      >
                        <Disclosure.Panel className="px-3 py-1 bg-primary-blue3">
                          <div className="divide-y divide-gray-gray8 divide-solid">
                            {nav?.children && nav.children.map((item) => (
                              <Disclosure.Button
                                key={item.label}
                                as="a"
                                href={item.link}
                                target='_blank'
                                className="block py-2 pl-1 text-white"
                              >
                                {item.label}
                              </Disclosure.Button>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  </Disclosure>
                </div>)
              })}

              {HeaderLinkItems.map((nav, index) => {
                return (<div className="" key={index}>
                  <Disclosure as="div" className="">
                    <Disclosure.Button
                      className={classnames('flex gap-2 w-full items-center justify-start py-2 pl-5 font-normal leading-7 text-primary-blue1 hover:bg-complementary-blue2', index === 0 ? 'pt-8' : '')}
                      onClick={() => window.open(nav.link, '_blank')}
                    >
                      {nav.label}
                    </Disclosure.Button>
                  </Disclosure>
                </div>)
              })}
            </div>
          </div>
        </Transition>
      </div>
    </>
  )
}
