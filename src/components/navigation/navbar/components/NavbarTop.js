'use client'
import { Fragment, useEffect, useRef, useState } from 'react'
import Container from '@/shared/layout/Container'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import Icon from '@/shared/Icon'
import { HeaderLinkItems, NavLinkItems, AnchorLinkItems } from '../config'
import color from '@/shared/styles/color'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CloudTag from '@/shared/tag/CloudTag'
import routes from '@/config/routes'
import OutsideClickHandler from '@/utils/OutsideClickHandler'
import jsonApi from '@/api/jsonApi'
import useScreenSize from '@/shared/hook/useScreenSize';
import * as classnames from "classnames"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SearchMenu = ({ navRef, openShield, setOpenShield, searchMenuOpen, setSearchMenuOpen, setOpenCloudTagSearch, openCloudTagSearch, searchText, setSearchText, cloudTags = [] }) => {
  const router = useRouter();
  const menuBtnRef = useRef(null)
  const menuOpenRef = useRef(null)

  const handleClick = (event) => {
    // console.log('navRef.click:', navRef?.current?.contains(event.target))
    // console.log('menuBtnRef.click:', menuBtnRef?.current?.contains(event.target))
    // console.log('menuOpenRef.click:', menuOpenRef?.current?.contains(event.target))

    if (navRef?.current?.contains(event.target)) {
      // click navbar
      if (menuOpenRef?.current?.contains(event.target) || menuBtnRef?.current?.contains(event.target)) {
        // do nothing
      } else {
        setSearchMenuOpen(false)
      }
    } else {
      // click outside, 全關
      setOpenShield(false)
      setSearchMenuOpen(false)
    }
  }

  useEffect(() => {
    if (searchMenuOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }
  }, [searchMenuOpen])

  useEffect(() => {
    if (!searchMenuOpen) {
      setOpenCloudTagSearch(false)
    }
  }, [searchMenuOpen])

  return (
    <>
      <button
        ref={menuBtnRef}
        type="button"
        className="w-[58px] h-[58px] flex flex-row justify-center items-center"
        style={{
          backgroundColor: searchMenuOpen ? color.complementary.blue2 : 'transparent',
          color: searchMenuOpen ? color.primary.blue1 : color.gray.gray4,
        }}
        onClick={() => {
          setSearchMenuOpen(!searchMenuOpen)
          setOpenShield(!searchMenuOpen)
        }}
      >
        <span className="sr-only">Open main menu</span>
        <Icon.Search width="32px" />
      </button>

      <div ref={menuOpenRef} className={classnames('absolute shadow-elevation-4 bg-white w-full left-0 top-[62px] border-2 border-gray-gray8 border-solid', !searchMenuOpen && 'hidden' )}>

        <Transition
          as={Fragment}
          show={searchMenuOpen}
          className="w-full tablet:hidden bg-white transition-all duration-300 overflow-hidden px-3 pb-3"
          enterFrom="transform -tranlateY-50 opacity-0 max-h-0"
          enterTo="transform tranlateY-0 opacity-100 max-h-[1000px]"
          leaveFrom="transform tranlateY-0 opacity-100 max-h-[1000px]"
          leaveTo="transform -tranlateY-50 opacity-0 max-h-0"
        >
          <div className=' flex flex-col tablet:hidden p-3 gap-1 '>
            <div className='w-full flex items-end'>
              {/* 熱門快搜 */}
              <CloudTagSearchButton setOpenCloudTagSearch={setOpenCloudTagSearch} openCloudTagSearch={openCloudTagSearch} />

              {/* 關鍵字搜尋 */}
              <div className="w-full flex flex-1 justify-end items-center relative tablet:hidden">
                <input
                  placeholder="關鍵字搜尋"
                  className="border-2 border-gray-gray4 px-2 py-1.5 w-full h-[40px] text-lg rounded bg-transparent"
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  value={searchText}
                />
                <Icon.Search
                  width="100%"
                  className="absolute mr-[2px] w-9 p-1 text-primary-blue1 cursor-pointer bg-gray-gray8 rounded-r"
                  onClick={() => onKeywordSearch()}
                />
              </div>
            </div>
          </div>
        </Transition>

        {/* 熱門快搜 dropdown menu */}
        <Transition
          // as={Fragment}
          show={openCloudTagSearch}
          className="w-full tablet:hidden bg-white transition-all duration-300 overflow-hidden px-3 pb-3"
          enterFrom="transform -tranlateY-50 opacity-0 max-h-0"
          enterTo="transform tranlateY-0 opacity-100 max-h-[1000px]"
          leaveFrom="transform tranlateY-0 opacity-100 max-h-[1000px]"
          leaveTo="transform -tranlateY-50 opacity-0 max-h-0"
        >
          <div className={'flex flex-row flex-wrap gap-x-1 gap-y-2 overflow-hidden mt-3 tablet:mt-0 tablet-down:justify-end'}
            style={{
              // width: navbarTopWidth
            }}
          >
            {
              cloudTags.map((item, index) => (
                <CloudTag
                  label={item["關鍵字"]}
                  // bgColor={item["底色"]}
                  // textColor={item["字色"]}
                  bgColor={color.complementary.blue2}
                  textColor={color.primary.blue1}
                  key={index}
                  onClick={() => {
                    router.push(`${routes.SEARCH}?keyword=${item["關鍵字"]}`)
                    setOpenCloudTagSearch(false);
                    setOpenShield(false)
                    setSearchMenuOpen(false);
                  }}
                />
              ))
            }
          </div>
        </Transition>
      </div>
  </>
  )
}

const HamburgMenu = ({ hamburgMenuOpen, setHamburgMenuOpen, setOpenShield }) => {
  const [currentDialogIndex, setCurrentDialogIndex] = useState(-1);

  return (
    <>
      <button
        type="button"
        className="w-[58px] h-[58px] flex flex-row justify-center items-center"
        style={{
          backgroundColor: hamburgMenuOpen ? color.complementary.blue2 : 'transparent',
          color: hamburgMenuOpen ? color.primary.blue1 : color.gray.gray4,
        }}
        onClick={() => {
          setHamburgMenuOpen(!hamburgMenuOpen);
          setOpenShield(true)
        }}
      >
        <span className="sr-only">Open main menu</span>
        <Icon.Menu width="32px" />
      </button>

      <Dialog as="div" className="tablet:hidden" open={hamburgMenuOpen} onClose={() => { setOpenShield(false) }}>
        <OutsideClickHandler onOutsideClick={() => setHamburgMenuOpen(false)}>
          <Dialog.Panel className="fixed h-fit inset-y-[62px] right-0 z-[100] w-[270px] overflow-y-auto bg-white shadow-elevation-4 ">
            <div className="flow-root">
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
          </Dialog.Panel>
        </OutsideClickHandler>
      </Dialog>
    </>
  )
}

const CloudTagSearchButton = ({ setOpenCloudTagSearch, openCloudTagSearch }) => {
  return (
    <>
      <button
        className="w-[110px] flex items-center justify-between relative border-b border-solid border-gray-gray7 py-1 mr-2"
        onClick={() => { setOpenCloudTagSearch(!openCloudTagSearch) }}
        >
        <span className='whitespace-nowrap text-lg text-primary-blue1 font-bold'>熱門快搜</span>
        <Icon.UpArrow style={{ width: 20, transition: 'all .15s', transform: openCloudTagSearch ? '' : 'rotate(180deg)' }} />
      </button>
    </>
  )
}

const DropDownMenu = ({ openShield, navRef, setOpenShield, searchMenuOpen, hamburgMenuOpen }) => {
  const menuRef = useRef(null)

  return (
    <Menu ref={menuRef} as="div" className="relative z-[999] inline-block text-left">
      {({ open }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (!open) {
            setOpenShield(false)
          }
        }, [open])

        return (
          <>
            <div>
              <Menu.Button
                onClick={() => {
                  setOpenShield(!open);
                }}
                className={classnames(
                  open ? 'bg-complementary-blue2 text-primary-blue1 border-transparent' : 'bg-white text-gray-text border-gray-gray7',
                  "border border-solid inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 font-semibold whitespace-nowrap"
                )}>
                首頁分類
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
                  AnchorLinkItems.map((item, index) => (<div className="" key={index}>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => {
                            document.querySelector(item.link)?.scrollIntoView({ behavior: 'smooth' })
                            setOpenShield(!open)
                          }}
                          className={classnames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 font-semibold text-primary-blue1 hover:bg-complementary-blue2'
                          )}
                        >
                          {item.label}
                        </div>
                      )}
                    </Menu.Item>
                  </div>))
                }
              </Menu.Items>
            </Transition>
          </>
        )
      }}
    </Menu>
  )
}

const CategoryMenu = ({ openShield, navRef, setOpenShield, setCategoryMenuOpen, categoryMenuOpen }) => {
  const menuBtnRef = useRef(null)
  const menuOpenRef = useRef(null)

  const handleClick = (event) => {
    console.log('navRef.click:', navRef?.current?.contains(event.target))
    console.log('menuBtnRef.click:', menuBtnRef?.current?.contains(event.target))
    console.log('menuOpenRef.click:', menuOpenRef?.current?.contains(event.target))

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
                document.querySelector(item.link)?.scrollIntoView({ behavior: 'smooth' })
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

export default function NavbarTop({ setOpenShield, openShield }) {
  const navRef = useRef(null)
  const [hamburgMenuOpen, setHamburgMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)
  const [openCloudTagSearch, setOpenCloudTagSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loadingCloudTags, setLoadingCloudTags] = useState(false);
  const [cloudTags, setCloudTags] = useState([]);
  // console.log(`cloudTags`)
  // console.log(cloudTags)

  /**
   * @deprecated
   */
  const [navbarTopWidth, setNavbarTopWidth] = useState('auto');

  const upperRef = useRef();
  const router = useRouter();
  const screenSize = useScreenSize();

  const getCloudTags = async () => {
    setLoadingCloudTags(true)
    try {
      const res = await jsonApi.getCloudTags();
      setCloudTags(res?.data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCloudTags(false)
    }
  }

  useEffect(() => {
    if (upperRef?.current?.clientWidth) {
      setNavbarTopWidth(upperRef.current.clientWidth)
    }
    getCloudTags();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (upperRef?.current?.clientWidth) {
        setNavbarTopWidth(upperRef.current.clientWidth)
      } else {
        setNavbarTopWidth('100%')
      }
      getCloudTags();
    }, 1000)
  }, [screenSize.width])

  const onKeywordSearch = () => {
    return router.push(`${routes.SEARCH}?keyword=${searchText}`)
  }

  return (
    <>
      <div className="h-1 w-full bg-gradient-to-r from-primary-blue1 to-primary-linear"></div>

      {/* navbar: first row */}
      <Container noPadding>
        <nav ref={navRef} className="mx-auto flex items-center justify-between tablet:py-4" aria-label="Global">
          {/* grid layout */}
          <div className="tablet-down:ml-3 flex flex-row w-full gap-x-1 justify-between">
            {/* logo */}
            <div className="flex-none w-[114px] tablet:w-[157px] laptop:w-[217px] desktop:w-[372px] desktop:self-start">
              <Link href="/" className="">
                <span className="sr-only">慈濟資訊網</span>
                <Icon.LOGO className="hidden desktop:block" width="100%" onClick={() => router.push('/')} />
                <Icon.LOGOMobile className="desktop:hidden" width="100%" onClick={() => router.push('/')} />
              </Link>
            </div>

            <div className='desktop:w-16 laptop:w-11 tablet:w-4'></div>

            {/* right side nav */}
            <div className='grow-0 hidden tablet:flex flex-col gap-x-2'>
              <div className="flex flex-row gap-x-2 h-[52.3px] justify-end w-full" ref={upperRef}>
                {/* 熱門快搜 */}
                <CloudTagSearchButton setOpenCloudTagSearch={setOpenCloudTagSearch} openCloudTagSearch={openCloudTagSearch} />

                {/* 關鍵字搜尋 */}
                <div className="w-auto flex justify-end items-center relative">
                  <input
                    placeholder="關鍵字搜尋"
                    className="border-2 border-gray-gray6 rounded-md px-2 py-1.5 w-full laptop:w-[300px] tablet:w-[160px] bg-transparent"
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                    value={searchText}
                  />
                  <Icon.Search
                    width="100%"
                    className="absolute mr-[2px] p-1 w-9 bg-gray-gray8 text-primary-blue1 cursor-pointer rounded-r"
                    onClick={() => onKeywordSearch()}
                  />
                </div>

                {/* header 連結 */}
                <div className="w-auto flex-0 flex flex-row items-center justify-end">
                  {
                    HeaderLinkItems.map((item, index) => (
                      <Fragment key={index}>
                        <div className={classNames(
                          index !== 0 ? 'border-l' : '',
                          'border-gray-text border-solid h-[16px]'
                        )}></div>
                        <a href={item.link} className="text-primary-blue2 laptop:px-2 px-1 hover:font-medium whitespace-nowrap hover:text-primary-blue3 active:text-primary-blue1" target='_blank'>
                          {item.label}
                        </a>
                      </Fragment>
                    ))
                  }
                </div>
              </div>

              {/* 熱門快搜 dropdown menu */}
              <Transition
                // as={Fragment}
                show={openCloudTagSearch}
                className="transition-all duration-300 overflow-hidden"
                enterFrom="transform -tranlateY-50 opacity-0 max-h-0"
                enterTo="transform tranlateY-0 opacity-100 max-h-[1000px]"
                leaveFrom="transform tranlateY-0 opacity-100 max-h-[1000px]"
                leaveTo="transform -tranlateY-50 opacity-0 max-h-0"
              >
                <div className={'flex flex-row flex-wrap gap-x-1 gap-y-2 overflow-hidden mt-2'}
                style={{
                  // width: navbarTopWidth,
                }}
                >
                  {
                    cloudTags.map((item, index) => (
                      <CloudTag
                        label={item["關鍵字"]}
                        // bgColor={item["底色"]}
                        // textColor={item["字色"]}
                        bgColor={color.complementary.blue2}
                        textColor={color.primary.blue1}
                        key={index}
                        onClick={() => {
                          router.push(`${routes.SEARCH}?keyword=${item["關鍵字"]}`)
                          setOpenCloudTagSearch(false)
                        }}
                      />
                    ))
                  }
                </div>
              </Transition>
            </div>
          </div>

          {/* mobile device only */}
          <div className="flex tablet:hidden items-center">
            {/* 首頁分類 */}
            {/* <DropDownMenu navRef={navRef} setOpenShield={setOpenShield} openShield={openShield} searchMenuOpen={searchMenuOpen} hamburgMenuOpen={hamburgMenuOpen} /> */}
            <CategoryMenu navRef={navRef} setOpenShield={setOpenShield} openShield={openShield} categoryMenuOpen={categoryMenuOpen} setCategoryMenuOpen={setCategoryMenuOpen}></CategoryMenu>

            <div className='flex flex-row ml-2'>
              <SearchMenu navRef={navRef} searchMenuOpen={searchMenuOpen} setSearchMenuOpen={setSearchMenuOpen}
                setOpenCloudTagSearch={setOpenCloudTagSearch} openCloudTagSearch={openCloudTagSearch}
                searchText={searchText} setSearchText={setSearchText}
                cloudTags={cloudTags} setOpenShield={setOpenShield} openShield={openShield}
              />

              <HamburgMenu hamburgMenuOpen={hamburgMenuOpen} setHamburgMenuOpen={setHamburgMenuOpen} setOpenShield={setOpenShield}></HamburgMenu>
            </div>
          </div>
        </nav >
      </Container >
    </>
  )
}
