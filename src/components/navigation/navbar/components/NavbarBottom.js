'use client'
import { Fragment, useState } from 'react'
import Container from '@/shared/layout/Container'
import { Popover, Transition } from '@headlessui/react'
import { NavLinkItems } from '../config'
import color from '@/shared/styles/color'
import { useRouter } from 'next/navigation';
import styled from 'styled-components'

export default function NavbarBottom() {

  const { push } = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(0)

  return (
    <Container className="hidden tablet:flex" style={{ backgroundColor: color.gray.gray9, boxShadow: `0px 4px 4px 0px #0000001A` }}>
      <div className="flex flex-row items-center w-full [&>*:not(:first-child)]:border-l">
        {
          NavLinkItems.map((nav, index) => {

            const hasChildren = !!nav.children;

            return <Popover
              key={index}
              onMouseOver={() => setMobileMenuOpen(index + 1)}
              onMouseOut={() => setMobileMenuOpen(0)}
              className={`relative basis-1/${NavLinkItems.length} w-full tablet:h-[40px] desktop:h-[50px] text-center hover:bg-gray-gray8 border-solid border-gray-gray6`}>
              <div
                onClick={() => {
                  if (!hasChildren) {
                    console.log(nav.link);
                    window.open(nav.link);
                  }
                }}
                className="inline-flex items-center justify-center text-primary-blue1 font-bold cursor-pointer desktop:text-xl tablet:h-[40px] desktop:h-[50px]">
                {nav.label}
              </div>
              <Transition
                as={Fragment}
                show={(mobileMenuOpen === index + 1 && hasChildren)}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="fixed left-1/2 z-10 mt-1/2 flex w-screen -translate-x-1/2">
                  <div className="w-full flex-auto overflow-hidden  bg-white leading-6 shadow-lg ">
                    <div className="flex flex-row gap-5 justify-center h-[60px] items-center">
                      {
                        !!nav.children && nav.children.map((child, cIndex) => {
                          return (<StyledNavItem
                            key={child.label+cIndex}
                            onClick={() => window.open(child.link)}
                            className='desktop:text-xl tablet:min-w-[100px] laptop:min-w-[140px] desktop:min-w-[180px]'>
                            {child.label}
                          </StyledNavItem>)
                        })
                      }
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          })
        }
      </div>
    </Container>
  )
}

const StyledNavItem = styled.div`
  border-bottom: 2px solid ${color.gray.gray5};
  cursor: pointer;
  font-weight: bold;
  color: ${color.primary.blue1};
  text-align: left;
  transition: all .2s;
  height: fit-content;
  &:hover {
    padding-bottom: 5px;
  }
`