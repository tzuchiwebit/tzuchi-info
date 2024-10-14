'use client'
import { Fragment, useEffect, useRef, useState } from 'react'
import Container from '@/shared/layout/Container'
import { Transition } from '@headlessui/react'
import Icon from '@/shared/Icon'
import { HeaderLinkItems } from '../../config'
import color from '@/shared/styles/color'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CloudTag from '@/shared/tag/CloudTag'
import routes from '@/config/routes'
import jsonApi from '@/api/jsonApi'
import useScreenSize from '@/shared/hook/useScreenSize';
import * as classnames from "classnames"
import CategoryMenu from './components/CategoryMenu'
import SearchMenu from './components/SearchMenu'
import HamburgMenu from './components/HamburgMenu'
import CloudTagSearchButton from './components/CloudTagSearchButton'

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

      <Container noPadding>
        <nav ref={navRef} className="mx-auto flex flext-row items-center justify-between tablet:py-4" aria-label="Global">
          {/* logo */}
          <div className="tablet-down:ml-3 flex-none w-[114px] tablet:w-[157px] laptop:w-[217px] desktop:w-[372px] tablet:self-start relative">
            <Link href="/" className="">
              <span className="sr-only">慈濟資訊網</span>
              <Icon.LOGO className="hidden desktop:block" width="100%" onClick={() => router.push('/')} />
              <Icon.LOGOMobile className="desktop:hidden" width="100%" onClick={() => router.push('/')} />
            </Link>
            {
              !!process.env.NEXT_PUBLIC_STAGING &&
              <span className='absolute top-2 -right-4 text-xs font-bold' style={{color: 'red'}}>{process.env.NEXT_PUBLIC_STAGING}</span>
            }
          </div>

          <div className='desktop:w-16 laptop:w-11 tablet:w-4'></div>

          {/* tablet (up) device only */}
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
                      <div className={classnames(
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

            {/* 熱門快搜 dropdown menu: web version */}
            <Transition
              // as={Fragment}
              show={openCloudTagSearch}
              className="transition-all duration-300 overflow-hidden"
              enterFrom="transform -tranlateY-50 opacity-0 max-h-0"
              enterTo="transform tranlateY-0 opacity-100 max-h-[1000px]"
              leaveFrom="transform tranlateY-0 opacity-100 max-h-[1000px]"
              leaveTo="transform -tranlateY-50 opacity-0 max-h-0"
            >
              <div className={'flex flex-row flex-wrap gap-x-1 gap-y-2 overflow-hidden mt-2'}>
                {
                  cloudTags.map((item, index) => (
                    <CloudTag
                      label={item["關鍵字"]}
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

          {/* mobile device only */}
          <div className="flex tablet:hidden items-center">
            {/* 首頁分類 */}
            <CategoryMenu navRef={navRef} setOpenShield={setOpenShield} openShield={openShield} categoryMenuOpen={categoryMenuOpen} setCategoryMenuOpen={setCategoryMenuOpen}></CategoryMenu>

            <div className='flex flex-row ml-2'>
              <SearchMenu navRef={navRef} searchMenuOpen={searchMenuOpen} setSearchMenuOpen={setSearchMenuOpen}
                setOpenCloudTagSearch={setOpenCloudTagSearch} openCloudTagSearch={openCloudTagSearch}
                searchText={searchText} setSearchText={setSearchText}
                cloudTags={cloudTags} setOpenShield={setOpenShield} openShield={openShield}
              />

              <HamburgMenu navRef={navRef} hamburgMenuOpen={hamburgMenuOpen} setHamburgMenuOpen={setHamburgMenuOpen} setOpenShield={setOpenShield} />
            </div>
          </div>

        </nav >
      </Container >
    </>
  )
}
