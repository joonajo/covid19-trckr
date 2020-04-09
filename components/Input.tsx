import * as React from 'react'
import styled from 'styled-components'
import { FlexRowCenterDiv } from './CommonComponents'


const InputWrapper = styled(FlexRowCenterDiv)`
    width: 250px;
    height: 100px;
    position: relative;
`

const InputElem = styled.input`
    width: 100%;
    padding: 10px 10px;
    border: 1px solid whitesmoke;
    transition: all .2s;
    background: white;

    &::placeholder {
        color: gray;
        font-size: .7rem;
    }

    &:focus {
        border: 1px solid gainsboro;
        outline: none;
        box-shadow: 0 0 10px -5px gainsboro;
    }
`
    
const ClearButton = styled.p<{ show: boolean }>`
    position: absolute;
    padding: 5px;
    border: 1px solid gainsboro;
    border-radius: 10px;
    background: white;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
    font-size: .7rem;
    transition: all .2s;
    cursor: pointer;
    z-index: ${props => props.show ? '2' : '-1' };
    opacity: ${props => props.show ? '1' : '0' };

    &:hover {
        border-color: royalblue;
        color: blue;
        box-shadow: 0 0 10px 0 gainsboro;
    }
`

type Props = {
    value: string
    type: string
    name: string
    placeholder: string
    change(e: React.ChangeEvent<HTMLInputElement>): void
    clear(): void
    focus?: () => void
    click?: () => void
}

const Input: React.FunctionComponent<Props> = (props): JSX.Element => {
    const {
        value,
        type,
        name,
        change,
        clear,
        placeholder,
        focus,
        click
    }: Props = props

    return (
        <InputWrapper>
            <InputElem value={value} onClick={click} onFocus={focus} onChange={change} name={name} type={type} placeholder={placeholder} autoComplete='off' />
            <ClearButton show={!!value.length} onClick={clear}>clear</ClearButton>
        </InputWrapper>
    )
}

export default Input