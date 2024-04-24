import styled from "styled-components"
import screens from "@/shared/styles/screens"
import Activities from "./Activities"
import Announcements from "./Announcements"
import BookSuggest from "./BookSuggest"
import Youtube from "./Youtube"

export default function SecondaryContent() {

    return <Container>
        <div className="flex flex-col tablet:flex-row-reverse tablet:gap-5 laptop:flex-col">
            <Activities />
            <Announcements />
        </div>
        <BookSuggest />
        <Youtube />
    </Container>
}

const Container = styled.div`
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 23px;
    @media(min-width:${screens.laptop}) {
        padding-right: 40px;
    }
    @media(min-width:${screens.container}) {
        padding-right: 12px;
    }
    @media(min-width:${screens.desktop}) {
        padding-right: 12px;
    }
`