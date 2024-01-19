'use client'
// this button acts like clickable tag
import styled from 'styled-components';
import color from '../styles/color';

const selectedStyle = {
    color: 'white',
    backgroundColor: color.primary.blue2,
    borderColor: color.primary.blue2,
}

export default function LabelBtn({ children, selected = false, ...props }) {
    // Tailwind CSS
    // const extendStyles = className || '';
    return (
        <LabelButton {...props} style={selected ? selectedStyle : {}}>
            {children}
        </LabelButton>
    );
}

const LabelButton = styled.button`
    color: ${color.primary.blue2};
    background-color: white;
    padding: 0 12px;
    display: flex;
    font-weight: bold;
    white-space: nowrap;
    border-radius: 9999px;
    border: 1.5px solid ${color.primary.blue2};
    font-size: large;
    cursor: pointer;
    gap: 4px;
    line-height: 140%;
    align-items: center;
    transition: all .3s;
    &:hover {
        color: white;
        background-color: ${color.primary.blue3};
        border-color: ${color.primary.blue3};
    }
    &:focus {
        color: white;
        background-color: ${color.primary.blue2};
        border-color: ${color.primary.blue2};
    }
`