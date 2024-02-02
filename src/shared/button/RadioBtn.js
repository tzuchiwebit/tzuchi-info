'use client'
import styled from 'styled-components';
import color from '../styles/color';
import { RadioGroup } from '@headlessui/react'
import screens from '../styles/screens';

export default function RadioBtn({ options = [], selectedValue, onChange = () => { } }) {

    return (
        <StyledRadioBtn
            value={selectedValue}
            onChange={onChange}
        >
            {
                options.map((option, index) => {
                    const radioChecked = (selectedValue === option.value);
                    return (<StyledRadioBtn.Option value={option.value} key={index}>
                        <StyledRadioInput type="radio" className='accent-primary-blue2' checked={radioChecked} onChange={() => { }} />
                        <StyledRadioLabel>{option.label}</StyledRadioLabel>
                    </StyledRadioBtn.Option>)
                })
            }
        </StyledRadioBtn>
    );
}

const StyledRadioBtn = styled(RadioGroup)`
    display: flex;
    gap: 24px;
    > div {
        display: flex;
        align-items: center;
    }
    @media(min-width: ${screens.laptop}) {
        gap: 36px;
    }
`

const StyledRadioInput = styled.input`
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin-right: 8px;
    accent-color: ${color.primary.blue2};
    @media(min-width: ${screens.laptop}) {
        width: 32px;
        height: 32px;
        margin-right: 8px;
    }
`

const StyledRadioLabel = styled.span`
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    color: ${color.primary.blue1};
    @media(min-width: ${screens.laptop}) {
        font-size: 26px;
    }
`