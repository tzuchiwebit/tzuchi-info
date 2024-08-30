import { Fragment, useState, useMemo, useEffect } from "react";
import useDataProvider from "../../useDataProvider"
import Icon from '@/shared/Icon';
import styles from './NewsEmergency.module.css'
import * as classnames from 'classnames'

export default function NewsEmergency() {
  const { emergencyArticle, loadingEmergencyArticle } = useDataProvider();
  const [isClose, setIsClose] = useState(false);
  const isShow = useMemo(() => {
    return !!emergencyArticle && !isClose
  }, [emergencyArticle, isClose])

  return (
    <Fragment>
      {
        (!loadingEmergencyArticle && !!emergencyArticle) &&
        <div className={classnames("w-full flex flex-row justify-center bg-[#FFD965] py-4", isShow ? styles.wrapper: 'hidden', )}>
          <div className="desktop:w-[980px] laptop:w-[940px] tablet:w-[742px] w-[350px] text-lg text-primary-blue1 flex flex-row gap-x-2">
            <div className="" id={'emergency-holder'} style={{ wordBreak: 'break-all' }} dangerouslySetInnerHTML={{ __html: emergencyArticle }} />
            <div className="shrink-0 cursor-pointer self-start tablet:hidden" onClick={() => setIsClose(true)}>
              <Icon.CloseCircle></Icon.CloseCircle>
            </div>
          </div>
        </div>
      }
    </Fragment>
  )
}
