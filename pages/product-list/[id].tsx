import { Button } from '@chakra-ui/react'
import { Add, Remove } from '@material-ui/icons'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import Announcement from '../../src/components/shared/Announcement'
import Footer from '../../src/components/shared/Footer'
import LoadingView from '../../src/components/shared/LoadingView'
import Navbar from '../../src/components/shared/Navbar'
import { initializeApollo } from '../../src/lib/apolloClient'
import { mobile } from '../../styles/responsive'
import { useProductQuery, useCreateCartMutation } from '../../src/generated/graphql'
import Breadcrumbs from '../../src/components/shared/Breadcrumbs'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: '10px', flexDirection: 'column' })}
`
const ImgContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 100%;
    height: 80vh;
    object-fit: cover;
    ${mobile({ height: '40vh' })}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
    ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0;
`
const Price = styled.span`
    font-size: 40px;
    font-weight: 100;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;

    ${mobile({ width: '100%' })}
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FitlerTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

const FitlerColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0 5px;
    cursor: pointer;
`

const FitlerSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`

const FilterSizeOption = styled.option``

const AddContainer = styled.div`
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: '100%' })}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`
const AddToCard = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
`

const Product = () => {
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')

    const router = useRouter()
    const {
        data,
        loading: productLoading,
        error,
    } = useProductQuery({
        variables: {
            id: router.query.id as string,
        },
    })

    const [createCart, { error: createCartError, loading: createCartLoading }] =
        useCreateCartMutation()

    const handleQuantity = (type: string) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const handleClick = async () => {
        // addProduct({ ...product, quantity, color, size })
        const response = await createCart({
            variables: {
                createCartInput: {
                    productId: data?.product?._id as string,
                    quantity: quantity,
                },
            },
        })

        const apolloClient = initializeApollo()
        apolloClient.resetStore()
    }

    if (productLoading) {
        return <LoadingView />
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Breadcrumbs />
            <Wrapper>
                <ImgContainer>
                    <Image src={data?.product?.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{data?.product?.title}</Title>
                    <Desc>{data?.product?.desc}</Desc>
                    <Price>${data?.product?.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FitlerTitle>Color</FitlerTitle>
                            {data?.product?.color.map((item) => (
                                <FitlerColor color={item} />
                            ))}
                        </Filter>
                        <Filter>
                            <FitlerTitle>Size</FitlerTitle>
                            <FitlerSize>
                                {data?.product?.size.map((item) => (
                                    <FilterSizeOption>{item}</FilterSizeOption>
                                ))}
                            </FitlerSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity('dec')} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity('inc')} />
                        </AmountContainer>

                        <Button
                            className='add-to-cart'
                            variant='link'
                            isLoading={createCartLoading}
                            onClick={handleClick}
                        >
                            Add to Cart
                        </Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Product
