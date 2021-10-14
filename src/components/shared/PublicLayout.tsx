import React from 'react'
import { ReactNode } from 'react'
import Navbar from './Navbar'
import Announcement from './Announcement'
import NewsLetter from '../../newsLetter/NewsLetter'
import Footer from './Footer'
import Head from 'next/head'

interface IProps {
    children: ReactNode
}

const PublicLayout = ({ children }: IProps) => {
    return (
        <>
            <Head>
                <title>G-ECommerce</title>
                <meta name='keywork' content='g-ecommerce'></meta>
            </Head>
            <Navbar />
            <Announcement />
            <>{children}</>
            <Footer />
        </>
    )
}

export default PublicLayout
