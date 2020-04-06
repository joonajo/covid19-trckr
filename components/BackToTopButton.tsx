import React, { useState, useEffect, FunctionComponent, useRef } from 'react'
import { FlexRowCenterDiv } from './CommonComponents'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SHOW_TRESHOLD: number = 500

const Wrapper = styled(FlexRowCenterDiv)<{ show: boolean }>`
    position: fixed;
    bottom: ${props => props.show ? '10px' : '-100px' };
    right: 10px;
    color: black;
    padding: 10px;
    background: white;
    box-shadow: 0 0 20px 5px gainsboro;
    border: 1px solid gainsboro;
    border-radius: 20px;
    cursor: pointer;
    transition: all .2s;

    svg {
        color: dimgray;
    }

    &:hover {
        border-color: royalblue;
        color: royalblue;
    
        & svg {
            color: royalblue;
        }
    }
` 

const Text = styled.p`
    font-size: .7rem;
    margin-left: 5px;
    text-transform: uppercase;
`

const BackToTopButton: React.FunctionComponent = React.memo((): JSX.Element => {
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, true)

        return () => window.removeEventListener('scroll', scrollHandler, true)
    }, [show])

    const scrollHandler = () => {
        const newShow: boolean = window.pageYOffset > SHOW_TRESHOLD

        if (show !== newShow) {
            setShow(newShow)
        }
    }

    const clickHandler = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    return (
        <Wrapper show={show} onClick={clickHandler}>
            <FontAwesomeIcon icon="arrow-up" />
            <Text>back to top</Text>
        </Wrapper>
    )
})

export default BackToTopButton