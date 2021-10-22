import type { NextPage } from 'next'
import Categories from '../src/components/category/Categories'
import ProductListing4Home from '../src/components/product/ProductListing4Home'
import Announcement from '../src/components/shared/Announcement'
import Footer from '../src/components/shared/Footer'
import Layout from '../src/components/shared/Layout'
import PublicLayout from '../src/components/shared/PublicLayout'
import Slider from '../src/components/Slider/Slider'
import NewsLetter from '../src/newsLetter/NewsLetter'
import Navbar from './../src/components/shared/Navbar'

const Home = () => {
    const limit = 5

    return (
        <PublicLayout>
            <Slider />
            <Categories />
            <ProductListing4Home limit={limit} isHome={true} />
            <NewsLetter />
        </PublicLayout>
    )
}

export default Home
