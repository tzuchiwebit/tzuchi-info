import Icon from "@/shared/Icon"
import styled from "styled-components"
import MainCarousel from "./MainCarousel"
import SiteNews from "./SiteNews"
import CommunityStory from "./CommunityStory"
import screens from "@/shared/styles/screens"

// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';

export default function MainContent() {

    return <Container>
        <MainCarousel />
        <SiteNews />
        <CommunityStory />
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