import { Fragment, useState } from "react";
import useDataProvider from "../../useDataProvider"
import Icon from '@/shared/Icon';

export default function NewsEmergency() {
  const { emergencyArticle, loadingEmergencyArticle } = useDataProvider();
  const [isShow, setIsShow] = useState(true)
  return (
    <Fragment>
      {
        (!loadingEmergencyArticle && !!emergencyArticle && isShow) &&
        <div className="w-full flex flex-row justify-center bg-[#FFD965] py-4">
          <div className="desktop:w-[980px] laptop:w-[940px] tablet:w-[742px] w-[350px] text-lg text-primary-blue1 flex flex-row gap-x-2">
            <div className="" id={'emergency-holder'} style={{ wordBreak: 'break-all' }} dangerouslySetInnerHTML={{ __html: emergencyArticle }} />
            <div className="shrink-0 cursor-pointer tablet:hidden block" onClick={() => setIsShow(false)}>
              <Icon.CloseCircle></Icon.CloseCircle>
            </div>
          </div>
        </div>
      }
    </Fragment>
  )
}
