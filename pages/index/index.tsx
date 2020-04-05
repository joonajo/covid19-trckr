import React, { useState, useEffect, FunctionComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { NextPage } from 'next'
import styled from 'styled-components'
import CountryCard from '../../components/CountryCard'
import { FlexColumnCenterDiv, FlexRowCenterDiv } from '../../components/CommonComponents'
import Loading from '../../components/Loading/Loading'
import SidePanel from '../../components/Filters/SidePanel'
import { TReduxState, TReduxDispatch } from '../../store/store'
import actionCreators from '../../store/actionCreators'
import { reformatResponseData, getTotals, addShowProperty } from '../../utils/utils'
import { TFormattedData, TRawData, FormattedData, TTotals, TEditedFullData } from '../../types/types'
import { fadein } from '../../keyframes/keyframes'
import Input from '../../components/Input'
import BackToTopButton from '../../components/BackToTopButton'

const AppWrapper = styled(FlexColumnCenterDiv)`
    position: relative;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
`

const AppTitle = styled.h1`
    padding: 0 20px 20px 0;
    width: 100%;
    text-align: right;
    color: royalblue;
    font-size: 5rem;
    font-weight: bold;
    cursor: default;
`

const ContentWrapper = styled(FlexColumnCenterDiv)<{ flex: string }>`
    width: 100%;
    flex-flow: ${props => `${props.flex}` };
`

const ErrorText = styled.p`
    font-size: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    color: crimson;
    animation: ${fadein} 2s;
`

const mapStateToProps = (state: TReduxState) => ({
    editedData: state.data.editedData,
    countries: state.data.countries,
    totals: state.data.totals,
    highlightedCountry: state.data.highlightedCountry
})

const mapDispatchToProps = (dispatch: TReduxDispatch) => ({
    setData: (raw: TRawData, edited: TEditedFullData) => dispatch(actionCreators.setData(raw, edited)),
    setTotalsAll: (totals: TTotals) => dispatch(actionCreators.setTotalsAll(totals)),
    highlightCountry: (country: string) => dispatch(actionCreators.highlightCountry(country)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type TReduxProps = ConnectedProps<typeof connector>

type TAppProps = TReduxProps & {}

const App: NextPage<TAppProps> = (props): JSX.Element => {
    const { 
        totals, 
        countries,
        setData, 
        setTotalsAll, 
        editedData,
        highlightedCountry,
        highlightCountry
    }: TAppProps = props

    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        document.title = "COVID-19 Trckr"

        fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then((data: TRawData) => {
                const formattedData: TFormattedData = reformatResponseData(data)
                const result = FormattedData.decode(formattedData)
                if (result._tag === 'Right') {
                    const editedData: TEditedFullData = addShowProperty(data)
                    setData(data, editedData)
                    setTotalsAll(getTotals(formattedData))
                } else {
                    setError(true)
                }
            }).catch(e => console.log(e))
    }, [setData])

    return (
        <AppWrapper >
            <Loading show={(!editedData || !totals) && !error} text spinner slideout fullscreen  />
            { error && <ErrorText>Error while fetching data</ErrorText> }
            { editedData && totals && countries && 
                <ContentWrapper flex='column'>
                    <AppTitle>COVID-19 TRCKR</AppTitle>
                    <SidePanel />
                    <GlobalTotals {...totals} />
                    <Countries 
                        data={editedData} 
                        countries={countries} 
                        highlightedCountry={highlightedCountry}
                        setHighlight={highlightCountry} 
                    />
                    <BackToTopButton />
                </ContentWrapper>
            }
        </AppWrapper>
    )
}

const TotalsTitle = styled.h3`
    color: dimgray;
    font-weight: normal;
    text-transform: uppercase;
    font-size: 2rem;
    font-family: 'Roboto Mono';
`

const TotalsWrapper = styled(ContentWrapper)`
    padding: 20px;
    margin-bottom: 30px;
    width: auto;
    cursor: default;
    background: white;
    box-shadow: 0 0 20px 0 gainsboro;
`

const DataCardWrapper = styled(FlexColumnCenterDiv)`
    padding: 10px;
    margin: 10px;
    background: whitesmoke;
`

const DataCardTitle = styled.p`
    text-transform: uppercase;
    font-size: 1rem;
    color: black;
    padding: 5px;
`

const DataCardText = styled.h2<{ color: string }>`
    color: ${props => `${props.color}`};
    font-weight: bold;
    font-family: 'Roboto';
`

type TGlobalTotalsProps = TTotals & {

}

const GlobalTotals: FunctionComponent<TGlobalTotalsProps> = (props): JSX.Element => {
    const { confirmed, deaths }: TGlobalTotalsProps = props
    return (
        <TotalsWrapper flex='column'>
            <TotalsTitle>Globally</TotalsTitle>
            <ContentWrapper flex="row">
                <DataCardWrapper>
                    <DataCardTitle>cases</DataCardTitle>
                    <DataCardText color='navy'>{confirmed}</DataCardText>
                </DataCardWrapper>
                <DataCardWrapper>
                    <DataCardTitle>deaths</DataCardTitle>
                    <DataCardText color='crimson'>{deaths}</DataCardText>
                </DataCardWrapper>
            </ContentWrapper>
        </TotalsWrapper>
    )
}

const CountriesWrapper = styled(FlexColumnCenterDiv)`
`

const SearchWrapper = styled(FlexRowCenterDiv)`
    width: 100%;
    max-width: 300px;
    position: relative;
    justify-content: flex-end;
`

const SearchList = styled(FlexColumnCenterDiv)`
    justify-content: flex-start;
    position: absolute;
    font-size: .8rem;
    width: 100%;
    top: 100%;
    left: 0;
    z-index: 5;
    background: white;
    box-shadow: 0 0 20px gainsboro;
`

const ListItem = styled.p`
    padding: 10px;
    color: dimgray;
    text-transform: uppercase;
    cursor: pointer;
    width: 100%;
    transition: all var(--transition-time);

    &:hover {
        color: blue;
        background: whitesmoke;
    }
`

type CountriesProps = {
    data: TEditedFullData
    countries: string[]
    highlightedCountry?: string
    setHighlight(country: string): void
}

const Countries: FunctionComponent<CountriesProps> = (props): JSX.Element => {
    const {
        data,
        countries,
        highlightedCountry,
        setHighlight
    }: CountriesProps = props
    
    const [input, setInput] = useState<string>('')
    const [showList, setShowList] = useState<boolean>(false)
    const [filteredCountries, setFilteredCountries] = useState<string[]>()

    useEffect(() => {
        if ((!!input.length)) {
            const newFilteredCountries: string[] = countries.filter(country => country.toLowerCase().includes(input.toLowerCase())) 
            setFilteredCountries(newFilteredCountries)
        } else {
            setFilteredCountries([])
        }
    }, [input])

    const clickHandler = (name: string) => {
        const elem = document.getElementById(name)
        if (elem) {
            const y: number = elem.getBoundingClientRect().top - 200
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            })
            setHighlight(name)
        }
    }
    
    return (
        <CountriesWrapper>
            <SearchWrapper>
                <Input 
                    value={input}
                    name="country"
                    type="text"
                    placeholder="country"
                    change={(e) => setInput(e.target.value)}
                    clear={() => setInput('')}
                />
                { !!filteredCountries &&
                    <SearchList>
                        { filteredCountries.map(country => (
                            <ListItem key={country} onClick={() => clickHandler(country)} >{country}</ListItem>
                        ))}
                    </SearchList>
                }
            </SearchWrapper>
            <ContentWrapper flex='row wrap'>
                { Object.keys(data).map((key: string) => {
                    return (
                        <CountryCard key={key} name={key} data={data[key]} highlighted={key === highlightedCountry} />
                    )
                })}
            </ContentWrapper>
        </CountriesWrapper>
    )
}

export default connector(App)