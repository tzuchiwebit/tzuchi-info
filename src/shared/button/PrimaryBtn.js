'use client'
import styled from 'styled-components';
import color from '../styles/color';
import screens from '../styles/screens';

// export default styled.div`
//   width: 90%;
//   max-width: 1168px;
//   margin: 0 auto;
//   `;

export default function PrimaryBtn({ children, ...props }) {
    // Tailwind CSS
    // const extendStyles = className || '';
    return (
        <PrimaryButton {...props}>
            {children}
        </PrimaryButton>
    );
}

const PrimaryButton = styled.button`
    color: white;
    background-color: ${color.primary.blue2};
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    font-weight: bold;
    white-space: nowrap;
    border-radius: 6px;
    border: 2px solid white;
    font-size: large;
    cursor: pointer;
    gap: 4px;
    line-height: 125%;
    align-items: center;
    transition: all .3s;
    width: 100%;
    &:hover {
        color: ${color.primary.blue2};
        background-color: ${color.complementary.blue1};
    }
    &:focus {
        color: ${color.primary.blue2};
        background-color: white;
        border: 2px solid ${color.primary.blue2};
    }
    @media(min-width: ${screens.laptop}) {
        width: auto;
    }
`