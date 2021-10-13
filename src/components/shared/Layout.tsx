import React, { ReactNode } from 'react'
import Wrapper from '../customComponent/Wrapper'
import Navbar from './Navbar'

interface IProps {
    children: ReactNode
}

const Layout = ({ children }: IProps) => {
    return (
        <>
            <Navbar />
            <Wrapper>{children}</Wrapper>
        </>
    )
}

export default Layout
