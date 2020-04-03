import * as React from 'react'
import styled from 'styled-components'
import { FlexRowCenterDiv } from '../CommonComponents'
import MenuButtonComponent from '../MenuButton'

const Wrapper = styled(FlexRowCenterDiv)`
    cursor: pointer;
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
    background: snow;
    box-shadow: 0 0 20px 0 gainsboro;
`

const Text = styled.p`
    color: dimgray;
    text-transform: uppercase;
    font-size: .6rem;
`

type TToggleProps = {
    open: boolean
    toggle(): void
    toLeft?: boolean
}

const Toggle: React.FunctionComponent<TToggleProps> = (props): JSX.Element => {
    const { open, toggle, toLeft = true }: TToggleProps = props

    return (
        <Wrapper onClick={toggle}>
            <MenuButtonComponent open={open} toLeft={toLeft} />
            <Text>{!!open ? 'close filters' : 'open filters'}</Text>
        </Wrapper>
    )
}

export default Toggle