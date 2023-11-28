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
    // border: 1px solid black;
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 20px;
    @media(min-width: ${screens.desktop}) {
        width: 180px;
        padding: 0;
        flex-direction: column;
    }
`