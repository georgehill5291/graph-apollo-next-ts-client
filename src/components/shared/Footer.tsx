import {
    Facebook,
    Instagram,
    MailOutlined,
    Payment,
    Phone,
    Room,
    Twitter,
} from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../../../styles/responsive'

interface IProp {
    color?: string
}

const Container = styled.div`
    flex: 1;
    display: flex;
    ${mobile({ flexDirection: 'column' })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1`
    margin: 20px 0;
`
const Description = styled.p``
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div<IProp>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #${(props) => props.color};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

// Center

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: 'none' })}
`
const Title = styled.h3`
    margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 20px;
`
// Right
const Right = styled.div`
    flex: 1;
    ${mobile({ backgroundColor: 'lightgray' })}
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;

    svg {
        margin-right: 10px;
    }
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>G-Commerce</Logo>
                <Description>Description</Description>
                <SocialContainer>
                    <SocialIcon color='3B5999'>
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color='E4405f'>
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color='55aCEE'>
                        <Twitter />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title></Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room /> Phan Van Tri
                </ContactItem>
                <ContactItem>
                    <Phone />
                    +84321
                </ContactItem>
                <ContactItem>
                    <MailOutlined /> hieuden0@gmail.com
                </ContactItem>
            </Right>
        </Container>
    )
}

export default Footer
