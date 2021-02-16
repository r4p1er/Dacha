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
import CreateAdvert from '../../components/Adverts/Adverts-form/CreateAdvert-form.component'
import { AuthPropType } from '../../components/App/App.component'

const AdvertsContainer: React.FC<AuthPropType> = React.memo(({ isAuth }) => {
  const [showAdsCreate, setshowAdsCreate] = useState(false)

  const handleCloseAdsCreate = () => setshowAdsCreate(false)
  const handleShowAdsCreate = () => setshowAdsCreate(true)

  return (
    <Row>
      <Col>
        <div className="w-100 d-flex heading">
          <h3>Объявления</h3>
          <ButtonGroup className="ml-auto">
            <Link className="btn btn-primary" to="/adverts/current_adverts">
              Мои объявления
            </Link>
            <Button onClick={handleShowAdsCreate}>Создать объявление</Button>
          </ButtonGroup>
        </div>
        {!isAuth ? (
          <h3 className="text-center">
            Выполните вход для просмотра объявлений
          </h3>
        ) : (
          <div className="component-wrapper text-center">
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
