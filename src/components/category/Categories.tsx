import styled from 'styled-components'
import { mobile } from '../../../styles/responsive'
import { categories } from '../../dump/data'
import CategoryItem from './CategoryItem'
const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: '0', flexDirection: 'column' })}
`

const Categories = () => {
    return (
        <Container>
            {categories.map((item) => (
                <CategoryItem {...item} key={item.id} />
            ))}
        </Container>
    )
}

export default Categories
