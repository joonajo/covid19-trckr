import React from 'react'
import * as t from 'io-ts'

import { NextPage } from 'next'
import styled from 'styled-components'
import CountryCard from '../../components/CountryCard'
import { FlexColumnCenterDiv } from '../../components/CommonComponents'
import Loading from '../../components/Loading/Loading'
import SidePanel from '../../components/Filters/SidePanel'

const AppWrapper = styled(FlexColumnCenterDiv)`
    position: relative;
    justify-content: flex-start;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
`

const AppTitle = styled.h1`
    padding: 20px;
    width: 100%;
    text-align: right;
    color: royalblue;
    font-size: 5rem;
    font-weight: bold;
    cursor: default;
`

const ContentWrapper = styled(FlexColumnCenterDiv)<{ flex: string }>`
    flex-flow: ${props => `${props.flex}` };
`

const ErrorText = styled.h2`
    color: crimson;
`

export const DateData = t.type({
    date: t.string,
    confirmed: t.number,        
    deaths: t.number,
    recovered: t.number
})

export const CountryData = t.type({
    name: t.string,
    dates: t.array(DateData)
})

export const FormattedData = t.array(CountryData)

export type TDateData = t.TypeOf<typeof DateData>
export type TCountryData = t.TypeOf<typeof CountryData>
export type TFormattedData = t.TypeOf<typeof FormattedData>
export type TRawData = {
    [country: string]: TDateData[]
}

const reformatResponseData = (data: TRawData): TFormattedData => {
    const formattedData: TFormattedData = Object.keys(data).map((key: string) => {
        return {
            name: key,
            dates: data[key]
        }
    }) 
    return formattedData
}

const App: NextPage = (): JSX.Element => {
    const [data, setData] = React.useState<TFormattedData>()
    const [error, setError] = React.useState<boolean>(false)

    React.useEffect(() => {
        document.title = "COVID-19 Trckr"

        fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then((data: TRawData) => reformatResponseData(data))
            .then((formattedData: TFormattedData) => {
                const result = FormattedData.decode(formattedData)
                if (result._tag === 'Right') {
                    setData(formattedData)
                } else {
                    setError(true)
                }
            }).catch(e => console.log(e))
    }, [])

    return (
        <AppWrapper >
            <Loading show={!data} text spinner slideout fullscreen  />
            { !!data && 
                <ContentWrapper flex='column'>
                    <AppTitle>COVID-19 TRCKR</AppTitle>
                    <SidePanel />
                    <ContentWrapper flex='row wrap'>
                        { data.map((country: TCountryData) => (
                            <CountryCard key={country.name} {...country}  />
                        ))}
                        { !!error && <ErrorText>error</ErrorText> }
                    </ContentWrapper>
                </ContentWrapper>
            }
        </AppWrapper>
    )
}

export default App