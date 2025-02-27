'use client'
import Icon from "@/shared/Icon"
import { useRouter } from "next/navigation"
import { Linkfont } from "@/shared/styles/linkFont.js";

export default function BannerTitle({ title = "", link = false, behavior = "self", id = "", rss = "" }) {

    const router = useRouter();

    const openLink = () => {
        if (behavior === 'self') {
            router.push(link)
        } else if (behavior === 'blank') {
            window.open(link, '_blank', 'noopener=yes')
        }
    }

    return (
        <div id={id} className="flex flex-row w-full gap-2 items-center scroll-mt-[80px]">
            <div className="flex-0 text-[26px] font-bold text-primary-blue1 border-solid border-l-[6px] border-primary-blue3 pl-2">
                {title}
            </div>
            <div className="flex flex-1 text-lg border-solid border-b-2 border-gray-gray7" />
            {
                link ? (<div className="font-medium flex flex-row justify-end items-center gap-x-2 text-lg text-primary-blue3">
                    {
                      !!rss &&
                      <>
                        <Icon.RSS className="cursor-pointer" width={24} height={24} onClick={ () => window.open(rss, "_blank")}/>
                        <div className="border-solid border-r-2 border-gray-gray7 h-5"></div>
                      </>
                    }
                    <Linkfont>
                        <div
                            onClick={openLink}
                            className="cursor-pointer flex flex-row whitespace-nowrap">
                            更多<Icon.RightArrow2 width={20} />
                        </div>
                    </Linkfont>
                </div>) : <></>
            }

        </div>
    )
}
