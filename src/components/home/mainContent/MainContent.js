import styled from "styled-components"
import MainCarousel from "./MainCarousel"
import SiteNews from "./SiteNews"
import CommunityStory from "./CommunityStory"
import Article from "./Article"
import screens from "@/shared/styles/screens"
import Widgets from "../widget/Widgets"

export default function MainContent() {

    return <Container>
        <MainCarousel />
        <Widgets className="desktop:hidden pb-2" />
        <SiteNews />
        <CommunityStory />
        <Article />
    </Container>
}

const Container = styled.div`
    width: 100%;
    flex: 1;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    @media(min-width: ${screens.desktop}) {
        width: 680px;
    }
`
