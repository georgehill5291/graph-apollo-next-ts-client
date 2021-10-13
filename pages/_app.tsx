import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useApollo } from '../src/lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps)

    return (
        <ApolloProvider client={apolloClient}>
            <ChakraProvider resetCSS theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </ApolloProvider>
    )
}
export default MyApp
