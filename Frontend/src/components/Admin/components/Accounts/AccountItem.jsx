import React, { useState } from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import deleteIcon from '../../../../additions/deleteIcon.png'
import editIcon from '../../../../additions/editIcon.png'
import UpdateAccount from './UpdateAccount'

const AccountItem = ({
  id,
  login,
  index,
  lastName,
  middleName,
  name,
  place,
  role,
  onDelete,
}) => {
  const [showAccountUpdate, setshowAccountUpadate] = useState(false)
  const handleCloseAccountUpadate = () => setshowAccountUpadate(false)
  const handleShowAccountUpadate = () => setshowAccountUpadate(true)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const handleClose = () => setShowDeleteModal(false)
  const handleShow = () => setShowDeleteModal(true)

  const roleInRus =
    role.name === 'admin'
      ? 'Админ'
      : role.name === 'moder'
      ? 'Модератор'
      : 'Пользователь'

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{lastName}</td>
        <td>{name}</td>
        <td>{middleName}</td>
        <td>{place}</td>
        <td>{roleInRus}</td>
        <td>
          <Image
            onClick={handleShowAccountUpadate}
            src={editIcon}
            className="cursor-pointer"
          />
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
              onDelete(id)
            }}
            variant="outline-danger"
          >
            Удалить
          </Button>
        </Modal.Body>
      </Modal>
      <Modal
        size="xl"
        show={showAccountUpdate}
        onHide={handleCloseAccountUpadate}
      >
        <Modal.Header closeButton>
          <Modal.Title>Редактирование аккаунта</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateAccount
            id={id}
            login={login}
            lastName={lastName}
            name={name}
            middleName={middleName}
            place={place}
            role={role}
            handleCloseAccountUpadate={handleCloseAccountUpadate}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AccountItem
