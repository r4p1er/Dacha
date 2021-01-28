import React, { useState } from 'react'
import { Button, ButtonGroup, Modal } from 'react-bootstrap'
import CreateAdvert from '../AdvertsPage/CreateAdvert'
import { Link } from 'react-router-dom'

const UserMenuContainer = (props) => {

  const role = props.authInfo.user.role
  const isAdmin = role === 'admin' || role === 'moder' ? true : false

  const [showAdsCreate, setshowAdsCreate] = useState(false)

  const handleCloseAdsCreate = () => setshowAdsCreate(false)
  const handleShowAdsCreate = () => setshowAdsCreate(true)

  return (
    <>
      <div className="user-menu">
        <ButtonGroup vertical size="lg">
          <Button as={Link} to="/chat">
            Общий чат
          </Button>
          <Button as={Link} to="/messages">
            Личные сообщения
          </Button>
          <Button as={Link} to="/adverts/current_adverts">
            Мои объявления
          </Button>
          <Button onClick={handleShowAdsCreate}>Создать объявление</Button>
          {isAdmin 
            ? (
              <Button as={Link} to="/admin/news">
                Комната админа
              </Button>
            ) 
            : null}
        </ButtonGroup>
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
}

// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   }
// }

export default UserMenuContainer
