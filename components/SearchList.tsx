import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FlexColumnCenterDiv } from './CommonComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListCountryT } from '../types/types'

const SearchListWrapper = styled(FlexColumnCenterDiv)`
    justify-content: flex-start;
    position: absolute;
    font-size: .8rem;
    width: 100%;
    top: 100%;
    left: 0;
    z-index: 5;
    background: white;
    box-shadow: 0 0 20px gainsboro;
    max-height: 300px;
    overflow-y: auto;
    cursor: pointer;
`

const ListItem = styled.div`
    padding: 10px;
    text-transform: uppercase;
    width: 100%;
    transition: all var(--transition-time);

    &:hover {
        color: blue;
        background: gainsboro;
    }
`

const ListTop = styled(ListItem)`
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    align-items: center;
    color: blue;
    background: whitesmoke;

    svg {
        margin: 0 4px;
    }
`
const ListCountryItem = styled(ListItem)<{ highlight: boolean }>`
    color: ${props => props.highlight ? 'blue' : 'dimgray' };
    background: ${props => props.highlight ? 'gainsboro' : 'white' };
`

type Props = {
    highlightedIndex: number
    filteredCountries: ListCountryT[] 
    setShowList: (val: boolean) => void
    mouseInHandler: (val: number) => void
    clickHandler: (val: string) => void
}

const SearchList: React.FC<Props> = ({
    highlightedIndex,
    filteredCountries,
    setShowList,
    mouseInHandler,
    clickHandler,
}): JSX.Element => {

    return (
        <SearchListWrapper>
            <ListTop onClick={() => setShowList(false)}>
                Close
                <FontAwesomeIcon icon={'times'} size="lg" />
            </ListTop>
            { filteredCountries.map((country, index) => (
                <ListCountryItem key={country.name} highlight={highlightedIndex === country.index} onMouseEnter={() => mouseInHandler(index)} onClick={() => clickHandler(country.name)}>{country.name}</ListCountryItem>
            ))}
        </SearchListWrapper>
    )
}

export default SearchList