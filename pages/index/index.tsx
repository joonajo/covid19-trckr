import React from 'react'
import * as t from 'io-ts'
import { connect, ConnectedProps } from 'react-redux'

import { NextPage } from 'next'
import styled from 'styled-components'
import CountryCard from '../../components/CountryCard'
import { FlexColumnCenterDiv } from '../../components/CommonComponents'
import Loading from '../../components/Loading/Loading'
import SidePanel from '../../components/Filters/SidePanel'
import { TReduxState, TReduxDispatch } from '../../store/store'
import actionCreators from '../../store/actionCreators'

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
    width: 100%;
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

const mapStateToProps = (state: TReduxState) => ({
    fullData: state.data.fullData,
    filteredData: state.data.filteredData
})

const mapDispatchToProps = (dispatch: TReduxDispatch) => ({
    setData: (data: TFormattedData) => dispatch(actionCreators.setData(data))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type TReduxProps = ConnectedProps<typeof connector>

type TAppProps = TReduxProps & {}

const App: NextPage<TAppProps> = (props): JSX.Element => {
    const { filteredData, setData }: TAppProps = props
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
    }, [setData])

    return (
        <AppWrapper >
            <Loading show={!filteredData} text spinner slideout fullscreen  />
            { !!filteredData && 
                <ContentWrapper flex='column'>
                    <AppTitle>COVID-19 TRCKR</AppTitle>
                    <SidePanel />
                    <ContentWrapper flex='row wrap'>
                        { filteredData.map((country: TCountryData) => (
                            <CountryCard key={country.name} {...country}  />
                        ))}
                        { !!error && <ErrorText>error</ErrorText> }
                    </ContentWrapper>
                </ContentWrapper>
            }
        </AppWrapper>
    )
}

export default connector(App)