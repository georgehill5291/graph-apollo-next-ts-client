import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../../../styles/responsive'
import { useProductsQuery } from '../../generated/graphql'
import NewsLetter from '../../newsLetter/NewsLetter'
import Announcement from '../shared/Announcement'
import Footer from '../shared/Footer'
import Navbar from '../shared/Navbar'
import ProductListing4Home from './ProductListing4Home'

const Container = styled.div``
const Title = styled.h1``
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({ display: 'flex', flexDirection: 'column' })}
`

const FilterText = styled.span`
    font-style: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: '0' })}
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: '10px 0' })}
`

const Option = styled.option``

const ProductListing = () => {
    const router = useRouter()

    const onChangeColor = (event: any) => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())

        router.push({
            search: `color=${event.target.value}&size=${params.size ?? ''}`, // query string
        })
    }

    const onChangeSize = (event: any) => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())

        router.push({
            search: `color=${params.color}&size=${event.target.value}`, // query string
        })
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>Dresses</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Product:</FilterText>
                    <Select onChange={onChangeColor}>
                        <Option value='' selected>
                            Color
                        </Option>
                        <Option value='white'>White</Option>
                        <Option value='black'>Black</Option>
                    </Select>
                    <Select onChange={onChangeSize}>
                        <Option selected value=''>
                            Size
                        </Option>
                        <Option>M</Option>
                        <Option>L</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Product:</FilterText>
                    <Select>
                        <Option disabled selected>
                            Size
                        </Option>
                        <Option>Title</Option>
                        <Option>Description</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <ProductListing4Home />
            <NewsLetter />
            <Footer />
        </Container>
    )
}

export default ProductListing
