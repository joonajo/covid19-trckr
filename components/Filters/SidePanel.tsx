import * as React from 'react'
import styled from 'styled-components'
import { FlexColumnCenterDiv } from '../CommonComponents'
import { fadein } from '../../keyframes/keyframes'
import Toggle from './Toggle'

const Wrapper = styled(FlexColumnCenterDiv)<{ open: boolean }>`
    --panel-width: 300px;
    font-family: 'Roboto Mono';
    padding: 40px 10px 10px 10px;
    justify-content: flex-start;
    align-items: flex-start;
    position: fixed;
    height: 100%;
    width: var(--panel-width);
    top: 0;
    left: ${props => props.open ? '0' : `-300px`};
    background: snow;
    box-shadow: 0 0 20px 0 gainsboro;
    animation: ${fadein} .5s;
    transition: left var(--transition-time);
    z-index: 5;
`

const FilterTitle = styled.p`
    text-transform: uppercase;
    font-size: .9rem;
    margin: 10px 0;
`


const SidePanel: React.FunctionComponent = (): JSX.Element => {
    const [open, setOpen] = React.useState<boolean>(true)

    const toggleHandler = () => {
        setOpen(!open)
    }

    return (
        <Wrapper open={open}>
            <Toggle open={open} toggle={toggleHandler} />
            <NameFilter />
        </Wrapper>
    )
}

const NameFilterWrapper = styled(FlexColumnCenterDiv)`
    align-items: flex-start;
    width: 100%;
`

const Input = styled.input`
    width: 100%;
    padding: 5px 10px;
    border: 1px solid gainsboro;
    font-family: 'Roboto Mono';

    &::placeholder {
        color: gray;
        font-size: .7rem;
    }
`

const NameFilter: React.FunctionComponent = (): JSX.Element => {
    const [input, setInput] = React.useState<string>('')

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <NameFilterWrapper>
            <FilterTitle>
                Country Search
            </FilterTitle>
            <Input value={input} onChange={changeHandler} name="country" type="text" placeholder="country"  />
        </NameFilterWrapper>
    )
}

export default SidePanel