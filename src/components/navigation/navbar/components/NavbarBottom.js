'use client'
import { Fragment, useState } from 'react'
import Container from '@/shared/layout/Container'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import Icon from '@/shared/Icon'
import { NavLinkItems } from '../config'
import color from '@/shared/styles/color'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const solutions = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function NavbarTop() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(0)
  const [popoverItems, setPopoverItems] = useState(NavLinkItems[0].children || []);

  return (
    <Container style={{ backgroundColor: color.gray.gray9, boxShadow: `0px 4px 4px 0px #0000001A` }}>
      <div className="flex flex-row items-center w-full [&>*:not(:first-child)]:border-l">
        {
          NavLinkItems.map((nav, index) => (
            <Popover
              onMouseOver={() => setMobileMenuOpen(index + 1)}
              onMouseOut={() => setMobileMenuOpen(0)}
              className={`relative basis-1/${NavLinkItems.length} w-full tablet:h-[40px] laptop:h-[50px] text-center hover:bg-gray-gray8 border-solid border-gray-gray6`}>
              <div className="inline-flex items-center justify-center text-primary-blue1 font-bold cursor-pointer laptop:text-xl tablet:h-[40px] laptop:h-[50px]">
                {nav.label}
              </div>
              <Transition
                as={Fragment}
                show={mobileMenuOpen === index+1}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="fixed left-1/2 z-10 mt-1/2 flex w-screen -translate-x-1/2">
                  <div className="w-full flex-auto overflow-hidden  bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {index}
                      {solutions.map((item) => (
                        <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                          </div>
                          <div>
                            <a href={item.href} className="font-semibold text-gray-900">
                              {item.name}
                              <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          ))
        }
      </div>
    </Container>
  )
}
