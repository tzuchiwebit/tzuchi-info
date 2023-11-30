'use client'
import Icon from "@/shared/Icon"
// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';

export default function BannerTitle({ title = "", link = false }) {

    return (
        <div className="flex flex-row w-full gap-1">
            <div className="flex-0 text-[26px] font-bold text-primary-blue1 border-solid border-b-2 border-primary-blue1">
                {title}
            </div>
            <div className="flex font-medium justify-end items-end flex-1 text-lg border-solid border-b-2 border-gray-gray7 text-primary-blue3">
                {
                    link ? <a href={link} target="_blank" className="flex flex-row whitespace-nowrap">更多<Icon.RightArrow2 width={20} /></a> : <></>
                }
            </div>
        </div>
    )
}
