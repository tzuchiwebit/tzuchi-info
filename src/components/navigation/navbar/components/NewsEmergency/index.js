import { Fragment } from "react";
import useDataProvider from "../../useDataProvider"

export default function NewsEmergency() {
  const { emergencyArticle, loadingEmergencyArticle } = useDataProvider();
  return (
    <Fragment>
      {
        (!loadingEmergencyArticle && !!emergencyArticle?.content && !!emergencyArticle.expired) &&
        <div className="w-full flex flex-row justify-center bg-[#FFD965] py-4 desktop:-mt-[3px] laptop:mt-[1px] tablet:mt-[12px] relative z-[200]">
          <div className="desktop:w-[980px] laptop:w-[940px] tablet:w-[742px] text-lg text-primary-blue1" id={'emergency-holder'} style={{ wordBreak: 'break-all' }} dangerouslySetInnerHTML={{ __html: emergencyArticle?.content }} />
        </div>
      }
    </Fragment>
  )
}
