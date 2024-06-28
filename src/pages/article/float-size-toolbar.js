import { Fragment, useState } from 'react';
import styles from './float-size-toolbar.module.css'
import color from "@/shared/styles/color"

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
          <div className={styles.menu} style={{backgroundColor: color.gray.white}} onClick={()=> setIsOpen(true)}>
            <div className={styles.text}>字</div>
            <div className={styles.icon}>±</div>
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
          <div className={styles.menu} style={{backgroundColor: color.gray.white}} onClick={increase}>
            <div className={styles.text}>字</div>
            <div className={styles.icon}>＋</div>
          </div>

          {/* descrease button */}
          <div className={styles.menu} style={{backgroundColor: color.gray.white}} onClick={descrease}>
            <div className={styles.text}>字</div>
            <div className={styles.icon}>－</div>
          </div>

          {/* sperator line */}
          <div style={{borderBottom: '1px solid white', height: '1px', width: '40px'}}></div>

          {/* reset button */}
          <div className={styles.menu} style={{backgroundColor: color.complementary.blue2}} onClick={reset}>
            <div className={styles.text}>字</div>
            <div className={styles.icon}>±</div>
          </div>
        </div>
      }
    </Fragment>
  )
}
