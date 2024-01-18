'use client'
import styled from 'styled-components';
import color from '@/shared/styles/color';
import screens from '@/shared/styles/screens';
import { useState } from 'react';
import dayjs from 'dayjs';
// import Datepicker from "react-tailwindcss-datepicker";
import Datepicker from "tailwind-datepicker-react"

const datePickerOptions = {
    autoHide: true,
    todayBtn: false,
    todayBtnText: "今天",
    clearBtn: false,
    clearBtnText: "Clear",
    theme: {
        background: "bg-white",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "opacity-50 bg-gray-200",
        input: "font-bold leading-[125%] text-[26px] px-4 py-2 h-[40px] laptop:h-[50px] hidden",
        inputIcon: "hidden",
        selected: "",
    },
    icons: {
        // () => ReactElement | JSX.Element
        // prev: () => <span>Previous</span>,
        // next: () => <span>Next</span>,
    },
    datepickerClassNames: "datepicker_class",
    defaultDate: null,
    language: "zh-tw",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: 'OOOO年 / OO月 / OO日',
    inputDateFormatProp: {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }
}

export default function DatePicker({ label }) {

    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });

    const [showStartDate, setShowStartDate] = useState(false);
    const [startDate, setStartDate] = useState(null);
    // console.log(dayjs(startDate, 'YYYY年 / MM月 / DD日').isValid())
    const [showEndDate, setShowEndDate] = useState(false);
    const [endDate, setEndDate] = useState(null);

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    return (
        <div className='laptop:flex items-center gap-4'>
            <StyledLabel className='pb-2 laptop:pb-0'>
                {label}
            </StyledLabel>
            <Container>
                <div className='w-full laptop:w-fit flex items-center gap-2 laptop:gap-2 justify-between laptop:justify-start flex-1'>
                    <div className='relative flex-1'>
                        <StyledDatePicker
                            options={{ ...datePickerOptions }}
                            show={showStartDate}
                            setShow={setShowStartDate}
                            onChange={(date) => {
                                console.log(date)
                                setStartDate(date);
                            }}
                        />
                        <StyledDateInput
                            readOnly
                            type={'text'}
                            onClick={() => { setShowStartDate(!showStartDate) }}
                            value={dayjs(startDate, 'YYYY年 / MM月 / DD日').isValid() ? dayjs(startDate).format('YYYY年 / MM月 / DD日') : ''}
                            placeholder='OOOO年/OO月/OO日'
                        />
                    </div>
                    <StyledLabel className='flex-0'>
                        至
                    </StyledLabel>
                </div>
                <div className='w-full laptop:w-fit flex items-center gap-2 laptop:gap-2 justify-between laptop:justify-start flex-1'>
                    <div className='relative flex-1'>
                        <StyledDatePicker
                            options={{ ...datePickerOptions, minDate: startDate }}
                            show={showEndDate}
                            setShow={setShowEndDate}
                            onChange={(date) => {
                                console.log(date)
                                setEndDate(date);
                            }}
                        />
                        <StyledDateInput
                            readOnly
                            type={'text'}
                            onClick={() => { setShowEndDate(!showEndDate) }}
                            value={dayjs(endDate, 'YYYY年 / MM月 / DD日').isValid() ? dayjs(endDate).format('YYYY年 / MM月 / DD日') : ''}
                            placeholder='OOOO年/OO月/OO日'
                        />
                    </div>
                    <StyledLabel className='flex-0'>
                        迄
                    </StyledLabel>
                </div>
            </Container>
        </div>

    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    @media(min-width: ${screens.tablet}) {
        flex-direction: row;
        gap: 8px;
        align-items: center;
    }
    @media(min-width: ${screens.desktop}) {
        max-width: 800px;
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

const StyledDatePicker = styled(Datepicker)`
    
`

const StyledDateInput = styled.input`
    border: 2px solid ${color.gray.gray6};
    border-radius: 4px;
    width: 100%;
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
