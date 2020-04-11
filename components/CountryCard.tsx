import * as React from 'react'
import styled from 'styled-components'
import { FlexColumnCenterDiv, FlexRowCenterDiv } from './CommonComponents'
import { fadein } from '../keyframes/keyframes'
import { TDateData } from '../types/types'
import { formatNumber } from '../utils/utils'

const Wrapper = styled(FlexColumnCenterDiv)<{ show: boolean, highlight: boolean }>`
    margin: 10px;
    overflow: hidden;
    border-radius: var(--border-radius);
    justify-content: space-between;
    min-height: 100px;
    align-items: flex-end;
    text-align: right;
    background: white;
    box-shadow: 0 0 20px 0 gainsboro;
    cursor: default;
    animation: ${fadein} .5s;
    transform: translate3d(0, 0, 0);
    transition: opacity var(--transition-time);
    width: 200px;
    padding: 5px 10px;
    opacity: ${props => props.show ? '1' : '0' };
    display: ${props => props.show ? 'flex' : 'none' };
    border: ${props => props.highlight ? '2px solid royalblue' : 'null' };
    box-shadow: ${props => props.highlight ? '0 0 20px 10px gainsboro' : 'null' };
`

const Name = styled.h3`
    color: black;
    /* transform: scaleY(.95); */
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
    highlighted: boolean
}

const CountryCard: React.FunctionComponent<Props> = React.memo((props): JSX.Element => {   
    const { 
        name, 
        data,
        highlighted 
    }: Props = props

    const latestData: TDateData = data.dates[data.dates.length-1]

    return (
        <Wrapper show={data.show} highlight={highlighted} id={name}>
            <Name>
                {name}
            </Name>
            <Data>
                <DataCard
                    title='cases'
                    number={latestData.confirmed}
                />
                <DataCard
                    title='deaths'
                    color='crimson'
                    number={latestData.deaths}
                />
            </Data>
        </Wrapper>
    )
})

const DataCardWrapper = styled(FlexColumnCenterDiv)`
    padding: 5px 10px;
    margin: 5px;
    background: whitesmoke;
    border-radius: var(--border-radius);
`

const DataCardTitle = styled.p`
    text-transform: uppercase;
    font-size: .5rem;
    color: black;
    padding-bottom: 5px;
`

const DataCardText = styled.p<{ color: string }>`
    font-size: .9rem;
    color: ${props => `${props.color}`};
    font-weight: bold;
    font-family: 'Roboto';
`

type TDataCardProps = {
    title: string
    number:  number
    color?: string
}

export const DataCard: React.FunctionComponent<TDataCardProps> = (props): JSX.Element => {
    const { title, color = 'navy', number }: TDataCardProps = props
    return (
        <DataCardWrapper>
            <DataCardTitle>{title}</DataCardTitle>
            <DataCardText color={color}>{formatNumber(number)}</DataCardText>
        </DataCardWrapper>
    )
} 

export default CountryCard