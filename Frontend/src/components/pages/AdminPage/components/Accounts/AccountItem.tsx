import React, { useState } from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import deleteIcon from '../../../../../additions/deleteIcon.png'
import editIcon from '../../../../../additions/editIcon.png'
import CreateAccount from './CreateAccounts'

type AccountItemPropType = {
  onDelete: (id: number) => void
  index: number
  id: number
  lastName: string
  login: string
  middleName: string
  name: string
  place: number
  role: {
    id: number
    name: string
  }
}

const AccountItem: React.FC<AccountItemPropType> = React.memo(
  ({ index, onDelete, id, lastName, login, middleName, name, place, role }) => {
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
              alt="Редактировать"
            />
          </td>
          <td>
            <Image
              onClick={handleShow}
              src={deleteIcon}
              className="cursor-pointer"
              alt="Удалить"
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
            <CreateAccount
              handleCloseAccountUpadate={handleCloseAccountUpadate}
              id={id}
              login={login}
              name={name}
              lastName={lastName}
              middleName={middleName}
              place={place}
              roleId={role.id}
            />
          </Modal.Body>
        </Modal>
      </>
    )
  }
)

export default AccountItem
