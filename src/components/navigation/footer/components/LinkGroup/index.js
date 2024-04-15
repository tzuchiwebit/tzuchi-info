import { useState, useEffect, useMemo } from 'react';
import Icon from "@/shared/Icon"
import styled from "styled-components"
import styles from './LinkGroup.module.css'
import screens from "@/shared/styles/screens"
import LinkOne from '@/shared/Icon/icon/footer/link-1.svg'
import LinkTwo from '@/shared/Icon/icon/footer/link-2.svg'
import LinkThree from '@/shared/Icon/icon/footer/link-3.svg'
import LinkFour from '@/shared/Icon/icon/footer/link-4.svg'
import LinkFive from '@/shared/Icon/icon/footer/link-5.svg'
import LinkSix from '@/shared/Icon/icon/footer/link-6.svg'
import LinkSeven from '@/shared/Icon/icon/footer/link-7.svg'
import useScreenSize from '@/shared/hook/useScreenSize';
import jsonApi from '@/api/jsonApi';
const { useRequest}  = require('ahooks')
// import { useRequest } from 'ahooks';
// import ahooks from 'ahooks';
// const { useRequest } = ahooks;
const classNames = require('classnames');

const dataList = {
  one: {
    title: "公益慈善",
  },
  two: {
    title: "生活倡議",
  },
  three: {
    title: '全球聯絡點',
  },
  four: {
    title: '其他連結',
  },
  five: {
    title: '醫療志業',
  },
  six: {
    title: '教育志業',
    links: [
      { subtitle: '慈濟科技大學' },
      { subtitle: '慈濟大學' },
      { subtitle: '慈大附中' },
      { subtitle: '臺南慈中' },
      { subtitle: '社會教育推廣中心' },
      { subtitle: '華語中心' },
      { subtitle: '志玄終身學習教育中心' },
    ]
  },
  seven: {
    title: '人文志業',
  }
}

const LinkIcon = (type) => {
  if (type === 'one') {
    return <LinkOne></LinkOne>
  } else if (type === 'two') {
    return <LinkTwo></LinkTwo>
  } else if (type === 'three') {
    return <LinkThree></LinkThree>
  } else if (type === 'four') {
    return <LinkFour></LinkFour>
  } else if (type === 'five') {
    return <LinkFive></LinkFive>
  } else if (type === 'six') {
    return <LinkSix></LinkSix>
  } else if (type === 'seven') {
    return <LinkSeven></LinkSeven>
  } else {
    return <></>
  }
}

const LinkCard = ({ type, list }) => {
  const screenSize = useScreenSize();
  const [isUseDrawer, setIsUseDrawer] = useState(screenSize.width < 768) // true when < 768
  const [isOpen, setIsOpen] = useState(screenSize.width >= 768) // false when < 768

  useEffect(() => {
    setIsUseDrawer(screenSize.width < 768)
    setIsOpen(screenSize.width >= 768)
  }, [screenSize.width])

  const openTab = (url) => {
    if (!!url) {
      window.open(url, "_blank");
    }
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <div className="flex flex-row gap-x-1 items-center">
          {LinkIcon(type)}
          <span className={styles.title}>{dataList[type].title}</span>
        </div>
        {
          isUseDrawer &&
          <div className='w-5 h-5 flex justify-center items-center border-2 border-solid border-primary-blue1 rounded-sm cursor-pointer' onClick={() => { setIsOpen(!isOpen) }}>
            {
              isOpen ?
                <Icon.Minus style={{ width: 12 }}></Icon.Minus> :
                <Icon.Plus style={{ width: 12 }}></Icon.Plus>
            }
          </div>
        }
      </div>
      <div className={styles.horizon_line}></div>
      <div className={classNames(isOpen ? styles.link_wrapper : 'hidden', isOpen ? styles.animate_fadein : '')}>
        {
          (list || []).map((item, index) => (
            <div key={index} className="cursor-pointer" onClick={() => openTab(item[1])}>
              <div className={styles.subtitle}>{item[0]}</div>
              {
                !!item[2] &&
                <div className={styles.description}>{item[2]}</div>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default function LinkGroup() {
  const { data: footerData } = useRequest(jsonApi.getFooter);

  const footerList = useMemo(() => {
    const result = {}
    if (footerData?.data?.length) {
      for (const item of footerData.data) {
        if (!!result[item[0]]) {
          result[item[0]].push([item[1], item[2], item[3] || null])
        } else {
          result[item[0]] = [[item[1], item[2], item[3] || null]]
        }
      }
    }
    return result
  }, [footerData])

  return (
    <Wrapper>
      <LinkCard type="one" list={footerList['公益慈善']}></LinkCard>
      <LinkCard type="two" list={footerList['生活倡議']}></LinkCard>
      <LinkCard type="three" list={footerList['全球聯絡點']}></LinkCard>
      <LinkCard type="four" list={footerList['其他連結']}></LinkCard>
      <LinkCard type="five" list={footerList['醫療志業']}></LinkCard>
      <LinkCard type="six" list={footerList['教育志業']}></LinkCard>
      <LinkCard type="seven" list={footerList['人文志業']}></LinkCard>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 170px);
  column-gap: 20px;
  row-gap: 40px;

  @media(min-width: ${screens.laptop}) {
    grid-template-columns: repeat(3, 220px);
    column-gap: 20px;
  }

  @media(min-width: ${screens.desktop}) {
    grid-template-columns: repeat(4, 180px);
    row-gap: 48px;
  }

  @media(max-width: ${screens["tablet-down"].max}) {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 20px;
  }
`
