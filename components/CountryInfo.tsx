import * as React from 'react'
import styled from 'styled-components'
import { TDateData, TCountryData } from '../pages/index/index'
import { FlexColumnCenterDiv, FlexRowCenterDiv, Title, Text } from './CommonComponents'

const Wrapper = styled(FlexColumnCenterDiv)`
    margin: 5px auto;
    justify-content: space-between;
    align-items: flex-start;
    width: 300px;
    height: 150px;
    padding: 5px 10px;
    background: white;
    box-shadow: 0 0 20px 0 gainsboro;
    cursor: default;
    font-family: 'Roboto Mono';
`

const Name = styled.h2`
    color: navy;
    text-transform: uppercase;
`

const Data = styled(FlexRowCenterDiv)`
    width: 100%;
    justify-content: space-between;
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
                    title='confirmed'
                    text={data.confirmed}
                />
                <DataCard
                    title='fatalities'
                    text={data.deaths}
                />
            </Data>
        </Wrapper>
    )
}

const DataCardWrapper = styled(FlexColumnCenterDiv)`
`

const DataCardTitle = styled.h3`
    text-transform: uppercase;
    font-size: .7rem;
    color: black;
    padding: 5px;
`

const DataCardText = styled.p`
    font-size: 1.3rem;
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