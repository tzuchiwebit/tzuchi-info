'use client'
import Icon from "@/shared/Icon"
// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';

export default function BannerTitle({ title = "", link = false }) {

    return (
        <div className="flex flex-row w-full gap-2 items-center">
            <div className="flex-0 text-[26px] font-bold text-primary-blue1 border-solid border-l-[6px] border-primary-blue3 pl-2">
                {title}
            </div>
            <div className="flex flex-1 text-lg border-solid border-b-2 border-gray-gray7" />
            {
                link ? (<div className="flex-0 font-medium justify-end items-end text-lg text-primary-blue3">
                        <a href={link} target="_blank" className="flex flex-row whitespace-nowrap">更多<Icon.RightArrow2 width={20} /></a>
                    </div>) : <></>
            }

        </div>
    )
}
