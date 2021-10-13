import type { NextPage } from 'next'
import Categories from '../src/components/category/Categories'
import ProductListing4Home from '../src/components/product/ProductListing4Home'
import Announcement from '../src/components/shared/Announcement'
import Footer from '../src/components/shared/Footer'
import Layout from '../src/components/shared/Layout'
import Slider from '../src/components/Slider/Slider'
import NewsLetter from '../src/newsLetter/NewsLetter'
import Navbar from './../src/components/shared/Navbar'

const Home = () => {
    return (
        <>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <ProductListing4Home />
            <NewsLetter />
            <Footer />
        </>
    )
}

export default Home
