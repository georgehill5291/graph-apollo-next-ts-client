import { IconButton } from '@chakra-ui/button'
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import styled from 'styled-components'
import { sliderItems } from '../../dump/data'

interface IProps {
    direction?: string
    bg?: string
    slideIndex?: number
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    /* background-color: coral; */
`

const Arrow = styled.div<IProps>`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${(props) => props.direction === 'left' && '10px'};
    right: ${(props) => props.direction === 'right' && '10px'};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`

const Wrapper = styled.div<IProps>`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${(props) => (props?.slideIndex ?? 0) * -100}vw);
`

const Slide = styled.div<IProps>`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    align-items: center;
    background-color: #${(props) => props.bg};
`

const ImageContainer = styled.div``
const Image = styled.img`
    object-fit: contain;
    width: 80%;
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`

const Title = styled.h1``

const Desc = styled.p`
    margin: 50px 0;
    font-style: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`

const Button = styled.button`
    padding: 10px;
    font-style: 20px;
    background-color: transparent;
`

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction: string) => {
        if (direction === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }

    return (
        <Container>
            <Arrow direction='left' onClick={() => handleClick('left')}>
                <IconButton icon={<ChevronLeftIcon />} aria-label='upvote'></IconButton>
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item) => (
                    <Slide bg={item.bg} key={item.id}>
                        <ImageContainer>
                            <Image src={item.img} />
                        </ImageContainer>

                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button>Button</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction='right' onClick={() => handleClick('right')}>
                <IconButton icon={<ChevronRightIcon />} aria-label='upvote'></IconButton>
            </Arrow>
        </Container>
    )
}

export default Slider
