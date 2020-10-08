import React, { useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import UpdateAdvert from "./UpdateAdvert";

const AdCard = ({ title, body, contact, place, id, onDelete, expDate, profileId }) => {
  const [showAdvertUpdate, setshowAdvertUpadate] = useState(false);

  const handleCloseAdvertUpadate = () => setshowAdvertUpadate(false);
  const handleShowAdvertUpadate = () => setshowAdvertUpadate(true);

  const [showFullAd, setshowFullAd] = useState(false);

  const handleCloseFullAd = () => setshowFullAd(false);
  const handleShowFullAd = () => setshowFullAd(true);
  return (
    <Col col="true" xl={3} lg={4} md={6} sm={6} xs={12}>
      <Card>
        <Card.Header>
          <Row>
            <Col col="true" xl={8} lg={8} md={8} sm={8} xs={8}>
              <Card.Title>{title}</Card.Title>
            </Col>
            <Col col="true" xl={4} lg={4} md={4} sm={4} xs={4}>
              <span className="text-muted">Участок {place}</span>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Text>{body}</Card.Text>
        </Card.Body>
        {!onDelete ? null : (
          <Card.Footer>
            <Row>
              <Col>
                <Button onClick={() => {handleShowAdvertUpadate()}} block variant="outline-primary">
                  Изменить
                </Button>
              </Col>
              <Col>
                <Button onClick={() => {onDelete(id)}} block variant="outline-primary">
                  Удалить
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        )}

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
      <Modal show={showAdvertUpdate} onHide={handleCloseAdvertUpadate}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование новости</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateAdvert
            id={id}
            title={title}
            body={body}
            contact={contact}
            expDate={expDate}
            profileId={profileId}
            handleCloseAdvertUpadate={handleCloseAdvertUpadate}
          />
        </Modal.Body>
      </Modal>
    </Col>
  );
};
export default AdCard;
