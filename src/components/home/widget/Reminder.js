'use client'
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import color from "@/shared/styles/color"

// import Image from 'next/image';
// import AuthorIcon from '@/asset/icon/main/author.svg';

export default function Reminder() {

    return <Container>
        <>Reminder</>
    </Container>
}

const Container = styled.div`
    width: 100%;
    border: 2px solid ${color.gray.gray8};
    flex-basis: 50%;
    @media(min-width: ${screens.tablet}) {
        flex-basis: 25%;
    }
    @media(min-width: ${screens.laptop}) {
        flex-basis: 50%;
    }
    @media(min-width: ${screens.desktop}) {
        flex-basis: 100%;
    }
`