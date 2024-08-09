'use client'
import { Fragment, useEffect, useRef, useState } from 'react'
import Container from '@/shared/layout/Container'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import Icon from '@/shared/Icon'
import { HeaderLinkItems, NavLinkItems } from '../config'
import color from '@/shared/styles/color'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CloudTag from '@/shared/tag/CloudTag'
import routes from '@/config/routes'
import OutsideClickHandler from '@/utils/OutsideClickHandler'
import jsonApi from '@/api/jsonApi'
import { Linkfont } from '@/shared/styles/linkFont.js'

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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCloudTagSearch, setOpenCloudTagSearch] = useState(false);
  // console.log(`openCloudTagSearch`)
  // console.log(openCloudTagSearch)
  const [searchText, setSearchText] = useState('');

  const [loadingCloudTags, setLoadingCloudTags] = useState(false);
  const [cloudTags, setCloudTags] = useState([]);
  // console.log(`cloudTags`)
  // console.log(cloudTags)

  const [currentDialogIndex, setCurrentDialogIndex] = useState(-1);

  const [navbarTopWidth, setNavbarTopWidth] = useState('auto');

  const upperRef = useRef();

  const router = useRouter();

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

  const CloudTagSearchButton = () => (<button
    className="w-[110px] flex items-center justify-between relative border-b border-solid border-gray-gray7 py-1 mr-2"
    onClick={() => { setOpenCloudTagSearch(!openCloudTagSearch) }}
  >
    <span className='whitespace-nowrap text-lg text-primary-blue1 font-bold'>熱門快搜</span>
    <Icon.UpArrow style={{ width: 20, transition: 'all .15s', transform: openCloudTagSearch ? '' : 'rotate(180deg)' }} />
  </button>)

  const onKeywordSearch = () => {
    return router.push(`${routes.SEARCH}?keyword=${searchText}`)
  }

  return (
    <>
      <div className="h-1 w-full bg-gradient-to-r from-primary-blue1 to-primary-linear"></div>
      <Container>
        <nav className="mx-auto flex max-w-7xl items-center justify-between tablet:py-4" aria-label="Global">
          {/* grid layout */}
          <div className="flex flex-row w-full gap-x-2 justify-between container:px-0">
            {/* logo */}
            <div className="flex-none w-[165px] tablet:w-[165px] laptop:w-[225px] desktop:w-[380px] pr-2 desktop:self-start">
              <Link href="/" className="">
                <span className="sr-only">慈濟資訊網</span>
                <Icon.LOGO className="hidden desktop:block" width="100%" onClick={() => router.push('/')} />
                <Icon.LOGOMobile className="desktop:hidden" width="100%" onClick={() => router.push('/')} />
              </Link>
            </div>
            {/* right side nav */}
            <div className='w-auto hidden tablet:flex flex-col gap-x-2'>
              {/* upper section */}
              <div className="flex flex-row gap-x-2 h-[52.3px] justify-end w-full" ref={upperRef}>
                {/* cloud tags */}
                <CloudTagSearchButton />
                {/* search input */}
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
                {/* header navs */}
                <div className="w-auto flex-0 flex flex-row items-center justify-end">
                  {
                    HeaderLinkItems.map((item, index) => (
                      <Fragment key={index}>
                        <div className={classNames(
                          index !== 0 ? 'border-l' : '',
                          'border-gray-text border-solid h-[16px]'
                        )}></div>
                        <a href={item.link} className="text-gray-text laptop:px-2 px-1 hover:font-medium whitespace-nowrap" target='_blank'>
                          <Linkfont>{item.label}</Linkfont>
                        </a>
                      </Fragment>
                    ))
                  }
                </div>
              </div>
              <Transition
                // as={Fragment}
                show={openCloudTagSearch}
                className="transition-all duration-300 overflow-hidden"
                enterFrom="transform -tranlateY-50 opacity-0 max-h-0"
                enterTo="transform tranlateY-0 opacity-100 max-h-[1000px]"
                leaveFrom="transform tranlateY-0 opacity-100 max-h-[1000px]"
                leaveTo="transform -tranlateY-50 opacity-0 max-h-0"
              >
                <div className={'flex flex-row flex-wrap gap-x-1 gap-y-2 overflow-hidden mt-2'} style={{ width: navbarTopWidth }}>
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
              onClick={() => {
                // console.log(`mobileMenuOpen`)
                // console.log(mobileMenuOpen)
                setMobileMenuOpen(!mobileMenuOpen);
              }}
            >
              <span className="sr-only">Open main menu</span>
              <Icon.Menu width="32px" />
            </button>
          </div>
        </nav >
      </Container >
      {/* <div className="hidden tablet:block h-1 w-full bg-gradient-to-r from-primary-blue1 to-primary-linear"></div> */}

      {/* shows on mobile */}
      <div className='w-full relative flex flex-col tablet:hidden p-3 gap-1 border-2 border-b-0 border-gray-gray8 border-solid'>
        <div className='w-full flex items-end'>
          <CloudTagSearchButton />
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
      <Transition
        // as={Fragment}
        show={openCloudTagSearch}
        className="absolute tablet:hidden left-0 bg-white transition-all duration-300 overflow-hidden border-2 border-t-0 border-gray-gray8 border-solid px-3 pb-3 z-10"
        enterFrom="transform -tranlateY-50 opacity-0 max-h-0"
        enterTo="transform tranlateY-0 opacity-100 max-h-[1000px]"
        leaveFrom="transform tranlateY-0 opacity-100 max-h-[1000px]"
        leaveTo="transform -tranlateY-50 opacity-0 max-h-0"
      >
        <div className={'flex flex-row flex-wrap gap-1 gap-y-2 overflow-hidden mt-3 tablet:mt-0'} style={{ width: navbarTopWidth }}>
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

      <Dialog as="div" className="tablet:hidden" open={mobileMenuOpen} onClose={() => { }}>
        {/* <div className="fixed inset-0 z-30" /> */}
        <OutsideClickHandler onOutsideClick={() => setMobileMenuOpen(false)}>
          <Dialog.Panel className="fixed h-fit inset-y-16 right-0 z-[100] w-[270px] overflow-y-auto bg-white shadow-elevation-4 ">
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
                            style={{ visibility: nav?.children?.length ? 'visible' : 'hidden', transform: (isDisclosure && currentDialogIndex === index) ? 'rotate(90deg)' : '' }}
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
        </OutsideClickHandler>
      </Dialog>

    </>
  )
}
