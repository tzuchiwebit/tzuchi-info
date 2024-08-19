import { Fragment, useState } from "react";
import styles from './FloatLinkToolbar.module.css'
import Default from "@/asset/float-link-toolbar/default.svg";
import Cross from "@/asset/font-size-toolbar/cross.svg";
import * as classnames from 'classnames'
import color from "@/shared/styles/color"
import Image from 'next/image'

export default function FloatLinkButton() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Fragment>
      {
        !isOpen &&
        <div className={styles.closedContainer}>
          <div className={classnames(styles.menu, styles.default)} onClick={()=> setIsOpen(true)}>
            <Default className={styles.icon}></Default>
          </div>
        </div>
      }
      {
        isOpen &&
        <div className={styles.openedContainer}>
          {/* close button */}
          <div className={styles.menu} style={{border: '3px solid white', color: color.gray.white}} onClick={()=> setIsOpen(false)}>
            {/* <div style={{fontSize: '23px', lineHeight: '23px'}}>Ｘ</div> */}
            <Cross className={styles.icon} style={{width: '19px', height: '19px'}}></Cross>
          </div>
          <div className={classnames('relative w-[72px] h-[72px]')}>
          <Image
              priority
              src="https://webtest.tzuchi-org.tw//images//float-btn//jiu%20zi%20xun%20wang.png#joomlaImage:%5C/%5C/local-images%5C/float-btn%5C/jiu%20zi%20xun%20wang.png?width=100&height=99"
              alt={""}
              // width={48}
              // height={48}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      }
    </Fragment>
  )
}
