'use client'
import { useState, useEffect } from 'react';
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
const classNames = require('classnames');

const dataList = {
  one: {
    title: "公益慈善",
    links: [
      {
        subtitle: '臺灣慈善網',
        description: '在台灣的公益深耕'
      },
      {
        subtitle: '國際慈善網',
        description: '在全球的慈善足跡'
      },
      {
        subtitle: '全球資訊網',
        description: '即時多元的行動與資訊'
      }
    ]
  },
  two: {
    title: "生活倡議",
    links: [
      {
        subtitle: '齋戒網',
        description: '愛護動物  植感生活'
      },
      {
        subtitle: '宗門學思網',
        description: '佛學生活'
      }
    ]
  },
  three: {
    title: '全球聯絡點',
    links: [
      {
        subtitle: '慈濟全球聯絡點地圖',
        description: '找到在你附近的慈濟'
      }
    ]
  },
  four: {
    title: '其他連結',
    links: [
      {
        subtitle: '慈濟全球社區網',
        description: '深入社區的志工紀實報導'
      },
      {
        subtitle: '慈濟數位典藏資源網',
        description: '圖資開放下載平臺'
      },
      {
        subtitle: '慈濟長照推展中心'
      },
      {
        subtitle: '國際慈濟人醫會'
      },
      {
        subtitle: '慈濟國際人道援助會'
      },
      {
        subtitle: '慈濟國際人道援助會'
      }
    ]
  },
  five: {
    title: '醫療志業',
    links: [
      { subtitle: '慈濟醫療基金會' },
      { subtitle: '花蓮慈濟醫學中心' },
      { subtitle: '玉里慈濟醫院' },
      { subtitle: '關山慈濟醫院' },
      { subtitle: '臺北慈濟醫院' },
      { subtitle: '臺中慈濟醫院' },
      { subtitle: '斗六慈濟醫院' },
      { subtitle: '大林慈濟醫院' },
      { subtitle: '嘉義慈濟診所' },
      { subtitle: '慈濟骨髓幹細胞中心' },
      { subtitle: '蘇州慈濟門診部' }
    ]
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
    links: [
      { subtitle: '慈濟人文志業中心' },
      { subtitle: '大愛電視臺' },
      { subtitle: '慈濟廣播' },
      { subtitle: '靜思人文' },
    ]
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

const LinkCard = ({ type }) => {
  const screenSize = useScreenSize();
  const [isUseDrawer, setIsUseDrawer] = useState(screenSize.width < 768) // true when < 768
  const [isOpen, setIsOpen] = useState(screenSize.width >= 768) // false when < 768

  useEffect(() => {
    setIsUseDrawer(screenSize.width < 768)
    setIsOpen(screenSize.width >= 768)
  }, [screenSize.width])

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
                <Icon.Minus></Icon.Minus> :
                <Icon.Plus></Icon.Plus>
            }
          </div>
        }
      </div>
      <div className={styles.horizon_line}></div>
      <div className={classNames(isOpen ? styles.link_wrapper : 'hidden', isOpen ? styles.animate_fadein : '')}>
        {dataList[type].links.map((item, index) => (
          <div key={index}>
            <div className={styles.subtitle}>{item.subtitle}</div>
            {
              !!item.description &&
              <div className={styles.description}>{item.description}</div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LinkGroup() {
  return (
    <Wrapper>
      <LinkCard type="one"></LinkCard>
      <LinkCard type="two"></LinkCard>
      <LinkCard type="three"></LinkCard>
      <LinkCard type="four"></LinkCard>
      <LinkCard type="five"></LinkCard>
      <LinkCard type="six"></LinkCard>
      <LinkCard type="seven"></LinkCard>
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
