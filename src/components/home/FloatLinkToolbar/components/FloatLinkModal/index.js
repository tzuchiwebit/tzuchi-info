import { useState } from 'react'
import Image from 'next/image'
import styles from './FloatLinkModal.module.css'
import * as classnames from 'classnames'
import CrossSolid from "@/asset/float-link-toolbar/cross-solid.svg";

export default function FloatLinkModal({ setIsOpenModal, modalImage, modalUrl }) {
  const [isComplete, setIsComplete] = useState(false)
  const [isLandscape, setIsLandscape] = useState(true)

  return(
    <div className="fixed inset-0 z-[999]" >
      <div className="flex items-center justify-center h-full">
        {/* shield */}
        <div className="fixed inset-0 bg-[#00000080]"></div>

        {/* body */}
        <div className={classnames({'relative': true, 'cursor-pointer': true, 'invisible': !isComplete, [styles.landscape]: isLandscape, [styles.portrait]: !isLandscape })}
          onClick={() => {
            window.open(modalUrl, '_blank')
          }}
        >
          {/* close button */}
          <div className={styles.close} onClick={(e) => {
            e.stopPropagation()
            setIsOpenModal(false)}
          }>
            <CrossSolid className={styles.icon} style={{width: '32px', height: '32px'}}></CrossSolid>
          </div>

          {/* image */}
          <Image onLoad={(e) => {
            if (e.target.naturalHeight > e.target.naturalWidth) setIsLandscape(false)
            setIsComplete(true)
          }}
            alt={""}
            src={modalImage}
            width="0"
            height="0"
            sizes="100vw"
            className={classnames({"rounded-md": true, "w-auto h-full": !isLandscape, "w-full h-auto": isLandscape })}
          />
        </div>
      </div>
    </div>
  )
}
