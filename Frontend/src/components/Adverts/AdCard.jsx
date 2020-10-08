import React, { useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";

const AdCard = ({ title, body, contact, place }) => {
  const [showFullAd, setshowFullAd] = useState(false);

  const handleCloseFullAd = () => setshowFullAd(false);
  const handleShowFullAd = () => setshowFullAd(true);

  return (
    <Col col="true" xl={3} lg={4} md={6} sm={6} xs={12}>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{body}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Участок {place}</Card.Footer>
        <Button
          onClick={handleShowFullAd}
          className="mx-2 my-2"
          variant="outline-primary"
        >
          Смотреть объявление
        </Button>
      </Card>
      <Modal show={showFullAd} onHide={handleCloseFullAd} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{body}</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Row className="w-100">
            <Col col="true">
              <span className="mr-2">Контакты:</span>
              <span>{contact}</span>
            </Col>
            <Col col="true">
              <span>Участок №</span>
              <span>{place}</span>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};
export default AdCard;
