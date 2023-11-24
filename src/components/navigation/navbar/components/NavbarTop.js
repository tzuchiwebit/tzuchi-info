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
import { HeaderLinkItems } from '../config'
import color from '@/shared/styles/color'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DropDownMenu = () => (<Menu as="div" className="relative inline-block text-left">
  {({ open }) => (
    <>
      {/* ring-1 ring-inset ring-gray-300 */}
      <div>
        <Menu.Button
          className={classNames(
            open ? 'bg-complementary-blue2 text-primary-blue1 border-transparent' : 'bg-white text-gray-text border-gray-gray7',
            "border border-solid inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 font-semibold whitespace-nowrap"
          )}>
          功能選單
          {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-text transition-all" style={{transform: open ? 'rotate(180deg)' : 'rotate(0)'}} aria-hidden="true" /> */}
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
  return (
    <>
      <Container>
        <nav className="mx-auto flex max-w-7xl items-center justify-between h-16 desktop:h-19 " aria-label="Global">
          {/* grid layout */}
          <div className="flex flex-row w-full gap-2 items-center justify-between px-4 container:px-0">
            <div className="flex-none w-[110px] tablet:w-[165px] laptop:w-[230px]">
              <a href="#" className="">
                <span className="sr-only">慈濟資訊網</span>
                <Icon.LOGO width="100%" />
              </a>
            </div>
            <div className="hidden tablet:flex flex-row gap-2 h-10 items-center w-[670px]">
              <div className="w-2/3 flex justify-end items-center relative">
                <input
                  placeholder="關鍵字搜尋"
                  className="border border-gray-400 rounded-lg px-2 py-1.5 w-full laptop:w-[300px] tablet:w-[200px]"
                />
                <Icon.Search width="100%" className="absolute mr-2 w-6 text-gray-gray4" />
                {/* <img src="/icons/search.svg" className="absolute mr-2 w-10" alt="Search Icon" /> */}
              </div>
              <div className="w-full flex flex-row items-center">
                <a href="#" className="text-primary-blue1 flex px-1 font-semibold whitespace-nowrap">
                  <Icon.Add width="20" /> 進階搜尋
                </a>
                {
                  HeaderLinkItems.map((item, index) => (
                    <Fragment key={index}>
                      <div className="border-l border-gray-text border-solid h-[16px]"></div>
                      <a href={item.link} className="text-gray-text px-1 hover:font-semibold whitespace-nowrap">
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
                marginRight: -10,
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

      <Dialog as="div" className="tablet:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-16 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
