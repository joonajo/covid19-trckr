import React from 'react'
import * as t from 'io-ts'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'

import { NextPage } from 'next'
import styled from 'styled-components'

const AppWrapper = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100vw;
    height: 100vh;
`

const Title = styled.h1`
    font-weight: normal;
`

const Text = styled.p`   
`

const Data = t.type({
    date: t.string,
    confirmed: t.number,        
    deaths: t.number,
    recovered: t.number
})

const ResponseData = t.type({
    Finland: t.array(Data),
    Sweden: t.array(Data),
    Italy: t.array(Data),
    Spain: t.array(Data),
})

const App: NextPage = (): JSX.Element => {
    const [countries, setCountries] = React.useState(null)

    React.useEffect(() => {
        document.title = "COVID-19 Trckr"

        fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then(data => {
                const result = ResponseData.decode(data)
                ThrowReporter.report(result)
                setCountries(data)
            }).catch(e => console.log(e))
    }, [])

    return (
        <AppWrapper >
            <Title>Hello!</Title>
            <Text>NextJS x React x TypeScript x Styled-components</Text>
        </AppWrapper>
    )
}

export default App