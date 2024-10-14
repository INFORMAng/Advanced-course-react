import { Layout, Menu, Row, Col } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import { useSelector } from 'react-redux'
import { StateSchema } from '../store/config/stateChema'
import { getAuth } from '../store/selectors/authSelectors'

const NavBar = () => {
  const isAuth = useSelector((state: StateSchema) => getAuth(state))
  const items: ItemType[] = isAuth 
    ? [{key: 1, label: 'Выйти'},]
    : [{key: 2, label: 'Войти'},]

  return (
    <Layout.Header>
      <Row justify="end">
        <Col>
          <Menu 
            items={items}
            theme='dark' 
            mode='horizontal' 
            selectable={false}
          />
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default NavBar