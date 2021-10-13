import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Link, Button } from '@chakra-ui/react'
import Layout from './Layout'
import { mobile } from '../../../styles/responsive'
import NextLink from 'next/link'
import { Badge } from '@material-ui/core'
import { ShoppingCartOutlined } from '@material-ui/icons'
import {
    MeDocument,
    MeQuery,
    useGetCartByUserQuery,
    useLogoutMutation,
    useMeQuery,
} from '../../generated/graphql'
import { initializeApollo } from '../../lib/apolloClient'

const Container = styled.div`
    height: 60px;
    ${mobile({ height: '50px' })}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: '10px 0' })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: 'none' })}
`
const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;

    ${mobile({ display: 'none' })}
`

const Input = styled.input`
    border: none;
    ${mobile({ width: '50px' })}
`
const Logo = styled.h1`
    font-weight: bold;
    text-align: center;
    margin: 0;
    ${mobile({ fontSize: '12px' })}
`

const Center = styled.div`
    flex: 1;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flext: 2, justifyContent: 'center' })}
`

const MenuItem = styled.div`
    font-style: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`

const Navbar = () => {
    const { data: cartData, loading: loadingCart } = useGetCartByUserQuery()
    const { data: meData, loading: meLoading } = useMeQuery()
    const [logout, { loading: useLogoutMutationLoading }] = useLogoutMutation()

    const logoutUser = async () => {
        await logout({
            update(cache, { data }) {
                if (data?.logout) {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: { me: null },
                    })
                }
            },
        })

        const apolloClient = initializeApollo()
        apolloClient.resetStore()
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input />
                        <IconButton icon={<ChevronUpIcon />} aria-label='upvote'></IconButton>
                    </SearchContainer>
                </Left>
                <Center>
                    <NextLink href='/'>
                        <Logo>G-Commerce</Logo>
                    </NextLink>
                </Center>
                <Right>
                    {!meData?.me ? (
                        <>
                            <MenuItem>Register</MenuItem>
                            <MenuItem>
                                <NextLink href='/login'>
                                    <Link mr={2}>Login</Link>
                                </NextLink>
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem>
                                <Button onClick={logoutUser} isLoading={useLogoutMutationLoading}>
                                    Logout
                                </Button>
                            </MenuItem>
                        </>
                    )}

                    <MenuItem>
                        <Button isLoading={loadingCart}>
                            <NextLink href='/cart'>
                                <Badge
                                    badgeContent={cartData?.getCartByUser.carts?.length ?? 0}
                                    color='primary'
                                >
                                    <ShoppingCartOutlined />
                                </Badge>
                            </NextLink>
                        </Button>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
