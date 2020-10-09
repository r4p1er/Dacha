import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AdvertItem = ({ id, onDelete, index, place, title, body, contact }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td className="table-ad-place">{place}</td>
        <td className="table-ad-title">{title}</td>
        <td className="table-ad-body">{body}</td>
        <td className="table-ad-contact">{contact}</td>
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
    </>
  );
};

export default AdvertItem;
