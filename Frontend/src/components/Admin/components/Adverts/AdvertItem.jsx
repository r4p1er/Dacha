import React, { useState } from "react";
import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import deleteIcon from "../../../../additions/deleteIcon.png";

const AdvertItem = ({
  id,
  onDelete,
  index,
  place,
  title,
  body,
  contact,
  date,
}) => {
  const [showFullAd, setshowFullAd] = useState(false);
  const handleCloseFullAd = () => setshowFullAd(false);
  const handleShowFullAd = () => setshowFullAd(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  const advertDate = new Date(date);

  const formatedDate = advertDate.toLocaleDateString();
  const formatedDateHour = advertDate.getHours();
  const formatedDateMinutes = advertDate.getMinutes();

  return (
    <>
      <tr>
        <td onClick={handleShowFullAd}>{index + 1}</td>
        <td
          onClick={handleShowFullAd}
          className="table-ad-place cursor-pointer"
        >
          {place}
        </td>
        <td
          onClick={handleShowFullAd}
          className="table-ad-title cursor-pointer"
        >
          {title}
        </td>
        <td onClick={handleShowFullAd} className="table-ad-body cursor-pointer">
          {body}
        </td>
        <td
          onClick={handleShowFullAd}
          className="table-ad-contact cursor-pointer"
        >
          {contact}
        </td>
        <td
          onClick={handleShowFullAd}
          className="table-ad-contact cursor-pointer"
        >
          {formatedDate}, {formatedDateHour}:{formatedDateMinutes}
        </td>
        <td>
          <Image
            onClick={handleShow}
            src={deleteIcon}
            className="cursor-pointer"
          />
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
