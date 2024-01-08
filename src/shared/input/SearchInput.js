'use client'
import styled from 'styled-components';
import color from '../styles/color';
import screens from '../styles/screens';


export default function SearchInput({ label, value, onChange = () => { }, placeholder = '' }) {
    return (
        <Container>
            <StyledLabel>
                {label}
            </StyledLabel>
            <StyledInput type='text' onChange={onChange} placeholder={placeholder} value={value} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    @media(min-width: ${screens.laptop}) {
        flex-direction: row;
        gap: 16px;
        align-items: center;
    }
`

const StyledLabel = styled.div`
    color: ${color.primary.blue1};
    font-size: 20px;
    font-weight: 700;
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    @media(min-width: ${screens.laptop}) {
        font-size: 26px;
    }
`

const StyledInput = styled.input`
    border: 2px solid ${color.gray.gray6};
    border-radius: 4px;
    width: 100%;
    max-width: 480px;
    height: 40px;
    padding: 8px 16px;
    font-size: 20px;
    color: ${color.secondary.dark.green1};
    font-weight: 700;
    @media(min-width: ${screens.laptop}) {
        font-size: 26px;
        height: 50px;
    }

`