'use client'
// this button acts like clickable tag
import styled from 'styled-components';
import color from '../styles/color';
import cloudTagStyles from '../styles/cloudTagStyles';
import { useMemo } from 'react';
import _ from 'lodash';
import screens from '../styles/screens';

const defaultStyle = {
    bgColor: color.primary.blue2,
    textColor: 'white',
}

export default function CloudTag({ label = '', bgColor = "#000", textColor = "#fff", selected = false, ...props }) {
    // Tailwind CSS
    // const extendStyles = className || '';

    // const { bgColor, textColor } = useMemo(() => {
    //     const target = _.find(cloudTagStyles, (item) => label.indexOf(item.keyword) > -1) || defaultStyle;
    //     return target
    // }, [label])

    // console.log(`targetCloudStyle`);
    // console.log(targetCloudStyle);

    return (
        <CloudTagButton {...props} style={selected ? selectedStyle : {}} $bgColor={bgColor} $textColor={textColor} >
            {label}
        </CloudTagButton>
    );
}

const CloudTagButton = styled.button`
    color: ${props => props.$textColor};
    background-color: ${props => props.$bgColor};
    padding: 2px 12px;
    display: flex;
    font-weight: 500;
    white-space: nowrap;
    border-radius: 9999px;
    cursor: pointer;
    gap: 4px;
    line-height: 140%;
    align-items: center;
    transition: all .3s;
    @media(min-width:${screens.laptop}) {
        font-size: large;
    }
    // &:hover {
    //     color: white;
    //     background-color: ${color.primary.blue3};
    //     border-color: ${color.primary.blue3};
    // }
    // &:focus {
    //     color: white;
    //     background-color: ${color.primary.blue2};
    //     border-color: ${color.primary.blue2};
    // }
`
