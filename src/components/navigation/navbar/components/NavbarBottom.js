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
    <Container className="hidden tablet:flex border-y border-solid border-gray-gray7">
      {/* <div className="flex flex-row items-center w-full [&>*:not(:first-child)]:border-l-2"> */}
      <div className="flex flex-row items-center w-full">
        {
          NavLinkItems.map((nav, index) => {
            const hasChildren = !!nav.children;
            return <Fragment key={index}>
              <div className='w-[1px] tablet:h-[25px] desktop:h-[35px] border-l border-gray-gray7 border-solid' />
              <Popover
                onMouseOver={() => setMobileMenuOpen(index + 1)}
                onMouseOut={() => setMobileMenuOpen(0)}
                className={`cursor-pointer flex items-center justify-center basis-1/${NavLinkItems.length} w-full tablet:h-[40px] desktop:h-[60px] text-primary-blue1 hover:text-primary-blue2 text-center hover:bg-gray-gray9`}>
                <div
                  onClick={() => {
                    if (!hasChildren) {
                      console.log(nav.link);
                      window.open(nav.link);
                    }
                  }}
                  className="inline-flex items-center justify-center font-bold desktop:text-xl tablet:h-[40px] desktop:h-[50px]">
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
                  <Popover.Panel className="absolute left-0 z-10 tablet:mt-[102px] desktop:mt-[121px] flex w-screen">
                    <div className="w-full flex-auto overflow-hidden bg-gray-gray9 leading-6 shadow-elevation-4">
                      <div className="flex flex-row gap-5 justify-center h-[60px] items-center">
                        {
                          !!nav.children && nav.children.map((child, cIndex) => {
                            return (<StyledNavItem
                              key={child.label + cIndex}
                              onClick={() => push(child.link)}
                              className='desktop:text-xl tablet:min-w-[100px] laptop:min-w-[140px] desktop:min-w-[180px] hover:text-primary-blue2'>
                              {child.label}
                            </StyledNavItem>)
                          })
                        }
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
              {(index !== 0) ? <div className='w-[1px] tablet:h-[25px] desktop:h-[35px] border-l border-gray-gray7 border-solid' /> : <></>}
            </Fragment>
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
    // padding-bottom: 5px;
    border-bottom: 2px solid ${color.primary.blue2};
  }
`
