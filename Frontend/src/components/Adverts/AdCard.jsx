import React, { useState } from "react";
import { Button, Card, Col, Image, Modal, Row } from "react-bootstrap";
import deleteIcon from "../../additions/deleteIcon.png";
import editIcon from "../../additions/editIcon.png";
import UpdateAdvert from "./UpdateAdvert";
import dateFormater from "../../utils/dateFormater";

const AdCard = React.memo(({
  title,
  body,
  contact,
  place,
  id,
  onDelete,
  date,
  accountId,
}) => {
  const [showAdvertUpdate, setshowAdvertUpadate] = useState(false);
  const handleCloseAdvertUpadate = () => setshowAdvertUpadate(false);
  const handleShowAdvertUpadate = () => setshowAdvertUpadate(true);

  const [showFullAd, setshowFullAd] = useState(false);
  const handleCloseFullAd = () => setshowFullAd(false);
  const handleShowFullAd = () => setshowFullAd(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);
  return (
    <Col col="true" xl={3} lg={4} md={6} sm={6} xs={12}>
      <Card>
        <Card.Header>
          <Row>
            <Col col="true" xl={8} lg={8} md={8} sm={8} xs={8}>
              <Card.Title>{title}</Card.Title>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Text>{body}</Card.Text>
        </Card.Body>

        <div className="d-flex align-items-center p-2">
          <Button
            onClick={handleShowFullAd}
            className="mr-auto"
            block
            variant="outline-primary"
          >
            Смотреть объявление
          </Button>
          {!onDelete ? null : (
            <>
              <Image
                className="mx-2"
                height="24"
                src={editIcon}
                onClick={() => {
                  handleShowAdvertUpadate();
                }}
              />
              <Image height="24" src={deleteIcon} onClick={handleShow} />
            </>
          )}
        </div>
        <Card.Footer>
          <div>
            <span className="text-muted mr-4">Участок №{place}</span>
            <span>{dateFormater(date)}</span>
          </div>
        </Card.Footer>
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
            <Col col="true" className="advert_date">
              <span>Участок №</span>
              <span>{place}</span>
            </Col>
            <Col col="true">
              <span>Дата: </span>
              <span>{dateFormater(date)}</span>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
      <Modal show={showAdvertUpdate} onHide={handleCloseAdvertUpadate}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование объявления</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateAdvert
            id={id}
            title={title}
            body={body}
            contact={contact}
            accountId={accountId}
            handleCloseAdvertUpadate={handleCloseAdvertUpadate}
          />
        </Modal.Body>
      </Modal>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Вы действительно хотите удалить</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            onClick={() => {
              onDelete(id);
            }}
            variant="outline-danger"
          >
            Удалить
          </Button>
        </Modal.Body>
      </Modal>
    </Col>
  );
});
export default AdCard;
