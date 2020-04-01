import * as React from 'react'

import styled from 'styled-components'
import { FlexColumnCenterDiv } from './CommonComponents'

const MenuButton = styled(FlexColumnCenterDiv)`
    position: relative;
    margin: 5px;
`

const MenuBar = styled.div<{ open: boolean, left: boolean }>`
    height: 2px;
    width: 20px;
    background: black;
    transition: all var(--transition-time);

    &::after, &::before {
        height: 2px;
        width: ${props => props.open ? '10px' : '20px' };
        background: black;
        transition: all var(--transition-time);
        content: "";
        position: absolute;
    }

    &::after {
        top: ${props => props.open ? '4px' : '5px' };
        right: ${props => !props.left ? '0' : null };
        transform: ${props => props.open ? props.left ? 'rotate(45deg)' : 'rotate(-45deg)' : null }
    }

    &::before {
        bottom: ${props => props.open ? '4px' : '5px' };
        right: ${props => !props.left ? '0' : null} ;
        transform: ${props => props.open ? props.left ? 'rotate(-45deg)' : 'rotate(45deg)' : null }
    }
`

type TMenuButton = {
    open: boolean
    toLeft?: boolean
}

const MenuButtonComponent: React.FunctionComponent<TMenuButton> = (props): JSX.Element => {
    const { open, toLeft = true }: TMenuButton = props
     
    return (
        <MenuButton>
            <MenuBar open={open} left={toLeft} />
        </MenuButton>
    )
}

export default MenuButtonComponent