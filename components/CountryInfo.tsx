import * as React from 'react'
import styled from 'styled-components'
import { TDateData } from '../pages/index/index'
import { FlexColumnCenterDiv, FlexRowCenterDiv, Text } from './CommonComponents'

const Wrapper = styled(FlexColumnCenterDiv)`
    margin: 20px auto;
    align-items: flex-start;
    padding: 5px 20px;
    width: 80%;
    background: white;
    box-shadow: 0 0 20px 0 gainsboro;
    cursor: default;
`

const TitleWrapper = styled(FlexColumnCenterDiv)`
    width: 100%;
    align-items: flex-start;
`

const Country = styled.h2`
    text-align: left;
    padding: 5px;
    color: blue;
    font-weight: bold;
    text-transform: uppercase;    
`

const Date = styled.p`
    font-size: .8rem;
    color: black;
`

const InfoWrapper = styled(FlexRowCenterDiv)`
    justify-content: space-around;
    width: 100%;
`  

const InfoSection = styled(FlexColumnCenterDiv)`
    padding: 10px;
`

type TCountryInfoProps = {
    country: string
    data: TDateData[]
}

const CountryInfo: React.FunctionComponent<TCountryInfoProps> = (props): JSX.Element => {   
    const { country, data }: TCountryInfoProps = props

    const [lastDateData, setLastDateData] = React.useState<TDateData>(data[data.length - 1])

    return (
        <Wrapper>
            <TitleWrapper>
                <Date> updated on {lastDateData.date}</Date>
                <Country>{country}</Country>
            </TitleWrapper>
            <InfoWrapper>
                <InfoSection>
                    { lastDateData.confirmed }
                </InfoSection>      
                <InfoSection>
                    { lastDateData.deaths }
                </InfoSection>
            </InfoWrapper>
        </Wrapper>
    )
}

export default CountryInfo