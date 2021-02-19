import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import CreateAdvert from '../Adverts/Adverts-form/CreateAdvert-form.component'
import { IsAdminPropType } from '../App/App.component'

const UserMenu: React.FC<IsAdminPropType> = React.memo(({ isAdmin }) => {
  const [showAdsCreate, setshowAdsCreate] = useState(false)

  const handleCloseAdsCreate = () => setshowAdsCreate(false)
  const handleShowAdsCreate = () => setshowAdsCreate(true)

  return (
    <>
      <div className="user-menu">
        <NavLink className="user-menu-control" to="/chat">
          Общий чат
        </NavLink>
        <NavLink className="user-menu-control" to="/messages">
          Личные сообщения
        </NavLink>
        <NavLink className="user-menu-control" to="/adverts/current_adverts">
          Мои объявления
        </NavLink>
        <button className="user-menu-control" onClick={handleShowAdsCreate}>
          Создать объявление
        </button>
        {isAdmin ? (
          <NavLink className="user-menu-control" to="/admin/news">
            Комната админа
          </NavLink>
        ) : null}
      </div>
      <Modal size="xl" show={showAdsCreate} onHide={handleCloseAdsCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Создание объявления</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateAdvert handleCloseAdsCreate={handleCloseAdsCreate} />
        </Modal.Body>
      </Modal>
    </>
  )
})

export default UserMenu
