import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { AuthPropType } from '../../components/App/App.component'
import Chat from '../../components/Chat/Chat.component'

const ChatContainer: React.FC<AuthPropType> = ({isAuth}) => {
  return (
    <Row className="page-wrapper">
      <Col className="chat-page-container">
        <h3 className="heading">Общий чат</h3>
        <div className="chat-container">
          <Chat />
        </div>
      </Col>
    </Row>
  )
}

export default ChatContainer
