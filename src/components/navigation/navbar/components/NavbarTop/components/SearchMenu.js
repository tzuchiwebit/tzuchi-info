'use client'
import { Fragment, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import * as classnames from "classnames"
import color from '@/shared/styles/color'
import Icon from '@/shared/Icon'
import { Transition } from '@headlessui/react'
import CloudTagSearchButton from './CloudTagSearchButton'
import CloudTag from '@/shared/tag/CloudTag'
import routes from '@/config/routes'

export default function SearchMenu ({ navRef, openShield, setOpenShield, searchMenuOpen, setSearchMenuOpen, setOpenCloudTagSearch, openCloudTagSearch, searchText, setSearchText, cloudTags = [] }) {
  const router = useRouter();
  const menuBtnRef = useRef(null)
  const menuOpenRef = useRef(null)

  const onKeywordSearch = () => {
    setSearchMenuOpen(false)
    setOpenShield(false)
    return router.push(`${routes.SEARCH}?keyword=${searchText}`)
  }

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
        setOpenShield(false)
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

        {/* 熱門快搜 dropdown menu: mobile version */}
        <Transition
          // as={Fragment}
          show={openCloudTagSearch}
          className="w-full tablet:hidden bg-white transition-all duration-300 overflow-hidden px-3 pb-3"
          enterFrom="transform -tranlateY-50 opacity-0 max-h-0"
          enterTo="transform tranlateY-0 opacity-100 max-h-[1000px]"
          leaveFrom="transform tranlateY-0 opacity-100 max-h-[1000px]"
          leaveTo="transform -tranlateY-50 opacity-0 max-h-0"
        >
          <div className={'flex flex-row flex-wrap gap-x-1 gap-y-2 overflow-hidden mt-3 tablet:mt-0 tablet-down:justify-end'}>
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
