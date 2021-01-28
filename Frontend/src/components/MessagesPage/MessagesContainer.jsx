import React from "react";
import { Col, Row } from "react-bootstrap";
import Messages from "./Messages";

const MessagesContainer = (props) => {
  return (
    <Row>
      <Col className="messages-page-container">
        <h3 className="heading">Личные сообщения</h3>
        <div className="messages-container">
          <Messages />
        </div>
      </Col>
    </Row>
  );
};

export default MessagesContainer;