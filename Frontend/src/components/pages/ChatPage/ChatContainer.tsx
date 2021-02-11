import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { AuthPropType } from '../../../App'
import Chat from './Chat'

const ChatContainer: React.FC<AuthPropType> = ({isAuth}) => {
  return (
    <Row>
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
