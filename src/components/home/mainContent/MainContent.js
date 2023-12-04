import styled from "styled-components"
import MainCarousel from "./MainCarousel"
import SiteNews from "./SiteNews"
import CommunityStory from "./CommunityStory"
import Article from "./Article"
import screens from "@/shared/styles/screens"

export default function MainContent() {

    return <Container>
        <MainCarousel />
        <SiteNews />
        <CommunityStory />
        <Article />
    </Container>
}

const Container = styled.div`
    width: 100%;
    flex: 1;
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    @media(min-width: ${screens.desktop}) {
        width: 680px;
    }
    
`