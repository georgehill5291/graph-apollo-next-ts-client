import { useRouter } from 'next/router'
import styled from 'styled-components'
import { popularProducts } from '../../dump/data'
import { useProductsQuery } from '../../generated/graphql'
import Product from './Product'
import { Flex, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { NetworkStatus } from '@apollo/client'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const ProductListing4Home = () => {
    const router = useRouter()

    const {
        data: productData,
        loading: productDataLoading,
        networkStatus,
    } = useProductsQuery({
        variables: {
            color: (router.query.color as string) || '',
            size: (router.query.size as string) || '',
            limit: 10,
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
        <Container>
            {productData?.products?.docs.map((item, index) => (
                <Product {...item} key={index} />
            ))}
        </Container>
    )
}

export default ProductListing4Home
