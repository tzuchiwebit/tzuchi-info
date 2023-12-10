'use client'
// import Icon from "@/shared/Icon"
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import Widgets from "./widget/Widgets"
import MainContent from "./mainContent/MainContent"
import SecondaryContent from "./secondaryContent/SecondaryContent"

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
                <SecondaryContent />
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
        padding: 30px 40px;
    }
    @media(min-width: ${screens.desktop}) {
        width: 100%;
        flex-direction: row;
        padding: 0 15px 0 0;
    }
`

const SecondaryContainer = styled.div`
    background-color: ${color.gray.gray11};
    margin-bottom: 50px;
    @media(min-width: ${screens.laptop}) {
        flex-basis: 350px;
        width: 350px;
        margin-bottom: 0;
    }
    @media(min-width: ${screens.desktop}) {
        flex-basis: 280px;
        width: 280px;
        flex-direction: row;
    }
    @media(max-width: ${screens["tablet-down"].max}) {
      margin-bottom: 50px;
    }
`
