'use client'
import { useMemo, useState, useEffect, Fragment } from 'react'
import styles from './NewsMarquee.module.css'
import styled from "styled-components";
import color from "@/shared/styles/color";
import * as classnames from "classnames"
import useScreenSize from '@/shared/hook/useScreenSize';
import useDataProvider from '../../useDataProvider';

const Item = ({data, seq}) => {
  const togglePause = () => {
    // return;
    // FIXME: 希望可以hover時，先等animation跑完，再pause
    const marquee = document.querySelector('#marquee')
    const marqueeItemList = document.querySelectorAll('#marqueeItem')

    const marqueeState = marquee.style.animationPlayState || 'running'
    marquee.style.animationPlayState = marqueeState === 'running' ? 'paused' : 'running';

    marqueeItemList.forEach((el) => {
      const marqueeItemState = el.style.animationPlayState || 'running'
      el.style.animationPlayState = marqueeItemState === 'running' ? 'paused' : 'running';
    })
  }
  return (
    <li id="marqueeItem" className={classnames(styles.marqueeItem)}>
      <div className={classnames(styles.prefixDialog)}>{data?.images?.image_intro_alt ? data?.images?.image_intro_alt : '慈濟快報'} <span className={classnames(styles.arrow)}>►</span></div>
      <span className={classnames(styles.message)} onMouseEnter={togglePause} onMouseLeave={togglePause} dangerouslySetInnerHTML={{ __html: data?.text }}></span>
    </li>
  )
}

export default function NewsMarquee () {
  const { headlineArticles, loadingHeadlineArticles } = useDataProvider();
  const {width: screenWidth} = useScreenSize();

  const [isReady, setIsReady] = useState(false)
  const [height, setHeight] = useState()
  const [top, setTop] = useState()
  // const [step, setStep]= useState(6)
  const [duration, setDuration] = useState('3s')

  const list = useMemo(()=> {
    return [...headlineArticles, headlineArticles[0]]
  }, [headlineArticles])

  const step = useMemo(()=> {
    return headlineArticles.length
  }, [headlineArticles])

  useEffect(()=> {
    if (screenWidth && screenWidth >= 1600) {
      // setTop('125px')
      setHeight('61px')
      setIsReady(true)
    } else if (screenWidth && screenWidth >= 768) {
      // setTop('72px')
      setHeight('43px')
      setIsReady(true)
    } else if (screenWidth && screenWidth >= 375) {
      // setTop('58px')
      setHeight('43px')
      setIsReady(true)
    }
  }, [screenWidth])


  const togglePause = () => {
    // return;
    // FIXME: 希望可以hover時，先等animation跑完，再pause
    const marquee = document.querySelector('#marquee')
    const marqueeItemList = document.querySelectorAll('#marqueeItem')

    const marqueeState = marquee.style.animationPlayState || 'running'
    marquee.style.animationPlayState = marqueeState === 'running' ? 'paused' : 'running';

    marqueeItemList.forEach((el) => {
      const marqueeItemState = el.style.animationPlayState || 'running'
      el.style.animationPlayState = marqueeItemState === 'running' ? 'paused' : 'running';
    })
  }
  return (
    <Fragment>
      {
        (!loadingHeadlineArticles && !!headlineArticles.length) &&
        <div className={styles.gContainer} style={{'--h': height, '--t': top, '--s': step, '--d': duration }}>
          <ul id="marquee" className={styles.marquee}>
            {list.map((item, index) => <Item data={item?.attributes} seq={index} key={index} />)}
            {/* <li id="marqueeItem" className={classnames(styles.marqueeItem)}>
              <div className={classnames(styles.prefixDialog)}>Upcoming Event <span className={classnames(styles.arrow)}>►</span></div>
              <span className={classnames(styles.message)} onMouseEnter={togglePause} onMouseLeave={togglePause}>1. Enroll now for a Free Course on Buddhism: Past, Present, and Future.</span>
            </li>
            <li id="marqueeItem" className={styles.marqueeItem}>
              <div className={classnames(styles.prefixDialog)}>Upcoming Event <span className={classnames(styles.arrow)}>►</span></div>
              <span className={classnames(styles.message)}  onMouseEnter={togglePause} onMouseLeave={togglePause}>2. Enroll now for a Free Course on Buddhism: Past, Present, and Future.</span>
            </li>
            <li id="marqueeItem" className={classnames(styles.marqueeItem)}>
              <div className={classnames(styles.prefixDialog)}>Upcoming Event <span className={classnames(styles.arrow)}>►</span></div>
              <span className={classnames(styles.message)} onMouseEnter={togglePause} onMouseLeave={togglePause}>3. Enroll now for a Free Course on Buddhism: Past, Present, and Future.</span>
            </li>
            <li id="marqueeItem" className={styles.marqueeItem}>
              <div className={classnames(styles.prefixDialog)}>Upcoming Event <span className={classnames(styles.arrow)}>►</span></div>
              <span className={classnames(styles.message)} onMouseEnter={togglePause} onMouseLeave={togglePause}>4. Enroll now for a Free Course on Buddhism: Past, Present, and Future.</span>
            </li>
            <li id="marqueeItem" className={classnames(styles.marqueeItem)}>
              <div className={classnames(styles.prefixDialog)}>Upcoming Event <span className={classnames(styles.arrow)}>►</span></div>
              <span className={classnames(styles.message)} onMouseEnter={togglePause} onMouseLeave={togglePause}>5. Enroll now for a Free Course on Buddhism: Past, Present, and Future.</span>
            </li>
            <li id="marqueeItem" className={styles.marqueeItem}>
              <div className={classnames(styles.prefixDialog)}>Upcoming Event <span className={classnames(styles.arrow)}>►</span></div>
              <span className={classnames(styles.message)} onMouseEnter={togglePause} onMouseLeave={togglePause}>6. Enroll now for a Free Course on Buddhism: Past, Present, and Future.</span>
            </li>

            <li id="marqueeItem" className={classnames(styles.marqueeItem)}>
              <div className={classnames(styles.prefixDialog)}>Upcoming Event <span className={classnames(styles.arrow)}>►</span></div>
              <span className={classnames(styles.message)} onMouseEnter={togglePause}>1. Enroll now for a Free Course on Buddhism: Past, Present, and Future.</span>
            </li> */}
          </ul>
        </div>
      }
    </Fragment>
  )
}
