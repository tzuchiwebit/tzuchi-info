'use client'
import styled from 'styled-components';
import color from '@/shared/styles/color';
import screens from '@/shared/styles/screens';
import { useState } from 'react';
import CheckBox from '@/shared/button/CheckBox';
import SeBtn from '@/shared/button/SeBtn';
import Icon from '@/shared/Icon';
import SearchSelect from '@/shared/input/SearchSelect';
import SearchInput from '@/shared/input/SearchInput';

import { useForm, useFieldArray, Controller } from "react-hook-form";


const AdvanceSearchTypeOptions = [
    {
        label: '發生地點',
        value: '發生地點',
    },
    {
        label: '作者',
        value: '作者',
    },
    {
        label: '熱門搜尋',
        value: '熱門搜尋',
    }
]

const AdvanceSearchLogicOptions = [
    {
        label: 'AND',
        value: 'AND',
    },
    {
        label: 'OR',
        value: 'OR',
    },
    {
        label: 'NOT',
        value: 'NOT',
    }
]


function StyledInputRow({ item, index, register, control, remove }) {


    return <div key={item.id} className='w-full bg-gray-gray9 p-3 flex gap-2 items-center laptop:justify-between mb-1'>
        <div className='flex flex-col laptop:flex-row gap-2 flex-1 laptop:max-w-[900px]'>
            <SearchSelect options={AdvanceSearchTypeOptions} className='laptop:max-w-[260px] flex-0' />
            <SearchInput className='tablet:min-w-[300px] flex-1' placeholder='輸入進階搜尋關鍵字' />
            <SearchSelect options={AdvanceSearchLogicOptions} className='laptop:max-w-[260px] flex-0' />
        </div>
        <div className='flex-1 max-w-[110px] h-full laptop:h-[40px] flex justify-end items-center'>
            <div className='h-[135px] laptop:h-full border-l border-solid border-gray-gray5 mr-2' />
            <StyledRemoveButton onClick={() => remove(index)} >
                <Icon.Cancel /> 移除
            </StyledRemoveButton>
            {/* <button type="button" onClick={() => remove(index)}>Delete</button> */}
        </div>
    </div>
}

export default function AdvanceSearch({ label, }) {

    const [open, setOpen] = useState(false);

    const { register, control, handleSubmit, reset, trigger, setError } = useForm({
        // defaultValues: {}; you can populate the fields by this attribute 
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "test",
    });


    return (
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit(data => console.log(data))}>
                <div className='flex items-center gap-4'>
                    <CheckBox label='進階' onChange={setOpen} />
                    {
                        open ? <div className='border-r border-solid border-gray-gray7 pr-4'>
                            <StyledSecondButton onClick={() => append({ firstName: "bill", lastName: "luo" })}>
                                <Icon.Plus /> 欄位
                            </StyledSecondButton>
                        </div> : <></>
                    }
                </div>
                {
                    open ? <div className='mt-4'>
                        {fields.map((item, index) => (
                            <StyledInputRow
                                key={index}
                                item={item}
                                index={index}
                                register={register}
                                control={control}
                                remove={remove}
                            />
                        ))}
                    </div> : <></>
                }
            </form>
        </div>
    );
}

const Container = styled.div`
    
`

const StyledSecondButton = styled(SeBtn)`
    height: 40px;
    svg {
        width: 20px;
        margin-right: 6px;
    }
    @media(min-width: ${screens.laptop}) {
        height: 50px;
        font-size: 26px;
        svg {
            width: 24px;
        }
    }
`

const StyledRemoveButton = styled(SeBtn)`
    svg {
        width: 16px;
        margin-right: 2px;
    }
    @media(min-width: ${screens.laptop}) {
        height: 40px;
        font-size: 18px;
        svg {
            width: 20px;
        }
    }
`


