import React from 'react'
import * as t from 'io-ts'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'

import { NextPage } from 'next'
import styled from 'styled-components'
import CountryInfo from '../../components/CountryInfo'
import { Title, FlexColumnCenterDiv } from '../../components/CommonComponents'

const AppWrapper = styled(FlexColumnCenterDiv)`
    position: relative;
    justify-content: flex-start;
    width: 100vw;
    height: 100vh;
`

const AppTitle = styled(Title)`
    padding: 20px;
    width: 100%;
    text-align: right;
    color: royalblue;
    letter-spacing: 5px;
    font-size: 5rem;
`

export const DateData = t.type({
    date: t.string,
    confirmed: t.number,        
    deaths: t.number,
    recovered: t.number
})

export const CountryData = t.type({
    country: t.string,
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
            country: key,
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
            <AppTitle>COVID-19 TRCKR</AppTitle>
            { !!data && data.map((countryData: TCountryData) => {

            })}
            { !!error && <p>error</p>}
        </AppWrapper>
    )
}

export default App