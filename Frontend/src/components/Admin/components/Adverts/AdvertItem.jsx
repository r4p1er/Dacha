import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const AdvertItem = ({ id, onDelete, index, place, title, body, contact }) => {

  const [showFullAd, setshowFullAd] = useState(false);
  const handleCloseFullAd = () => setshowFullAd(false);
  const handleShowFullAd = () => setshowFullAd(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  return (
    <>
      <tr>
        <td onClick={handleShowFullAd}>{index + 1}</td>
        <td onClick={handleShowFullAd} className="table-ad-place">{place}</td>
        <td onClick={handleShowFullAd} className="table-ad-title">{title}</td>
        <td onClick={handleShowFullAd} className="table-ad-body">{body}</td>
        <td onClick={handleShowFullAd} className="table-ad-contact">{contact}</td>
        <td>
          <span onClick={handleShow}>Удалить</span>
        </td>
      </tr>
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
    </>
  );
};

export default AdvertItem;
