'use client'
import Icon from "@/shared/Icon"
import styled from "styled-components"
// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function Tag({ onClick = () => { }, isSelected = false, children }) {

    return (
        <div
            onClick={onClick}
            className={classNames(
                isSelected ? 'text-white bg-primary-blue2' : 'text-primary-blue2 bg-white',
                "font-bold border-2 border-solid border-primary-blue2 text-primary-blue2 px-3 rounded-full cursor-pointer whitespace-nowrap")}
        >
            {children}
        </div >
    )
}
