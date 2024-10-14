import './App.css'
import AppRouter from './components/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from 'antd'
import NavBar from './components/NavBar'

function App() {
  const { Content } = Layout

  return (
    <div className='App'>
      <BrowserRouter>
        <Layout>
          <NavBar/>
          <Content>
            <AppRouter/>
          </Content>
        </Layout>      
      </BrowserRouter>
    </div>
  )
}

export default App
