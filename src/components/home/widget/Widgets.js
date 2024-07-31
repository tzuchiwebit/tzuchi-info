'use client'
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import Calendar from "./Calendar"
import Morning from "./Morning"
import Reminder from "./Reminder"
import Journel from "./Journal"
import Thinking from "./Thinking"
import { Transition } from '@headlessui/react'
import { useState } from "react"
import Icon from "@/shared/Icon"
import classNames from "@/utils/classNames"

export default function Widgets({ ...props }) {

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    return <div className={classNames(props.className, "w-full")} style={{ flex: 0 }} >
        <div className="w-full flex flex-col">
            <Calendar />
            <Container>
                <Morning />
                <Reminder />
                <Journel />
            </Container>
        </div>
    </div>
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 10px;
    padding-top: 16px;

    @media(min-width: ${screens.tablet}) {
        flex-wrap: nowrap;
        padding-top: 20px;
        justify-content: start;
        row-gap: 10px;
        column-gap: 20px;
    }
    @media(min-width: ${screens.laptop}) {
        justify-content: space-between;
        padding-top: 20px;
        flex-wrap: wrap;
        row-gap: 20px;
        column-gap: 10px
    }
    @media(min-width: ${screens.container}) {
        padding: 12px 0 0 0;
    }
    @media(min-width: ${screens.desktop}) {
        width: 180px;
        flex-direction: column;
        flex-wrap: nowrap;
        height: fit-content;
        padding-top: 15px;
    }
`
