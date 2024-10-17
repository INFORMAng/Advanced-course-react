import { Layout, Menu, Row, Col } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import { useSelector } from 'react-redux'
import { StateSchema } from '../store/config/stateChema'
import { getAuthState } from '../store/selectors/authSelectors'
import { useAppDispatch } from '../helpers/hooks/useAppDispatch'
import { authLogOut } from '../store/slices/authSlice'

const NavBar = () => {
  const {auth: isAuth, user} = useSelector((state: StateSchema) => getAuthState(state))
  const dispatch = useAppDispatch()

  const logOut = () => {
    dispatch(authLogOut())
  }

  const items: ItemType[] = isAuth 
    ? [{key: 1, label: 'Выйти', onClick: () => logOut()},]
    : [{key: 2, label: 'Войти'},]

  return (
    <Layout.Header>
      <Row justify="end" >
        {isAuth && <div style={{color: 'White'}}>{user.username}</div>}
        <Col style={{minWidth: '100px'}}>
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