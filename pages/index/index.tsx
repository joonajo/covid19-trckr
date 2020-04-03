import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { NextPage } from 'next'
import styled from 'styled-components'
import CountryCard from '../../components/CountryCard'
import { FlexColumnCenterDiv } from '../../components/CommonComponents'
import Loading from '../../components/Loading/Loading'
import SidePanel from '../../components/Filters/SidePanel'
import { TReduxState, TReduxDispatch } from '../../store/store'
import actionCreators from '../../store/actionCreators'
import { reformatResponseData, getTotals, addShowProperty } from '../../utils/utils'
import { TFormattedData, TRawData, FormattedData, TCountryData, TTotals, TEditedFullData } from '../../types/types'
import { fadein } from '../../keyframes/keyframes'

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
    totals: state.data.totals,
})

const mapDispatchToProps = (dispatch: TReduxDispatch) => ({
    setData: (raw: TRawData, edited: TEditedFullData) => dispatch(actionCreators.setData(raw, edited)),
    setTotalsAll: (totals: TTotals) => dispatch(actionCreators.setTotalsAll(totals))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type TReduxProps = ConnectedProps<typeof connector>

type TAppProps = TReduxProps & {}

const App: NextPage<TAppProps> = (props): JSX.Element => {
    const { totals, setData, setTotalsAll, editedData }: TAppProps = props
    const [error, setError] = React.useState<boolean>(false)

    React.useEffect(() => {
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
            { editedData && totals && 
                <ContentWrapper flex='column'>
                    <AppTitle>COVID-19 TRCKR</AppTitle>
                    <SidePanel />
                    <DataTotals {...totals} />
                    <ContentWrapper flex='row wrap'>
                        { Object.keys(editedData).map((key: string) => {
                            const show: boolean = editedData[key].show
                            return show && (
                                <CountryCard key={key} name={key} dates={editedData[key].dates} />
                            )
                        })}
                    </ContentWrapper>
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
    margin: 30px;
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

type TDataTotalsProps = TTotals & {

}

const DataTotals: React.FunctionComponent<TDataTotalsProps> = (props): JSX.Element => {
    const { confirmed, deaths }: TDataTotalsProps = props

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

export default connector(App)