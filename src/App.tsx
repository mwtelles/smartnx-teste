import './App.css'

import Characters from './components/characters'

import { Row, Col, Space } from 'antd'

function App() {

  

  return (
    <Row>
      <Col span={24}>
      <Characters />
      </Col> 
    </Row>
  )
}

export default App
