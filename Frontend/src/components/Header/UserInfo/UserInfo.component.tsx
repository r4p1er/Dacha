import React, { useState } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import defaultPhoto from '../../../common/images/default_avatar.svg'
import sprite from '../../../common/images/sprite.svg'
import { Link } from 'react-router-dom'
import { UserType } from '../../../common/types/types'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux'

type UserInfoPropType = {
  user: UserType
  isAuthenticated: boolean
}

const UserInfo: React.FC<UserInfoPropType> = ({ user, isAuthenticated }) => {
  const dispatch = useDispatch()

  const placeNum = user.placeNum
  const name = user.name
  const lastName = user.lastName

  const [showExit, setshowExit] = useState(false)
  const handleCloseExit = () => setshowExit(false)
  const handleShowExit = () => setshowExit(true)

  function logoutSubmit(event: React.MouseEvent) {
    event.preventDefault()
    handleCloseExit()
    dispatch(logout())
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="user-photo">
            {user ? (
              <Image
                className="ava"
                width="56px"
                height="56px"
                src={defaultPhoto}
                alt="avatar"
              />
            ) : (
              <Image
                width="56px"
                height="56px"
                src={defaultPhoto}
                alt="avatar"
              />
            )}
          </div>
          <div className="user-info">
            <span className="user-fullname">{`${lastName} ${name}`}</span>
            <span className="user-place">{`Участок № ${placeNum}`}</span>
          </div>
          <Form className="text-right">
            <svg
              className="ml-1 logout-btn"
              width="32px"
              height="32px"
              onClick={handleShowExit}
            >
              <title>Выйти</title>
              <use href={sprite + '#sign-out'} />
            </svg>
          </Form>
        </>
      ) : (
        <span>
          <Form className="text-right">
            <Button variant="warning">
              <Link to="/signin">Вход на сайт</Link>
            </Button>
          </Form>
        </span>
      )}
      <Modal show={showExit} onHide={handleCloseExit}>
        <Modal.Header closeButton>
          <Modal.Title>Выход</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="text-right">
            <Form.Label className="text-muted mr-3">
              Вы собираетесь выйти?
            </Form.Label>
            <Button onClick={logoutSubmit} variant="outline-danger">
              Да
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default UserInfo
