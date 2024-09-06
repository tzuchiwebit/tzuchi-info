import { Fragment, useState, useRef } from 'react';
import styles from './float-read-toolbar.module.css'
import * as classnames from "classnames"
import Play from "@/asset/float-read-toolbar/play.svg";
import Pause from "@/asset/float-read-toolbar/pause.svg";
import { useRouter, useParams } from 'next/navigation'

export default function FloatSizeToolbar ({ selectedFontSize, setSelectedFontSize }) {
  const audioRef = useRef(null)
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying); // Toggle play/pause state
  };
  return(
    <Fragment>
      {
        <div className={styles.closedContainer}>
          <div className={classnames(styles.menu, styles.default)} onClick={handlePlayPause}>
            {
              isPlaying ?
              <Pause className={styles.icon}></Pause> :
              <Play className={styles.icon}></Play>
            }
            <div className={styles.text}>導讀</div>
          </div>
          <div className='hidden'>
            <audio ref={audioRef} controls>
              <source src={`${process.env.NEXT_PUBLIC_AUDIO_BASE_URL}/${params?.slug}.mp3`} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      }
    </Fragment>
  )
}
