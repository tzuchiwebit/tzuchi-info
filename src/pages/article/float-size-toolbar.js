import { Fragment, useState } from 'react';
import styles from './float-size-toolbar.module.css'
import color from "@/shared/styles/color"
import * as classnames from "classnames"
import Default from "@/asset/font-size-toolbar/default.svg";
import Add from "@/asset/font-size-toolbar/add.svg";
import Minus from "@/asset/font-size-toolbar/minus.svg";

export default function FloatSizeToolbar ({selectedFontSize, setSelectedFontSize}) {
  const [isOpen, setIsOpen] = useState(false)

  const increase = () => {
    if (selectedFontSize < 26) {
      setSelectedFontSize(selectedFontSize+2)
    }
  }
  const descrease = () => {
    if (selectedFontSize > 18) {
      setSelectedFontSize(selectedFontSize-2)
    }
  }
  const reset = () => {
      setSelectedFontSize(18)
  }
  return(
    <Fragment>
      {
        !isOpen &&
        <div className={styles.closedContainer}>
          <div className={classnames(styles.menu, styles.default)} onClick={()=> setIsOpen(true)}>
            <div className={styles.text}>字</div>
            <Default className={styles.icon}></Default>
          </div>
        </div>
      }
      {
        isOpen &&
        <div className={styles.openedContainer}>
          {/* close button */}
          <div className={styles.menu} style={{border: '3px solid white', color: color.gray.white}} onClick={()=> setIsOpen(false)}>
            <div style={{fontSize: '23px', lineHeight: '23px'}}>Ｘ</div>
          </div>

          {/* increen button */}
          <div className={classnames(styles.menu, styles.add)} onClick={increase}>
            <div className={styles.text}>字</div>
            <Add className={styles.icon}></Add>
          </div>

          {/* descrease button */}
          <div className={classnames(styles.menu, styles.minus)} onClick={descrease}>
            <div className={styles.text}>字</div>
            <Minus className={styles.icon}></Minus>
          </div>

          {/* sperator line */}
          <div style={{borderBottom: '1px solid white', height: '1px', width: '40px'}}></div>

          {/* reset button */}
          <div className={classnames(styles.menu, styles.default)} onClick={reset}>
            <div className={styles.text}>字</div>
            <Default className={styles.icon}></Default>
          </div>
        </div>
      }
    </Fragment>
  )
}
