import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Modal,
  Row,
} from 'react-bootstrap'
import CreateAdvert from './CreateAdvert'
import { AuthPropType } from '../../../App'

const AdvertsContainer: React.FC<AuthPropType> = React.memo(({isAuth}) => {
  const [showAdsCreate, setshowAdsCreate] = useState(false)

  const handleCloseAdsCreate = () => setshowAdsCreate(false)
  const handleShowAdsCreate = () => setshowAdsCreate(true)

  return (
    <Row>
      <Col>
        <h3 className="heading">Объявления</h3>
        {!isAuth ? (
          <h3 className="text-center">
            Выполните вход для просмотра объявлений
          </h3>
        ) : (
          <div className="adverts-container">
            <ButtonGroup className="my-4">
              <Link className="btn btn-primary" to="/adverts/current_adverts">
                Мои объявления
              </Link>
              <Button onClick={handleShowAdsCreate}>Создать объявление</Button>
            </ButtonGroup>
            <Modal size="xl" show={showAdsCreate} onHide={handleCloseAdsCreate}>
              <Modal.Header closeButton>
                <Modal.Title>Создание объявления</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CreateAdvert handleCloseAdsCreate={handleCloseAdsCreate} />
              </Modal.Body>
            </Modal>
            <Container>
              <Outlet />
            </Container>
          </div>
        )}
      </Col>
    </Row>
  )
})

export default AdvertsContainer
