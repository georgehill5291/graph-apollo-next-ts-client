import { useRouter } from 'next/router'
import styled from 'styled-components'
import { popularProducts } from '../../dump/data'
import { useProductsQuery } from '../../generated/graphql'
import Product from './Product'
import { Flex, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { NetworkStatus } from '@apollo/client'
import { Container as MCContainer } from '@material-ui/core'

const Container = styled.div<IProp>`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: ${(props) => (props.isHome ? 'space-between' : '')};
`

interface IProp {
    limit: number
    isHome?: boolean
}

const ProductListing4Home = (props: IProp) => {
    const router = useRouter()

    const {
        data: productData,
        loading: productDataLoading,
        networkStatus,
    } = useProductsQuery({
        variables: {
            color: (router.query.color as string) || '',
            size: (router.query.size as string) || '',
            limit: props.limit ?? 10,
        },
        //component nao render boi cai Posts query, se rerender khi networkStatus change
        // notifyOnNetworkStatusChange: true,
    })

    // useEffect(() => {}, [router])

    if (productDataLoading) {
        return (
            <Flex justifyContent='center' alignItems='center' minH='100vh'>
                <Spinner></Spinner>
            </Flex>
        )
    }

    return (
        <>
            {props.isHome ? (
                <Container {...props}>
                    {productData?.products?.docs.map((item, index) => (
                        <Product {...item} key={index} />
                    ))}
                </Container>
            ) : (
                <MCContainer>
                    <Container {...props}>
                        {productData?.products?.docs.map((item, index) => (
                            <Product {...item} key={index} />
                        ))}
                    </Container>
                </MCContainer>
            )}
        </>
    )
}

export default ProductListing4Home
