import { Add, Remove } from '@material-ui/icons'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import styled from 'styled-components'
import Announcement from '../src/components/shared/Announcement'
import Footer from '../src/components/shared/Footer'
import Navbar from '../src/components/shared/Navbar'
import {
    useGetCartByUserQuery,
    usePaymentMutation,
    useUpdateCartMutation,
} from '../src/generated/graphql'
import { initializeApollo } from '../src/lib/apolloClient'
import { mobile } from '../styles/responsive'
import { useToast, Button as CharkraButton } from '@chakra-ui/react'
import LoadingView from '../src/components/shared/LoadingView'
import Breadcrumbs from './../src/components/shared/Breadcrumbs'

interface IProp {
    buttonType?: string
}

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;

    ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const TopButton = styled.button<IProp>`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.buttonType === 'filled' && 'none'};
    background-color: ${(props) => (props.buttonType === 'filled' ? 'black' : 'transparent')};
    color: ${(props) => props.buttonType === 'filled' && 'white'};
`

const TopTexts = styled.div``
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
    ${mobile({ display: 'none' })}
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column' })}
`

const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column' })}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;

    ${mobile({ margin: '5px 18px' })}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;

    ${mobile({ marginBottom: '20px' })}
`

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div<IProp>`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.buttonType == 'total' && 500};
    font-size: ${(props) => props.buttonType == 'total' && 24}px;
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
`

const Cart = () => {
    const KEY =
        'pk_test_51JiMBVKSxZAvMgXE1cFgthgKUOLt3nDjFJvSqlJ5ygeO5mnA1vGds7sWPUe6GXOGjU9BAhFfFfWb9I7UGV0YLsLD00OQGyK6U1'

    const { data: cartData, loading: cartLoading } = useGetCartByUserQuery()
    const [loadingPayment, setLoadingPayment] = useState(false)

    const [postPayment, { error, loading: _postPaymentLoading }] = usePaymentMutation()

    const [updateCart, { error: updateCartError, loading: updateCartLoading }] =
        useUpdateCartMutation()

    const [stripeToken, setStripeToken] = useState<any>(null)

    const onToken = (token: any) => {
        setStripeToken(token)
    }

    const router = useRouter()
    const toast = useToast()

    useEffect(() => {
        const makeRequest = async () => {
            try {
                setLoadingPayment(true)
                await postPayment({
                    variables: {
                        stripeInput: {
                            tokenId: stripeToken.id,
                            amount: ((cartData?.getCartByUser.total ?? 0) * 100).toString(),
                        },
                    },
                })
                router.push('/product-list')
                toast({
                    title: `Successfully`,
                    description: `Your cart has paid successfully`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                const apolloClient = initializeApollo()
                apolloClient.resetStore()
            } catch {}
        }
        stripeToken && makeRequest()
    }, [stripeToken])

    const handleUpdateCartByItem = async (cardId: string, quantity: number, type: string) => {
        if (type === 'add') {
            quantity++
        } else {
            quantity--
        }

        await updateCart({
            variables: {
                updateCartInput: {
                    cartId: cardId,
                    quantity: quantity,
                },
            },
        })

        const apolloClient = initializeApollo()
        apolloClient.resetStore()
    }

    if (loadingPayment) {
        return <LoadingView />
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Breadcrumbs />
            <Wrapper>
                <Title>Your bag</Title>
                <Top>
                    <TopButton>CONINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shooing Bag(2)</TopText>
                        <TopText>Your wishlist</TopText>
                    </TopTexts>
                    <TopButton buttonType='filled'>CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cartData?.getCartByUser.carts?.map((item) => (
                            <>
                                <Product key={item._id}>
                                    <ProductDetail>
                                        <Image src={item.product.img} />
                                        <Details>
                                            <ProductName>
                                                <b>Product:</b> {item.product.title}
                                            </ProductName>
                                            <ProductId>
                                                <b>Id:</b> {item.product._id}
                                            </ProductId>
                                            <ProductColor color='gray'></ProductColor>
                                            <ProductSize>
                                                <b>Size:</b> 123
                                            </ProductSize>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <CharkraButton isLoading={updateCartLoading}>
                                                <Remove
                                                    onClick={handleUpdateCartByItem.bind(
                                                        this,
                                                        item._id,
                                                        item.quantity,
                                                        'remove'
                                                    )}
                                                />
                                            </CharkraButton>

                                            <ProductAmount>{item.quantity}</ProductAmount>
                                            <CharkraButton
                                                isLoading={updateCartLoading}
                                                onClick={handleUpdateCartByItem.bind(
                                                    this,
                                                    item._id,
                                                    item.quantity,
                                                    'add'
                                                )}
                                            >
                                                <Add />
                                            </CharkraButton>
                                        </ProductAmountContainer>
                                        <ProductPrice>
                                            ${item.quantity * item.product.price}
                                        </ProductPrice>
                                    </PriceDetail>
                                </Product>
                                <Hr />
                            </>
                        ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal:</SummaryItemText>
                            <SummaryItemPrice>$ {cartData?.getCartByUser.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>estimate shipping:</SummaryItemText>
                            <SummaryItemPrice>$ 5</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount:</SummaryItemText>
                            <SummaryItemPrice>$ -5 </SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem buttonType='total'>
                            <SummaryItemText>Total:</SummaryItemText>
                            <SummaryItemPrice>$ {cartData?.getCartByUser.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name='G Shop'
                            image='https://avatars.githubusercontent.com/u/1486366?v=4'
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cartData?.getCartByUser.total}`}
                            amount={(cartData?.getCartByUser.total ?? 0) * 100}
                            token={onToken}
                            stripeKey={KEY as string}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
