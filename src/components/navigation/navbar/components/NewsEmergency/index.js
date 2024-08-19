import { Fragment } from "react";
import useDataProvider from "../../useDataProvider"
// import { getArticlesByCategory } from "@/api/joomlaApi";

// export async function getServerSideProps(context) {
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
//   const res = await getArticlesByCategory({ label_name: "緊急發佈訊息", limit: 1 })
//   const data = {}
//   if (res?.data) {
//     data.content = res?.data[0].attributes?.text
//     if (!!res?.data[0].attributes?.publish_down) {
//       data.expired = dayjs().isAfter(dayjs(res?.data[0].attributes?.publish_down, 'YYYY-MM-DD HH:mm:ss'))
//     }
//   }
//   return { props: { emergencyArticle: data } }
// }

export default function NewsEmergency() {
  const { emergencyArticle, loadingEmergencyArticle } = useDataProvider();
  return (
    <Fragment>
      {
        (!loadingEmergencyArticle && !!emergencyArticle) &&
        <div className="w-full flex flex-row justify-center bg-[#FFD965] py-4">
          <div className="desktop:w-[980px] laptop:w-[940px] tablet:w-[742px] text-lg text-primary-blue1" id={'emergency-holder'} style={{ wordBreak: 'break-all' }} dangerouslySetInnerHTML={{ __html: emergencyArticle }} />
        </div>
      }
    </Fragment>
  )
}
