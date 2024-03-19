'use client'
import styled from "styled-components"
import screens from "@/shared/styles/screens"
import Calendar from "./Calendar"
import Reminder from "./Reminder"
import Journel from "./Journal"
import Thinking from "./Thinking"
import { Transition } from '@headlessui/react'
import { useState } from "react"
import Icon from "@/shared/Icon"

export default function Widgets() {

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    return <div className="w-full">
        <div className="w-full border-b border-solid border-gray-gray7 justify-between pb-2 mb-2 hidden laptop:flex desktop:hidden">
            <div className="font-bold text-lg text-primary-blue1">
                {open ? '' : '志工早會 • 證嚴上人每日一叮嚀 • 慈濟週報 • 宗門學思'}
            </div>
            <div
                className="font-medium text-lg text-primary-blue1 flex gap-1 cursor-pointer"
                onClick={toggle}>
                {open ? '收合' : '展開'} <Icon.DownArrow style={{ width: 20, transform: open ? 'rotate(180deg)' : '', transition: 'all .3s' }} />
            </div>
        </div>
        <Transition
            show={open}
            className="transition-all duration-300 overflow-hidden hidden laptop:flex desktop:hidden"
            enterFrom="transform -tranlateY-50 opacity-0 max-h-0"
            enterTo="transform tranlateY-0 opacity-100 max-h-[1000px]"
            leaveFrom="transform tranlateY-0 opacity-100 max-h-[1000px]"
            leaveTo="transform -tranlateY-50 opacity-0 max-h-0"
        >
            <Container>
                <Calendar />
                <Reminder />
                <Journel />
                {/* <Thinking /> */}
            </Container>
        </Transition>
        <div className="w-full flex laptop:hidden desktop:flex">
            <Container>
                <Calendar />
                <Reminder />
                <Journel />
                {/* <Thinking /> */}
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
    row-gap: 15px;
    @media(min-width: ${screens.tablet}) {
        flex-wrap: nowrap;
        padding-top: 20px;
        justify-content: start;
        gap: 10px;
    }
    @media(min-width: ${screens.laptop}) {
        justify-content: space-between;
        padding-top: 12px;
        flex-wrap: wrap;
        row-gap: 20px;
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