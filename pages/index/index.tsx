import React, { useState, useEffect, FC, useRef } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { NextPage } from 'next'
import styled from 'styled-components'
import CountryCard, { DataCard } from '../../components/CountryCard'
import { FlexColumnCenterDiv, FlexRowCenterDiv } from '../../components/CommonComponents'
import Loading from '../../components/Loading/Loading'
import SidePanel from '../../components/Filters/SidePanel'
import { TReduxState, TReduxDispatch } from '../../store/store'
import actionCreators from '../../store/actionCreators'
import { reformatResponseData, getTotals, addShowProperty, formatNumber } from '../../utils/utils'
import { TFormattedData, TRawData, FormattedData, TTotals, TEditedFullData, ListCountryT } from '../../types/types'
import { fadein } from '../../keyframes/keyframes'
import Input from '../../components/Input'
import BackToTopButton from '../../components/BackToTopButton'
import SearchList from '../../components/SearchList'

/*
    top "padding/margin" when scrolling to an item
    0 = item is at the very top
*/

const SCROLL_TOP_PADDING: number = 300 

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

        window.scroll(0, 0)
    }, [])

    useEffect(() => {
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
    border-radius: var(--border-radius);
`

const DataCardWrapper = styled(FlexColumnCenterDiv)`
    padding: 10px;
    margin: 10px;
    border-radius: var(--border-radius);
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

const GlobalTotals: FC<TGlobalTotalsProps> = (props): JSX.Element => {
    const { confirmed, deaths }: TGlobalTotalsProps = props
    return (
        <TotalsWrapper flex='column'>
            <TotalsTitle>Globally</TotalsTitle>
            <ContentWrapper flex="row">
                <DataCardWrapper>
                    <DataCardTitle>cases</DataCardTitle>
                    <DataCardText color='navy'>{formatNumber(confirmed)}</DataCardText>
                </DataCardWrapper>
                <DataCardWrapper>
                    <DataCardTitle>deaths</DataCardTitle>
                    <DataCardText color='crimson'>{formatNumber(deaths)}</DataCardText>
                </DataCardWrapper>
            </ContentWrapper>
        </TotalsWrapper>
    )
}

const CountriesWrapper = styled(FlexColumnCenterDiv)`
    position: relative;

    &::before {
        content: "";
        height: 50px;
        position: relative;
    }
`

const SearchWrapper = styled(FlexRowCenterDiv)<{ fixed: boolean }>`
    min-width: 250px;
    position: ${props => props.fixed ? 'fixed' : 'absolute' };
    box-shadow: ${props => props.fixed ? '0 0 20px 0 gainsboro' : null };
    padding: ${props => props.fixed ? '20px' : '0'};
    background: snow;
    top: 0;
    justify-content: center;
    z-index: 10;
    transition: all var(--transition-time);
`

const InputWrapper = styled(FlexRowCenterDiv)`
    position: relative;
    top: 0;
`

type CountriesProps = {
    data: TEditedFullData
    countries: string[]
    highlightedCountry?: string
    setHighlight(country: string): void
}

const Countries: FC<CountriesProps> = (props): JSX.Element => {
    const {
        data,
        countries,
        highlightedCountry,
        setHighlight
    }: CountriesProps = props
    
    const [input, setInput] = useState<string>('')
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
    const [showList, setShowList] = useState<boolean>(false)
    const [filteredCountries, setFilteredCountries] = useState<ListCountryT[]>()

    const inputRef: React.RefObject<HTMLDivElement> = useRef(null)
    const [useFixedInput, setUseFixedInput] = useState<boolean>(false)
    const [initialInputPos, setInitialInputPos] = useState<number>()

    const scrollHandler = () => {
        if (inputRef.current && initialInputPos) {
            const newUseFixedInput: boolean = window.pageYOffset > initialInputPos
            if (newUseFixedInput !== useFixedInput) setUseFixedInput(newUseFixedInput)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, true)

        return () => window.removeEventListener('scroll', scrollHandler, true)
    }, [useFixedInput, initialInputPos, inputRef])

    useEffect(() => {
        if (!initialInputPos && inputRef.current) setInitialInputPos(inputRef.current?.getBoundingClientRect().top)
    }, [inputRef])

    useEffect(() => {
        if ((!!input.length)) {
            const newFilteredCountries: string[] = countries.filter(country => country.toLowerCase().includes(input.toLowerCase())) 
            setFilteredCountries(newFilteredCountries.map((country, index) => ({
                name: country, index: index
            })))
        } else {
            setFilteredCountries([])
        }
        setHighlightedIndex(-1)
    }, [input])

    useEffect(() => {
        if (!!filteredCountries?.length && !showList) {
            setShowList(true)
        }
    }, [filteredCountries])

    const clickHandler = (name: string) => {
        const elem = document.getElementById(name)
        if (elem) {
            const itemPos: number = window.pageYOffset + elem.getBoundingClientRect().top - SCROLL_TOP_PADDING
            window.scrollTo({
                top: itemPos,
                behavior: 'smooth'
            })
            setHighlight(name)
            setShowList(false)
        }
    }

    const mouseInHandler = (index: number) => {
        if (index !== highlightedIndex) setHighlightedIndex(index)
    }
    
    const keyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!!filteredCountries?.length) {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault()
                    let newHighlightedIndex: number = highlightedIndex < filteredCountries.length - 1 ? highlightedIndex + 1 : -1
                    setHighlightedIndex(newHighlightedIndex)
                    break;
                
                case 'ArrowUp':
                    e.preventDefault()
                    newHighlightedIndex = highlightedIndex > -1 ? highlightedIndex - 1 : filteredCountries.length - 1
                    setHighlightedIndex(newHighlightedIndex)
                    break;

                case 'Enter':
                    if (highlightedIndex !== -1) {
                        clickHandler(filteredCountries[highlightedIndex].name)
                    }
                    break;

                case 'Escape':
                    setShowList(false)
                    break;
    
            }
        }
    }

    return (
        <CountriesWrapper>
            <SearchWrapper onKeyDown={keyHandler} fixed={useFixedInput}>
                <InputWrapper ref={inputRef}>
                    <Input 
                        value={input}
                        name="country"
                        type="text"
                        placeholder="country"
                        click={() => setShowList(true)}
                        focus={() => setShowList(true)}
                        change={(e) => setInput(e.target.value)}
                        clear={() => setInput('')}
                    />
                </InputWrapper>
                { showList && !!filteredCountries?.length &&
                    <SearchList
                        highlightedIndex={highlightedIndex}
                        filteredCountries={filteredCountries}
                        setShowList={setShowList}
                        mouseInHandler={mouseInHandler}
                        clickHandler={clickHandler}
                    />
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