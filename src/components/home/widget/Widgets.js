'use client'
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import Calendar from "./Calendar"
import Reminder from "./Reminder"
import Journel from "./Journal"
import Thinking from "./Thinking"

export default function Widgets() {

    return <Container>
        <Calendar />
        <Reminder />
        <Journel />
        <Thinking />
    </Container>
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 15px;
    @media(min-width: ${screens.tablet}) {
        flex-wrap: nowrap;
        padding-top: 20px;
    }
    @media(min-width: ${screens.laptop}) {
        padding-top: unset;
        flex-wrap: wrap;
        row-gap: 20px;
    }
    @media(min-width: ${screens.container}) {
        padding: 15px 0 0 0;
    }
    @media(min-width: ${screens.desktop}) {
        width: 180px;
        flex-direction: column;
        flex-wrap: nowrap;
        height: fit-content;
    }
`