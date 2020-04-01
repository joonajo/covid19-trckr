import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { NextPage } from 'next'
import styled from 'styled-components'
import CountryCard, { DataCard } from '../../components/CountryCard'
import { FlexColumnCenterDiv } from '../../components/CommonComponents'
import Loading from '../../components/Loading/Loading'
import SidePanel from '../../components/Filters/SidePanel'
import { TReduxState, TReduxDispatch } from '../../store/store'
import actionCreators from '../../store/actionCreators'
import { reformatResponseData, getTotals } from '../../utils/utils'
import { TFormattedData, TRawData, FormattedData, TCountryData, TTotals } from '../../types/types'

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

const mapStateToProps = (state: TReduxState) => ({
    fullData: state.data.fullData,
    filteredData: state.data.filteredData,
    totals: state.data.totals,
})

const mapDispatchToProps = (dispatch: TReduxDispatch) => ({
    setData: (data: TFormattedData) => dispatch(actionCreators.setData(data)),
    setTotalsAll: (totals: TTotals) => dispatch(actionCreators.setTotalsAll(totals))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type TReduxProps = ConnectedProps<typeof connector>

type TAppProps = TReduxProps & {}

const App: NextPage<TAppProps> = (props): JSX.Element => {
    const { filteredData, totals, setData, setTotalsAll }: TAppProps = props
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
                    setTotalsAll(getTotals(formattedData))
                } else {
                    setError(true)
                }
            }).catch(e => console.log(e))
    }, [setData])

    console.log(totals)

    return (
        <AppWrapper >
            <Loading show={!filteredData || !totals} text spinner slideout fullscreen  />
            { !!filteredData && !!totals && 
                <ContentWrapper flex='column'>
                    <AppTitle>COVID-19 TRCKR</AppTitle>
                    <SidePanel />
                    <DataTotals {...totals} />
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

const TotalsTitle = styled.h3`
    color: black;
    font-weight: normal;
    text-transform: uppercase;
    font-family: 'Roboto Mono';
`

const TotalsWrapper = styled(ContentWrapper)`
    padding: 20px;
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

type TDataTotalsProps = TTotals & {

}

const DataTotals: React.FunctionComponent<TDataTotalsProps> = (props): JSX.Element => {
    const { confirmed, deaths }: TDataTotalsProps = props

    return (
        <TotalsWrapper flex='row'>
            <TotalsTitle>Globally</TotalsTitle>
            <DataCardWrapper>
                <DataCardTitle>cases</DataCardTitle>
                <DataCardText color='navy'>{confirmed}</DataCardText>
            </DataCardWrapper>
            <DataCardWrapper>
                <DataCardTitle>deaths</DataCardTitle>
                <DataCardText color='crimson'>{deaths}</DataCardText>
            </DataCardWrapper>
        </TotalsWrapper>
    )
}

export default connector(App)