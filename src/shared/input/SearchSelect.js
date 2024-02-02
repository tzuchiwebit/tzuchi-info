'use client'
import styled from 'styled-components';
import color from '../styles/color';
import screens from '../styles/screens';
import Icon from '../Icon';
import { useEffect, useMemo, useState, useRef } from 'react';
import { Transition } from '@headlessui/react';
import _ from 'lodash';

const defaultOption = [
    { label: '--- 請選擇 ---', value: '--- 請選擇 ---' },
]

export default function SearchSelect({ label, options = [], sm = false, ...props }) {

    const [value, setValue] = useState('--- 請選擇 ---')

    const selectOptions = useMemo(() => _.concat(defaultOption, options), [options]);

    const [isShowing, setIsShowing] = useState(false)

    const ref = useRef();
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsShowing(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <Container ref={ref} {...props}>
            {label ? <StyledLabel $sm={sm}>
                {label}
            </StyledLabel> : <></>}
            <div className='relative w-full' onClick={() => setIsShowing((isShowing) => !isShowing)}>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                        <Icon.SelectArrows style={{ width: 24, color: color.primary.blue1 }} />
                    </button>
                </span>
                <StyledInput $sm={sm} type='text' readOnly value={value} />
                <StyledSelectSection
                    className={'absolute shadow-elevation-4'}
                    show={isShowing}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {
                        selectOptions.map((opt, index) => (
                            <StyledOption
                                $sm={sm}
                                key={index}
                                onClick={() => { setValue(opt?.value) }}
                            >
                                {value === opt.value ? <Icon.Check style={{ width: 20 }} /> : <></>} {opt?.label}
                            </StyledOption>
                        ))
                    }
                </StyledSelectSection>
            </div>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    width: 100%;
    @media(min-width: ${screens.laptop}) {
        flex-direction: row;
        gap: 16px;
        align-items: center;
    }
`

const StyledLabel = styled.div`
    // color: ${color.primary.blue1};
    font-size: ${(props) => props.$sm ? '18px' : '20px' };
    font-weight: 700;
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    @media(min-width: ${screens.laptop}) {
        font-size: ${(props) => props.$sm ? '18px' : '26px' };
    }
`

const StyledInput = styled.input`
    border: 2px solid ${color.gray.gray6};
    border-radius: 4px;
    width: 100%;
    height: 40px;
    padding: 8px 16px;
    font-size: 20px;
    color: ${color.secondary.dark.green1};
    font-weight: 700;
    cursor: pointer;
    @media(min-width: ${screens.laptop}) {
        font-size: ${(props) => props.$sm ? '18px' : '26px' };
        height: ${(props) => props.$sm ? '40px' : '50px' };
    }

`

const StyledSelectSection = styled(Transition)`
    position: absolute;
    top: 40px;
    // border: 2px solid black;
    background-color: ${color.gray.gray10};
    z-index: 10;
    width: 100%;
    border-radius: 4px;
    padding 8px 0;
    @media(min-width: ${screens.laptop}) {
        font-size: 26px;
        top: 50px;
    }
`

const StyledOption = styled.div`
    color: ${color.gray.gray1};
    font-size: ${(props) => props.$sm ? '18px' : '24px' };
    padding-top: 4px;
    padding-bottom: 4px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
        font-weight: 700;
        font-size: ${(props) => props.$sm ? '18px' : '26px' };
    }
`