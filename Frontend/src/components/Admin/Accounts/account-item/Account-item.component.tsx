import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import sprite from '../../../../common/images/sprite.svg'
import { ConfirmDeleteModal } from '../../../index'
import CreateAccount from '../account-form/CreateAccount-form.component'

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
            <svg
              className="cursor-pointer"
              width="25px"
              height="25px"
              onClick={() => {
                handleShowAccountUpadate()
              }}
            >
              <title>Редактировать</title>
              <use href={sprite + '#edit'} />
            </svg>
          </td>
          <td>
            <svg
              className="cursor-pointer"
              width="25px"
              height="25px"
              onClick={() => {
                handleShow()
              }}
            >
              <title>Удалить</title>
              <use href={sprite + '#delete'} />
            </svg>
          </td>
        </tr>
        <ConfirmDeleteModal
          show={showDeleteModal}
          onHide={handleClose}
          title="Удалить аккаунт"
          onDelete={onDelete}
          id={id}
        />
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
