'use client'
import Icon from "@/shared/Icon"
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import Widgets from "./widget/Widgets"
import MainContent from "./mainContent/MainContent"
import Container from "@/shared/layout/Container"

// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';

export default function Home() {

    return (
        <div className="flex flex-col laptop:flex-row w-full">
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
    width: 100%;
    flex-direction: column;
    gap: 20px;
    padding: 15px;
    @media(min-width: ${screens.laptop}) {
        width: calc(100% - 350px);
    }
    @media(min-width: ${screens.desktop}) {
        width: 100%;
        flex-direction: row;
        padding: 0;
    }
`

const SecondaryContainer = styled.div`
    background-color: ${color.gray.gray8};
    @media(min-width: ${screens.laptop}) {
        flex-basis: 350px;
    }
    @media(min-width: ${screens.desktop}) {
        flex-direction: row;
    }
`