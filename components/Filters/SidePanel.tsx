import * as React from 'react'
import styled from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { fadein } from '../../keyframes/keyframes'
import { FlexColumnCenterDiv, FlexRowCenterDiv } from '../CommonComponents'
import Toggle from './Toggle'

import { TReduxState, TReduxDispatch } from '../../store/store'
import actionCreators from '../../store/actionCreators'
import { TFormattedData, TCountryData } from '../../types/types'

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

const mapStateToProps = (state: TReduxState) => ({
    fullData: state.data.fullData,
    nameFilter: state.data.nameFilter,
    selectedCountries: state.data.selectedCountries
})

const mapDispatchToProps = (dispatch: TReduxDispatch) => ({
    setNameFilter: (name: string) => dispatch(actionCreators.setNameFilter(name))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type TReduxProps = ConnectedProps<typeof connector>

type TSidePanelProps = TReduxProps & {}

const SidePanel: React.FunctionComponent<TSidePanelProps> = (props): JSX.Element => {
    const { nameFilter, setNameFilter, fullData, selectedCountries }: TSidePanelProps = props
    
    const [open, setOpen] = React.useState<boolean>(true)

    const toggleHandler = () => {
        setOpen(!open)
    }

    return (
        <Wrapper open={open}>
            <Toggle open={open} toggle={toggleHandler} />
            <NameFilter {...props} />
            <CountrySelector data={fullData!} selectedCountries={selectedCountries!} />
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

type TNameFilterProps = {
    nameFilter: string
    setNameFilter(input: string): void
}

const NameFilter: React.FunctionComponent<TNameFilterProps> = (props): JSX.Element => {
    const { nameFilter, setNameFilter }: TNameFilterProps = props

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value)
    }

    return (
        <NameFilterWrapper>
            <FilterTitle>
                Country Search
            </FilterTitle>
            <Input value={nameFilter} onChange={changeHandler} name="country" type="text" placeholder="country"  />
        </NameFilterWrapper>
    )
}

const ListWrapper = styled(FlexColumnCenterDiv)`
    justify-content: flex-start;
    width: 100%;
    margin-top: 20px;
    overflow-y: auto;
`

type TCountrySelectorProps = {
    data: TFormattedData,
    selectedCountries: string[]
}

const CountrySelector: React.FunctionComponent<TCountrySelectorProps> = (props): JSX.Element => {
    const { data, selectedCountries }: TCountrySelectorProps = props

    return (
        <ListWrapper>
            { data.map((country: TCountryData) => (
                <CountryButton key={country.name} name={country.name} selected={selectedCountries.includes(country.name)} />
            ))}
        </ListWrapper>
    )
}

const ButtonWrapper = styled(FlexRowCenterDiv)`
    justify-content: space-between;
    width: 100%;
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
`

const CheckWrapper = styled.div`
    background: white;
    border: 1px solid whitesmoke;
`

type TCountryButtonProps = {
    name: string
    selected: boolean
}

const CountryButton: React.FunctionComponent<TCountryButtonProps> = (props): JSX.Element => {
    const { name }: TCountryButtonProps = props

    return (
        <ButtonWrapper>
            <CountryName> {name} </CountryName>
            <CheckWrapper>
                <FontAwesomeIcon icon="check" color={'royalblue'} />
            </CheckWrapper>
        </ButtonWrapper>
    )
}

export default connector(SidePanel)