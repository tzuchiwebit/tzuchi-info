'use client'
import styled from 'styled-components';
import color from '../styles/color';

// export default styled.div`
//   width: 90%;
//   max-width: 1168px;
//   margin: 0 auto;
//   `;

export default function SeBtn({ children, ...props }) {
    // Tailwind CSS
    // const extendStyles = className || '';
    return (
        <SecondBtn {...props}>
            {children}
        </SecondBtn>
    );
}

const SecondBtn = styled.button`
    color: ${color.primary.blue2};
    background-color: white;
    padding: 8px 16px;
    display: flex;
    font-weight: bold;
    white-space: nowrap;
    border-radius: 4px;
    border: 2px solid ${color.primary.blue2};
    font-size: large;
    cursor: pointer;
    gap: 4px;
    line-height: 125%;
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