import React, { useState, useEffect, FC } from 'react'
import styled from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { fadein } from '../../keyframes/keyframes'
import { FlexColumnCenterDiv, FlexRowCenterDiv } from '../CommonComponents'
import Toggle from './Toggle'

import { TReduxState, TReduxDispatch } from '../../store/store'
import actionCreators from '../../store/actionCreators'
import { TEditedFullData, ListCountryT } from '../../types/types'
import Input from '../Input'

const Wrapper = styled(FlexColumnCenterDiv)<{ open: boolean }>`
    --panel-width: 300px;
    font-family: 'Roboto';
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

const StateProps = (state: TReduxState) => ({
    data: state.data.editedData,
})

const DispatchProps = (dispatch: TReduxDispatch) => ({
    selectAllCountries: () => dispatch(actionCreators.selectAllCountries()),
    clearAllCountries: () => dispatch(actionCreators.clearAllCountries()),
    toggleCountry: (country: string) => dispatch(actionCreators.toggleCountrySelection(country))
})

const connector = connect(StateProps, DispatchProps)
type TReduxProps = ConnectedProps<typeof connector>

type TSidePanelProps = TReduxProps & {}

const SidePanel: FC<TSidePanelProps> = (props): JSX.Element => {
    const { 
        data,
        selectAllCountries, 
        clearAllCountries,
        toggleCountry 
    }: TSidePanelProps = props
    
    const [open, setOpen] = useState<boolean>(false)
    const [filterInput, setFilterInput] = useState<string>('')
    const [filteredCountries, setFilteredCountries] = useState<TEditedFullData>()

    useEffect(() => {
        if (!!data) setFilteredCountries(data)
    }, [data])

    useEffect(() => {
        if (!!data) {
            const newFilteredCountries: TEditedFullData = {}
            
            for (let key in data) {
                if (key.toLowerCase().includes(filterInput.toLowerCase())) {
                    newFilteredCountries[key] = {
                        ...data[key]
                    }
                }
            }

            setFilteredCountries(newFilteredCountries)
        }
    }, [filterInput])
    
    const toggleHandler = () => {
        setOpen(!open)
    }

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterInput(e.target.value)
    }

    const clearInputHandler = () => {
        setFilterInput('')
    }

    return (
        <Wrapper open={open}>
            <Toggle open={open} toggle={toggleHandler} />
            <FilterInput
                input={filterInput}
                change={inputHandler}
                clear={clearInputHandler}
            />
            <CountrySelector 
                data={filteredCountries}
                toggleCountry={toggleCountry}
                selectAll={selectAllCountries}
                clearAll={clearAllCountries}    
            />
        </Wrapper>
    )
}

const FilterInputWrapper = styled(FlexColumnCenterDiv)`
    align-items: center;
    width: 100%;
`

type TFilterInputProps = {
    input: string
    change: (e: React.ChangeEvent<HTMLInputElement>) => void
    clear: () => void
}

const FilterInput: FC<TFilterInputProps> = (props): JSX.Element => {
    const { 
        input, 
        change,
        clear
    }: TFilterInputProps = props

    return (
        <FilterInputWrapper>
            <FilterTitle>
                Country Search
            </FilterTitle>
            <Input 
                value={input}
                name="country"
                type="text"
                placeholder="country"
                change={change}
                clear={clear}
            />
        </FilterInputWrapper>
    )
}

const SelectorWrapper = styled(FlexColumnCenterDiv)`
    justify-content: flex-start;
    width: 100%;
    margin-top: 10px;
    overflow-y: auto;
`

const ButtonsWrapper = styled(FlexRowCenterDiv)``

const Button = styled(FlexRowCenterDiv)`
    border: 1px solid gainsboro;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 10px;
    padding: 5px 10px;
    font-family: 'Roboto';
    transition: all .1s;
    background: white;

    &:hover {
        color: blue;
        box-shadow: 0 0 10px 0 gainsboro;
    }
`

const ButtonText = styled.p`
    font-size: .7rem;
    text-transform: uppercase;
`

const ListWrapper = styled(SelectorWrapper)`
`


type TCountrySelectorProps = {
    data?: TEditedFullData
    selectAll(): void
    clearAll(): void
    toggleCountry(country: string): void
}

const CountrySelector: FC<TCountrySelectorProps> = React.memo((props): JSX.Element => {
    const { 
        data, 
        selectAll, 
        clearAll, 
        toggleCountry 
    }: TCountrySelectorProps = props

    return (
        <SelectorWrapper>
            <ButtonsWrapper>
                <Button onClick={clearAll}>
                    <ButtonText>Clear All</ButtonText>
                </Button>
                <Button onClick={selectAll}>
                    <ButtonText>Select All</ButtonText>
                </Button>
            </ButtonsWrapper>
            <ListWrapper>
                { !!data && Object.keys(data).map((key: string) => (
                    <CountryItem 
                        key={key} 
                        name={key} 
                        show={data[key].show}
                        toggle={toggleCountry}    
                    />
                ))}
            </ListWrapper>
        </SelectorWrapper>
    )
})

const CountryItemWrapper = styled(FlexRowCenterDiv)`
    justify-content: space-between;
    width: 100%;
    min-height: 30px;
    flex-shrink: 0;
    padding: 5px 20px;
    border-top: 1px solid gainsboro;
    cursor: pointer;
    transition: all var(--transition-time);

    &:hover {
        background: white;
        box-shadow: 0 0 20px gainsboro;
    }
`

const CountryName = styled.p`
    text-transform: uppercase;
    font-size: .8rem;
`

const CheckWrapper = styled.div<{ selected: boolean }>`
    background: white;
    border: 1px solid whitesmoke;

    svg {
        color: ${props => props.selected ? 'blue' : 'transparent' };
        transition: all .1s;
    }
`

type TCountryItemProps = {
    name: string
    show: boolean
    toggle(name: string): void
}

const CountryItem: FC<TCountryItemProps> = React.memo((props): JSX.Element => {
    const { name, show, toggle }: TCountryItemProps = props 
    
    const clickHandler = () => {
        toggle(name)
    }

    return (
        <CountryItemWrapper onClick={clickHandler}>
            <CountryName> {name} </CountryName>
            <CheckWrapper selected={show}>
                <FontAwesomeIcon icon="check" />
            </CheckWrapper>
        </CountryItemWrapper>
    )
})

export default connector(SidePanel)