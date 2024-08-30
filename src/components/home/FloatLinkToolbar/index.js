import { Fragment, useState, useMemo, useEffect } from "react";
import styles from './FloatLinkToolbar.module.css'
import Default from "@/asset/float-link-toolbar/default.svg";
import Cross from "@/asset/font-size-toolbar/cross.svg";
import * as classnames from 'classnames'
import color from "@/shared/styles/color"
import Image from 'next/image'
import useDataProvider from "../useDataProvider"
import FloatLinkModal from './components/FloatLinkModal'

export default function FloatLinkButton() {
  const { floatLinkArticles, loadingFloatLinks } = useDataProvider()
  const [isOpen, setIsOpen] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalImage, setModalImage] = useState("")
  const [modalUrl, setModalUrl] = useState("")

  return (
    <Fragment>
      {
        (!loadingFloatLinks && !!floatLinkArticles.length) &&
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
                <Cross className={styles.icon} style={{width: '19px', height: '19px'}}></Cross>
              </div>

              {
                floatLinkArticles.map((item, _index) => (
                  <div key={_index} className={classnames(styles.link, 'relative w-[100px] h-[121px] -mb-5')} onClick={() => {
                    if (!!item.attributes.images.image_intro_alt) {
                      if (!!item.attributes.images.image_fulltext) {
                        setModalUrl(item.attributes.images.image_intro_alt)
                        setModalImage(item.attributes.images.image_fulltext)
                        setIsOpenModal(true)
                      } else {
                        window.open(item.attributes.images.image_intro_alt, '_blank', 'noopener=yes')
                      }
                    }
                  }}>
                    <Image
                      priority
                      src={item.attributes.images.image_intro}
                      alt={""}
                      fill
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                ))
              }
            </div>
          }
          {
            isOpenModal && <FloatLinkModal setIsOpenModal={setIsOpenModal} modalImage={modalImage} modalUrl={modalUrl} />
          }
        </Fragment>
      }
    </Fragment>
  )
}
