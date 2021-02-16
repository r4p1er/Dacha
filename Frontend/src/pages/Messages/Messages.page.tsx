import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { AuthPropType } from '../../components/App/App.component'
import Messages from '../../components/Messages/Messages.component'

const MessagesContainer: React.FC<AuthPropType> = ({ isAuth }) => {
  return (
    <Row>
      <Col className="messages-page-container">
        <h3 className="heading">Личные сообщения</h3>
        <div className="messages-container">
          <Messages />
        </div>
      </Col>
    </Row>
  )
}

export default MessagesContainer
