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

const mapStateToProps = (state: TReduxState) => ({
    fullData: state.data.fullData,
    nameFilter: state.data.nameFilter,
    selectedCountries: state.data.selectedCountries
})

const mapDispatchToProps = (dispatch: TReduxDispatch) => ({
    setNameFilter: (name: string) => dispatch(actionCreators.setNameFilter(name)),
    selectAllCountries: () => dispatch(actionCreators.selectAllCountries()),
    clearAllCountries: () => dispatch(actionCreators.clearAllCountries())
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type TReduxProps = ConnectedProps<typeof connector>

type TSidePanelProps = TReduxProps & {}

const SidePanel: React.FunctionComponent<TSidePanelProps> = (props): JSX.Element => {
    const { 
        nameFilter, 
        setNameFilter, 
        fullData, 
        selectedCountries, 
        selectAllCountries, 
        clearAllCountries 
    }: TSidePanelProps = props
    
    const [open, setOpen] = React.useState<boolean>(true)

    const toggleHandler = () => {
        setOpen(!open)
    }

    return (
        <Wrapper open={open}>
            <Toggle open={open} toggle={toggleHandler} />
            <NameFilter {...props} />
            <CountrySelector 
                data={fullData!} 
                selectedCountries={selectedCountries!} 
                selectAll={selectAllCountries}
                clearAll={clearAllCountries}    
            />
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

const SelectorWrapper = styled(FlexColumnCenterDiv)`
    justify-content: flex-start;
    width: 100%;
    margin-top: 10px;
`

const ButtonsWrapper = styled(FlexRowCenterDiv)``

const Button = styled(FlexRowCenterDiv)`
    border: 1px solid gainsboro;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 10px;
    padding: 5px 10px;
    font-family: 'Roboto';
    transition: all var(--transition-time);
    background: snow;

    &:hover {
        color: blue;
        background: white;
        box-shadow: 0 0 10px 0 gainsboro;
    }
`

const ButtonText = styled.p`
    font-size: .7rem;
    text-transform: uppercase;
`

const ListWrapper = styled(SelectorWrapper)`
    overflow-y: auto;
`


type TCountrySelectorProps = {
    data: TFormattedData,
    selectedCountries: string[]
    selectAll(): void
    clearAll(): void
}

const CountrySelector: React.FunctionComponent<TCountrySelectorProps> = (props): JSX.Element => {
    const { data, selectedCountries, selectAll, clearAll }: TCountrySelectorProps = props

    return (
        <SelectorWrapper>
            <ButtonsWrapper>
                <Button>
                    <ButtonText>Clear All</ButtonText>
                </Button>
                <Button>
                    <ButtonText>Select All</ButtonText>
                </Button>
            </ButtonsWrapper>
            <ListWrapper>
                { data.map((country: TCountryData) => (
                    <CountryItem key={country.name} name={country.name} selected={selectedCountries.includes(country.name)} />
                ))}
            </ListWrapper>
        </SelectorWrapper>
    )
}

const CountryItemWrapper = styled(FlexRowCenterDiv)`
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
    text-transform: uppercase;
`

const CheckWrapper = styled.div`
    background: white;
    border: 1px solid whitesmoke;
`

type TCountryItemProps = {
    name: string
    selected: boolean
}

const CountryItem: React.FunctionComponent<TCountryItemProps> = (props): JSX.Element => {
    const { name }: TCountryItemProps = props

    return (
        <CountryItemWrapper>
            <CountryName> {name} </CountryName>
            <CheckWrapper>
                <FontAwesomeIcon icon="check" color={'royalblue'} />
            </CheckWrapper>
        </CountryItemWrapper>
    )
}

export default connector(SidePanel)