import React from "react";
import { Col, Row } from "react-bootstrap";
import Chat from "./Chat";

const ChatContainer = (props) => {
  return (
    <Row>
      <Col className="chat-page-container">
        <h3 className="heading">Общий чат</h3>
        <div className="chat-container">
          <Chat />
        </div>
      </Col>
    </Row>
  );
};

export default ChatContainer;
