import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import styled from "styled-components";

const AdCard = ({title, body, contact}) => (

  <Col col xl={3} lg={4} md={6} sm={6} xs={12}>
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {body}
        </Card.Text>
      </Card.Body>
      <Button className="mx-2 my-2" variant="outline-primary">
        Смотреть объявление
      </Button>
    </Card>
  </Col>
);
export default AdCard;
