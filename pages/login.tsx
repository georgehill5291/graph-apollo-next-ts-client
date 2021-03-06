import { Button, Flex, Link, Spinner, useToast } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import {
    FieldError,
    LoginInput,
    MeDocument,
    MeQuery,
    useLoginMutation,
} from '../src/generated/graphql'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import InputField from '../src/components/customComponent/InputField'
import { mapFieldErrors } from '../src/helper/mapFieldErrors'
import { useCheckAuth } from '../src/utils/useCheckAuth'
import NextLink from 'next/link'
import { initializeApollo } from '../src/lib/apolloClient'
import Wrapper from '../src/components/customComponent/Wrapper'

const initialValues: LoginInput = {
    usernameOrEmail: '',
    password: '',
}

const Login = () => {
    const [loginUser, { error, loading: _loginUserLoadData }] = useLoginMutation()

    const { data: authData, loading: authLoading } = useCheckAuth()

    var router = useRouter()

    const toast = useToast()

    const onLoginSubmit = async (values: LoginInput, { setErrors }: FormikHelpers<LoginInput>) => {
        const response = await loginUser({
            variables: {
                loginInput: values,
            },

            //update cache Apollo
            update(cache, { data }) {
                // const meData = cache.readQuery({ query: MeDocument });
                if (data?.login.success) {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: { me: data.login.user },
                    })
                }
            },
        })

        // console.log(response);
        console.log(response.data)
        if (response.data?.login.error) {
            setErrors(mapFieldErrors(response.data.login.error as FieldError[]))
        } else if (response.data?.login.user) {
            toast({
                title: `Welcome`,
                description: `Welcome ${response.data.login.user?.username}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            const apolloClient = initializeApollo()
            apolloClient.resetStore()

            router.push('/')
        }
    }

    return (
        <>
            {authLoading || (!authLoading && authData?.me) ? (
                <Flex justifyContent='center' alignItems='center' minH='100vh'>
                    <Spinner></Spinner>
                </Flex>
            ) : (
                <Wrapper size='small'>
                    {error && <p>Fail to login. Internal error</p>}

                    <Formik initialValues={initialValues} onSubmit={onLoginSubmit}>
                        {({ isSubmitting }) => (
                            <Form>
                                <InputField
                                    name='usernameOrEmail'
                                    placeholder='Username Or Email'
                                    label='Username Or Email'
                                    type='text'
                                />
                                <InputField
                                    name='password'
                                    placeholder='Password'
                                    label='Password'
                                    type='password'
                                />

                                <Flex mt={2}>
                                    <NextLink href='/forgot-password'>
                                        <Link ml='auto'>Forgot password</Link>
                                    </NextLink>
                                </Flex>
                                <Flex mt={2}>
                                    <NextLink href='/'>
                                        <Link ml='auto'>Back to Home</Link>
                                    </NextLink>
                                </Flex>

                                <Button
                                    type='submit'
                                    colorScheme='teal'
                                    mt={4}
                                    isLoading={isSubmitting}
                                >
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Wrapper>
            )}
        </>
    )
}

export default Login
