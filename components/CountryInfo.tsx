import * as React from 'react'
import styled from 'styled-components'
import { TDateData, TCountryData } from '../pages/index/index'
import { FlexColumnCenterDiv, FlexRowCenterDiv } from './CommonComponents'
import { fadein } from '../keyframes/keyframes'

const Wrapper = styled(FlexColumnCenterDiv)`
    margin: 10px;
    padding: 5px 10px;
    justify-content: space-between;
    width: 200px;
    min-height: 100px;
    align-items: flex-start;
    background: white;
    box-shadow: 0 0 20px 0 gainsboro;
    cursor: default;
    font-family: 'Roboto Mono';
    animation: ${fadein} 1s;
`

const Name = styled.h3`
    color: black;
    font-weight: normal;
    text-transform: uppercase;
`

const Data = styled(FlexRowCenterDiv)`
    width: 100%;
`

type TCountryInfoProps = TCountryData & {

}

const CountryInfo: React.FunctionComponent<TCountryInfoProps> = (props): JSX.Element => {   
    const { name, dates }: TCountryInfoProps = props

    const [data, setData] = React.useState<TDateData>(
        dates[dates.length - 1]
    )

    return (
        <Wrapper>
            <Name>
                {name}
            </Name>
            <Data>
                <DataCard
                    title='cases'
                    text={data.confirmed}
                />
                <DataCard
                    title='deaths'
                    text={data.deaths}
                />
            </Data>
        </Wrapper>
    )
}

const DataCardWrapper = styled(FlexColumnCenterDiv)`
    padding: 5px;
    margin: 5px;
    background: whitesmoke;
`

const DataCardTitle = styled.p`
    text-transform: uppercase;
    font-size: .5rem;
    color: black;
    padding: 5px;
`

const DataCardText = styled.p`
    font-size: .8rem;
    color: crimson;
    font-weight: bold;
`

type TDataCardProps = {
    title: string
    text: string | number
}

const DataCard: React.FunctionComponent<TDataCardProps> = (props): JSX.Element => {
    return (
        <DataCardWrapper>
            <DataCardTitle>{props.title}</DataCardTitle>
            <DataCardText>{props.text}</DataCardText>
        </DataCardWrapper>
    )
} 

export default CountryInfo