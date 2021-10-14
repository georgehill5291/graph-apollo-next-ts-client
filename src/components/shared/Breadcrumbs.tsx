import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const convertBreadcrumb = (text: string) => {
    return text
        .replace(/-/g, ' ')
        .replace(/oe/g, 'ö')
        .replace(/ae/g, 'ä')
        .replace(/ue/g, 'ü')
        .toUpperCase()
}

interface IBreacrumb {
    breadcrumb: string
    href: string
}

const BreadcrumbOl = styled.ol`
    display: flex;
    flex-wrap: wrap;
`

const BreadcrumbLi = styled.li`
    padding: 5px;
    list-style: none;

    &::marker {
        display: none;
    }
`

const Breadcrumbs = () => {
    const router = useRouter()
    const [breadcrumbs, setBreadcrumbs] = useState<IBreacrumb[]>()

    useEffect(() => {
        if (router) {
            const linkPath = router.asPath.split('/')
            linkPath.shift()

            const pathArray = linkPath.map((path, i) => {
                return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') }
            })

            setBreadcrumbs(pathArray)
        }
    }, [router])

    if (!breadcrumbs) {
        return null
    }
    return (
        <nav aria-label='breadcrumbs'>
            <BreadcrumbOl>
                <BreadcrumbLi>
                    <Link href='/'>
                        <a>Home {' >'}</a>
                    </Link>
                </BreadcrumbLi>
                {breadcrumbs.map((breadcrumb, i) => {
                    return (
                        <BreadcrumbLi key={breadcrumb.href}>
                            <Link href={breadcrumb.href}>
                                <a>
                                    {convertBreadcrumb(breadcrumb.breadcrumb)}
                                    {' >'}
                                </a>
                            </Link>
                        </BreadcrumbLi>
                    )
                })}
            </BreadcrumbOl>
        </nav>
    )
}

export default Breadcrumbs
