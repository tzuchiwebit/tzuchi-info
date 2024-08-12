'use client'
import screens from "@/shared/styles/screens";
import styled from "styled-components"
// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function SlidesTrack({ children }) {

    const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
    const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:


    return (
        <SlideTrackContainer
            {...events}
            ref={ref}>
            {children}
        </SlideTrackContainer>
    )
}

const SlideTrackContainer = styled.div`
    display: flex;
    flex-direction: row;

    overflow-x: scroll;
    cursor: move;
    &::-webkit-scrollbar {
        display: none;
    }
    @media(min-width: ${screens.tablet}) {
      margin-right: -13px;
      padding-right: 13px;
    }
`
