import React, { useState } from "react";
import { Button, Col, Image, Modal } from "react-bootstrap";
import fileExtentionRead from "../../../../utils/fileExtentionReader";
import deleteDocIcon from "../../../../additions/deleteDocument.png";

const DocumentItem = ({ id, onDelete, name, onDownload }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  return (
    <>
      <Col
        className="doc-item-container my-2"
        col="true"
        xl={3}
        lg={3}
        md={4}
        sm={6}
        xs={12}
      >
        <div className="doc-item d-flex flex-column align-items-center">
          <div className="doc-item-icons d-flex">
            <Image
              className="mr-1 cursor-pointer"
              width="32"
              src={fileExtentionRead(name)}
              onClick={() => {
                onDownload(id, name);
              }}
            />
            <Image
              className="cursor-pointer"
              height="16"
              src={deleteDocIcon}
              onClick={handleShow}
            />
          </div>
          <span
            className="cursor-pointer"
            onClick={() => {
              onDownload(id, name);
            }}
          >
            {name}
          </span>
        </div>
      </Col>
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

export default DocumentItem;
