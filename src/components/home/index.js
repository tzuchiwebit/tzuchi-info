'use client'
// import Icon from "@/shared/Icon"
import { useState, useEffect } from "react"
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"
import Widgets from "./widget/Widgets"
import MainContent from "./mainContent/MainContent"
import SecondaryContent from "./secondaryContent/SecondaryContent"
import DataProvider from "./DataProvider"
import LikeAndShareProvider from "./SocialShareProvider"

export default function Home() {

    return (
        <DataProvider>
            <LikeAndShareProvider>
                <div className="flex flex-col laptop:flex-row w-full">
                    <MainContainer>
                        <Widgets className="hidden desktop:block" />
                        <MainContent />
                    </MainContainer>
                    <SecondaryContainer>
                        <SecondaryContent />
                    </SecondaryContainer>
                </div>
            </LikeAndShareProvider>
        </DataProvider>
    )
}

const MainContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
    // padding-top: 30px;
    padding-bottom: 15px;
    padding-right: 10px;
    padding-left: 10px;
    @media(min-width: ${screens.tablet}) {
        padding-top: 10px;
        padding-right: 13px;
        padding-left: 13px;
    }
    @media(min-width: ${screens.laptop}) {
        width: calc(100% - 350px);
        padding: 20px 40px 30px;
    }
    @media(min-width: ${screens.desktop}) {
        width: 100%;
        flex-direction: row;
        padding: 20px 15px 0 0;
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
        margin-right: 0;
    }
    @media(max-width: ${screens["tablet-down"].max}) {
      margin-bottom: 50px;
    }
`
