import React from 'react'
import styled from 'styled-components'
import Announcement from '../src/components/shared/Announcement'
import Footer from '../src/components/shared/Footer'
import Navbar from '../src/components/shared/Navbar'
import Breadcrumbs from '../src/components/shared/Breadcrumbs'
import { mobile } from '../styles/responsive'
import { useGetOrderByUserQuery } from './../src/generated/graphql'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;

    ${mobile({ padding: '10px' })}
`

const OrderContainer = styled.div`
    display: flex;
    border: 1px solid lightgray;
`
const Left = styled.div`
    flex: 3;
    border: 1px solid lightgray;
`
const ProductItemContainer = styled.div`
    flex: 1;
    display: flex;
`
const ProductImage = styled.img`
    width: 100px;
`
const ProductInfo = styled.div`
    flex: 3;
`
const Title = styled.div``
const Description = styled.div``
const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Total = styled.div`
    display: flex;
`

const Order = () => {
    const { data: orderData, loading: orderLoading } = useGetOrderByUserQuery()
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Breadcrumbs />
            <Wrapper>
                {orderData?.getOrderByUser.orders?.map((item) => (
                    <OrderContainer>
                        <Left>
                            {item.products.map((prodcutItem) => (
                                <ProductItemContainer>
                                    <ProductImage src={prodcutItem.img} />
                                    <ProductInfo>
                                        <Title>{prodcutItem.title}</Title>
                                        <Description>{prodcutItem.desc}</Description>
                                    </ProductInfo>
                                    <hr />
                                </ProductItemContainer>
                            ))}
                        </Left>
                        <Right>
                            <Total>$ {item.total}</Total>
                        </Right>
                    </OrderContainer>
                ))}
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Order
