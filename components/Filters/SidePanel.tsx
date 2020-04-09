import React, { useState, useEffect, FunctionComponent } from 'react'
import styled from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { fadein } from '../../keyframes/keyframes'
import { FlexColumnCenterDiv, FlexRowCenterDiv } from '../CommonComponents'
import Toggle from './Toggle'

import { TReduxState, TReduxDispatch } from '../../store/store'
import actionCreators from '../../store/actionCreators'
import { TEditedFullData } from '../../types/types'
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
    nameFilter: state.data.nameFilter,
})

const DispatchProps = (dispatch: TReduxDispatch) => ({
    setNameFilter: (name: string) => dispatch(actionCreators.setNameFilter(name)),
    selectAllCountries: () => dispatch(actionCreators.selectAllCountries()),
    clearAllCountries: () => dispatch(actionCreators.clearAllCountries()),
    toggleCountry: (country: string) => dispatch(actionCreators.toggleCountrySelection(country))
})

const connector = connect(StateProps, DispatchProps)
type TReduxProps = ConnectedProps<typeof connector>

type TSidePanelProps = TReduxProps & {}

const SidePanel: FunctionComponent<TSidePanelProps> = (props): JSX.Element => {
    const { 
        data,
        nameFilter,
        setNameFilter, 
        selectAllCountries, 
        clearAllCountries,
        toggleCountry 
    }: TSidePanelProps = props
    
    const [open, setOpen] = useState<boolean>(false)

    const toggleHandler = () => {
        setOpen(!open)
    }

    return (
        <Wrapper open={open}>
            <Toggle open={open} toggle={toggleHandler} />
            <NameFilter
                nameFilter={nameFilter}
                setNameFilter={setNameFilter}
            />
            <CountrySelector 
                data={data!} 
                toggleCountry={toggleCountry}
                selectAll={selectAllCountries}
                clearAll={clearAllCountries}    
            />
        </Wrapper>
    )
}

const NameFilterWrapper = styled(FlexColumnCenterDiv)`
    align-items: center;
    width: 100%;
`

type TNameFilterProps = {
    nameFilter: string
    setNameFilter(input: string): void
}

const NameFilter: FunctionComponent<TNameFilterProps> = (props): JSX.Element => {
    const { 
        nameFilter, 
        setNameFilter 
    }: TNameFilterProps = props

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value)
    }

    const clearHandler = () => {
        setNameFilter('')
    }

    return (
        <NameFilterWrapper>
            <FilterTitle>
                Country Search
            </FilterTitle>
            <Input 
                value={nameFilter}
                name="country"
                type="text"
                placeholder="country"
                change={changeHandler}
                clear={clearHandler}
            />
        </NameFilterWrapper>
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
    data: TEditedFullData,
    selectAll(): void
    clearAll(): void
    toggleCountry(country: string): void
}

const CountrySelector: FunctionComponent<TCountrySelectorProps> = React.memo((props): JSX.Element => {
    const { data, selectAll, clearAll, toggleCountry }: TCountrySelectorProps = props

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
                { Object.keys(data).map((key: string) => (
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

const CountryItem: FunctionComponent<TCountryItemProps> = (props): JSX.Element => {
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
}

export default connector(SidePanel)