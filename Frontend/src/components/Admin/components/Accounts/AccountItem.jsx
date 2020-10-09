import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AccountItem = ({
  id,
  index,
  lastName,
  middleName,
  name,
  place,
  roleId,
  onDelete,
}) => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{lastName}</td>
        <td>{name}</td>
        <td>{middleName}</td>
        <td>{place}</td>
        <td>{roleId}</td>
        <td>
          <span onClick={handleShow}>Удалить</span>
        </td>
        <td>
          {/* <span onClick={() => {onDelete(id)}}>Изменить</span> */}
        </td>
      </tr>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Вы действительно хотите удалить</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Button onClick={() => {onDelete(id)}} variant="outline-danger">Удалить</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AccountItem;