'use client'
import styled from 'styled-components';
import color from '@/shared/styles/color';
import screens from '@/shared/styles/screens';
import { useState } from 'react';
// import Datepicker from "react-tailwindcss-datepicker";
import Datepicker from "tailwind-datepicker-react"

const datePickerOptions = {
	autoHide: true,
	todayBtn: false,
    todayBtnText: "今天",
	clearBtn: false,
	clearBtnText: "Clear",
	// maxDate: new Date("2030-01-01"),
	// minDate: new Date("1950-01-01"),
	theme: {
		background: "bg-white",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "",
		// disabledText: "bg-red-500",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		// () => ReactElement | JSX.Element
		// prev: () => <span>Previous</span>,
		// next: () => <span>Next</span>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date(),
	language: "zh-tw",
	disabledDates: [],
	weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "選擇日期",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
}

export default function DatePicker({
    label,
    startDate,
    onStartDateChange = () => { },
    endDate,
    onEndDateChange = () => { },
    placeholder = ''
}) {

    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });

    const [show, setShow] = useState(false);

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    return (
        <Container>
            <StyledLabel>
                {label}
            </StyledLabel>
            <div>
                <Datepicker options={datePickerOptions} show={show} setShow={setShow} />
            </div>
            <div>

            </div>
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