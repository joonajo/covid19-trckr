import * as React from 'react'
import styled from 'styled-components'
import { FlexColumnCenterDiv, FlexRowCenterDiv } from './CommonComponents'
import { fadein } from '../keyframes/keyframes'
import { TDateData } from '../types/types'

const Wrapper = styled(FlexColumnCenterDiv)<{ show: boolean }>`
    margin: 10px;
    overflow: hidden;
    justify-content: space-between;
    min-height: 100px;
    align-items: flex-start;
    background: white;
    box-shadow: 0 0 20px 0 gainsboro;
    cursor: default;
    font-family: 'Roboto Mono';
    animation: ${fadein} .5s;
    transform: translate3d(0, 0, 0);
    transition: opacity var(--transition-time);
    width: 200px;
    padding: 5px 10px;
    opacity: ${props => props.show ? '1' : '0' };
    display: ${props => props.show ? 'flex' : 'none' };
`

const Name = styled.h3`
    color: black;
    font-weight: normal;
    text-transform: uppercase;
`

const Data = styled(FlexRowCenterDiv)`
    width: 100%;
`

type Props = {
    name: string
    data: {
        dates: TDateData[]
        show: boolean
    }
}

const CountryCard: React.FunctionComponent<Props> = React.memo((props): JSX.Element => {   
    const { name, data }: Props = props

    const latestData: TDateData = data.dates[data.dates.length-1]

    return (
        <Wrapper show={data.show}>
            <Name>
                {name}
            </Name>
            <Data>
                <DataCard
                    title='cases'
                    text={latestData.confirmed}
                />
                <DataCard
                    title='deaths'
                    color='crimson'
                    text={latestData.deaths}
                />
            </Data>
        </Wrapper>
    )
})

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

const DataCardText = styled.p<{ color: string }>`
    font-size: .9rem;
    color: ${props => `${props.color}`};
    font-weight: bold;
    font-family: 'Roboto';
`

type TDataCardProps = {
    title: string
    text: string | number
    color?: string
}

export const DataCard: React.FunctionComponent<TDataCardProps> = (props): JSX.Element => {
    const { title, color = 'navy', text }: TDataCardProps = props
    return (
        <DataCardWrapper>
            <DataCardTitle>{title}</DataCardTitle>
            <DataCardText color={color}>{text}</DataCardText>
        </DataCardWrapper>
    )
} 

export default CountryCard