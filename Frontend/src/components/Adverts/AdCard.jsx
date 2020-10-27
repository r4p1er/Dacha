import React, { useState } from "react";
import { Button, Card, Col, Image, Modal, Row } from "react-bootstrap";
import deleteIcon from "../../additions/deleteIcon.png";
import editIcon from "../../additions/editIcon.png";
import UpdateAdvert from "./UpdateAdvert";

const AdCard = ({
  title,
  body,
  contact,
  place,
  id,
  onDelete,
  expDate,
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

  const advertDate = new Date(expDate);
  advertDate.setMonth(advertDate.getMonth() - 1);

  const formatedDate = advertDate.toLocaleDateString();
  const formatedDateHour = advertDate.getHours();
  const formatedDateMinutes = advertDate.getMinutes();
  return (
    <Col col="true" xl={3} lg={4} md={6} sm={6} xs={12}>
      <Card>
        <Card.Header>
          <Row>
            <Col col="true" xl={8} lg={8} md={8} sm={8} xs={8}>
              <Card.Title>{title}</Card.Title>
            </Col>
            <Col col="true" xl={4} lg={4} md={4} sm={4} xs={4}>
              <span className="text-muted">Участок №{place}</span> <br />
              <span>
                {formatedDate}, {formatedDateHour}:{formatedDateMinutes}
              </span>
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
              <span>{formatedDate}, {formatedDateHour}:{formatedDateMinutes}</span>
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
};
export default AdCard;
