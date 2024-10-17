import { Button, Form, Input } from "antd"
import { rules } from "../utils/rules";
import { useState } from "react";
import { useAppDispatch } from "../helpers/hooks/useAppDispatch";
import { authLogIn } from "../store/slices/authSlice";
import { useGetUsers } from "../store/services/usersApi";
import { useSelector } from "react-redux";
import { StateSchema } from "../store/config/stateChema";
import { getAuthState } from "../store/selectors/authSelectors";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginForm = () => {
  const {data: users} = useGetUsers(null)
  const {isLoading} = useSelector((state: StateSchema) => getAuthState(state))
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useAppDispatch()

  const logIn = (username: string, password: string) => {
    if (users) {
      dispatch(authLogIn({users, username, password}))
    }
  }

  return (
    <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Логин"
            name="username"
            rules={[rules.required('Пожалуйста введите логин!')]}
          >
            <Input onChange={event => setUsername(event.target.value)}/>
          </Form.Item>

          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[rules.required('Пожалуйста введите пароль!')]}
          >
            <Input.Password onChange={event => setPassword(event.target.value)}/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isLoading}
              onClick={() => logIn(username, password)}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
  )
}

export default LoginForm