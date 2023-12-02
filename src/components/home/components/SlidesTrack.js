'use client'
import Icon from "@/shared/Icon"
import styled from "styled-components"
// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';

export default function SlidesTrack({ children }) {

    return (
        <SlideTrackContainer>
            {children}
        </SlideTrackContainer>
    )
}

const SlideTrackContainer = styled.div`
    display: flex;
    flex-direction: row;
    // width: 100%;
    margin-right: -15px;
    padding-right: 15px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`