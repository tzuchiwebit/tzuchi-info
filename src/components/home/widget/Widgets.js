'use client'
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import Calendar from "./Calendar"
import Reminder from "./Reminder"

// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';

export default function Widgets() {

    return <Container>
        <Calendar />
        <Reminder />
    </Container>
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 15px;
    padding: 15px;
    @media(min-width: ${screens.container}) {
        padding: 0;
    }
    @media(min-width: ${screens.desktop}) {
        width: 180px;
        flex-direction: column;
    }
`