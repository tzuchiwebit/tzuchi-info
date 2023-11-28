'use client'
import { Fragment, useState } from 'react'
import Container from '@/shared/layout/Container'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  ChartPieIcon,
  Bars3Icon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Icon from '@/shared/Icon'
import { HeaderLinkItems, NavLinkItems } from '../config'
import color from '@/shared/styles/color'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DropDownMenu = () => (<Menu as="div" className="relative inline-block text-left">
  {({ open }) => (
    <>
      <div>
        <Menu.Button
          className={classNames(
            open ? 'bg-complementary-blue2 text-primary-blue1 border-transparent' : 'bg-white text-gray-text border-gray-gray7',
            "border border-solid inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 font-semibold whitespace-nowrap"
          )}>
          功能選單
          <Icon.UpArrow className="-mr-1 h-5 w-5 text-gray-text transition-all" style={{ transform: open ? 'rotate(0)' : 'rotate(180deg)' }} aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 -mt-1 w-full divide-solid divide-y-2 divide-gray-gray8 origin-top-right bg-white shadow-lg ring-2 ring-black ring-opacity-5 focus:outline-none">
          {
            HeaderLinkItems.map((item, index) => (<div className="" key={index}>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={item.link}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 font-semibold text-primary-blue1 hover:bg-complementary-blue2'
                    )}
                  >
                    {item.label}
                  </a>
                )}
              </Menu.Item>
            </div>))
          }
        </Menu.Items>
      </Transition>
    </>
  )}

</Menu>)

export default function NavbarTop() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentDialogIndex, setCurrentDialogIndex] = useState(-1);

  return (
    <>
      <div className="h-1 w-full bg-gradient-to-r from-primary-blue1 to-primary-linear"></div>
      <Container>
        <nav className="mx-auto flex max-w-7xl items-center justify-between h-16 desktop:h-19 " aria-label="Global">
          {/* grid layout */}
          <div className="flex flex-row w-full gap-2 items-center justify-between px-4 container:px-0">
            <div className="flex-none w-[128px] tablet:w-[165px] laptop:w-[230px] pr-2 border-r border-solid border-gray-gray8 tablet:border-none">
              <a href="#" className="">
                <span className="sr-only">慈濟資訊網</span>
                <Icon.LOGO width="100%" />
              </a>
            </div>
            <div className="hidden tablet:flex flex-row gap-2 h-10 items-center w-[670px]">
              <div className="w-2/3 flex justify-end items-center relative">
                <input
                  placeholder="關鍵字搜尋"
                  className="border border-gray-400 rounded-sm px-2 py-1.5 w-full laptop:w-[300px] tablet:w-[200px]"
                />
                <Icon.Search width="100%" className="absolute mr-2 w-6 text-gray-gray4 cursor-pointer" />
                {/* <img src="/icons/search.svg" className="absolute mr-2 w-10" alt="Search Icon" /> */}
              </div>
              <div className="w-full flex flex-row items-center">
                {/* <a href="#" className="text-primary-blue1 flex px-1 font-semibold whitespace-nowrap">
                  <Icon.Add width="20" /> 進階搜尋
                </a> */}
                {
                  HeaderLinkItems.map((item, index) => (
                    <Fragment key={index}>
                      <div className={classNames(
                        index !== 0 ? 'border-l' : '',
                        'border-gray-text border-solid h-[16px]'
                      )}></div>
                      <a href={item.link} className="text-gray-text px-1 hover:font-medium whitespace-nowrap" target='_blank'>
                        {item.label}
                      </a>
                    </Fragment>
                  ))
                }
              </div>
            </div>
          </div>
          {/* mobile layout */}
          <div className="flex gap-4 tablet:hidden items-center">
            <DropDownMenu />
            <button
              type="button"
              className="w-16 h-16 flex flex-row justify-center items-center"
              style={{
                backgroundColor: mobileMenuOpen ? color.complementary.blue2 : 'transparent',
                color: mobileMenuOpen ? color.primary.blue1 : color.gray.gray4,
              }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Icon.Menu width="32px" />
            </button>
          </div>
        </nav>
      </Container>
      {/* <div className="hidden tablet:block h-1 w-full bg-gradient-to-r from-primary-blue1 to-primary-linear"></div> */}

      {/* shows on mobile */}
      <div className="w-full flex justify-end items-center relative tablet:hidden">
        <input
          placeholder="關鍵字搜尋"
          className="border-2 border-gray-gray8 px-2 py-1.5 w-full h-[50px] text-lg"
        />
        <Icon.Search width="100%" className="absolute mr-2 w-8 text-primary-blue1 cursor-pointer" />
        {/* <img src="/icons/search.svg" className="absolute mr-2 w-10" alt="Search Icon" /> */}
      </div>
      <Dialog as="div" className="tablet:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed h-fit inset-y-16 right-0 z-10 w-[270px] overflow-y-auto bg-white shadow-elevation-4 ">
          <div className="flow-root">
            <div className="divide-y-2 divide-gray-gray8 divide-solid transition-all">
              {NavLinkItems.map((nav, index) => {

                const isDisclosure = !!(nav?.children);

                return (<div className="" key={index}>
                  <Disclosure as="div" className="">
                    <>
                      <Disclosure.Button
                        className="flex gap-2 w-full items-center justify-start py-2 pl-5 font-semibold leading-7 text-gray-900 hover:bg-complementary-blue2 "
                        onClick={() => {
                          if (!isDisclosure) {
                            return window.open(nav.link, '_blank');
                          } else if (currentDialogIndex === index) {
                            return setCurrentDialogIndex(-1);
                          }
                          setCurrentDialogIndex(index);
                        }}
                      >
                        <Icon.CyanTriangle
                          className="transition-all"
                          width="12px"
                          style={{ transform: (isDisclosure && currentDialogIndex === index) ? 'rotate(90deg)' : '' }}
                        /> {nav.label}
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
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

    </>
  )
}
