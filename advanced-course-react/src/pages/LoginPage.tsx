import { Layout, Row } from "antd";
import LoginForm from "../components/LoginForm";



const LoginPage = () => {

  return (
    <Layout>
      <Row justify={"center"} align={"middle"} className="full_height">
        <LoginForm/>
      </Row>
    </Layout>
  )
}

export default LoginPage