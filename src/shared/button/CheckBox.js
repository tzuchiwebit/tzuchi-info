'use client'
import styled from 'styled-components';
import color from '../styles/color';
import { RadioGroup } from '@headlessui/react'
import screens from '../styles/screens';

export default function CheckBox({ label, onChange = () => { } }) {

    return (
        <StyledCheckbox>
            <label className='flex items-baseline'>
                <input type="checkbox" />
                <StyledLabel>
                    {label}
                </StyledLabel>
            </label>
        </StyledCheckbox>
    );
}

const StyledCheckbox = styled.div`

    display: flex;
    align-items: center;
    gap: 8px;

    
    input[type="checkbox"] {
        display: none;
    }
    
    input[type="checkbox"] + span:before {
        width: 24px;
        height: 24px;
        border: 1.5px solid ${color.gray.gray2};
        content: "";
        display: inline-block;
        margin: 3px 8px 0 0;
        padding: 0;
        vertical-align: top;
        border-radius: 50%;
        cursor: pointer;
        :hover {
            border: 1.5px solid ${color.gray.gray1};
        }

        @media(min-width: ${screens.laptop}) {
            width: 32px;
            height: 32px;
            margin-top: 4px;
        }
    }

    input[type="checkbox"] + span:hover:before {
        border: 1.5px solid ${color.gray.black};
    }
    
    input[type="checkbox"]:checked + span:before {
        background: ${color.primary.blue2};
        border: 1.5px solid ${color.primary.blue2};
        box-shadow: inset 0px 0px 0px 5.5px #fff;
        color: #333;
        content: "";
        text-align: center;
        border-radius: 50%;
    }

    input[type="checkbox"]:checked + span:hover:before {
        background: ${color.primary.blue1};
        border: 1.5px solid ${color.primary.blue1};
    }
    
    input[type="checkbox"]:focus + span::before {
        outline: 0;
    }
  
`

const StyledLabel = styled.span`
    color: ${color.primary.blue1};
    font-size: 20px;
    font-weight: 700;
    height: 100%;
    display: flex;
    align-item: center;
    white-space: nowrap;
    @media(min-width: ${screens.laptop}) {
        font-size: 26px;
    }
`