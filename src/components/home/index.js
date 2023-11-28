'use client'
import Icon from "@/shared/Icon"
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import Widgets from "./widget/Widgets"
import MainContent from "./MainContent"

// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';

export default function Home() {

    return (
        <div className="flex flex-col gap-4 laptop:flex-row laptop:pt-10">
            <MainContainer>
                <Widgets />
                <MainContent />
            </MainContainer>
            <SecondaryContainer>
                Secondary
            </SecondaryContainer>
        </div>
    )
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 2;
    gap: 20px;
    @media(min-width: ${screens.desktop}) {
        flex-direction: row;
        flex: 3;
    }
`

const SecondaryContainer = styled.div`
    width: 100%;
    flex: 1;
    background-color: ${color.gray.gray8};
    @media(min-width: ${screens.desktop}) {
        flex-direction: row;
    }
`