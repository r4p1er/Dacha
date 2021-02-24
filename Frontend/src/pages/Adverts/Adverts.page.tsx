import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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

const AdvertsContainer: React.FC<AuthPropType> = React.memo(
  ({ isAuth, children }) => {
    const [showAdsCreate, setshowAdsCreate] = useState(false)

    const handleCloseAdsCreate = () => setshowAdsCreate(false)
    const handleShowAdsCreate = () => setshowAdsCreate(true)

    return (
      <Row className="page-wrapper">
        <Col>
          <h3 className="heading">Объявления</h3>
          <ButtonGroup className="adverts-menu mt-3 mx-auto">
            <Link className="btn" to="/adverts/current_adverts">
              Мои объявления
            </Link>
            <Button onClick={handleShowAdsCreate}>Создать объявление</Button>
          </ButtonGroup>
          {!isAuth ? (
            <h3 className="text-center">
              Выполните вход для просмотра объявлений
            </h3>
          ) : (
            <>
              <Container>{children}</Container>
              <Modal
                size="xl"
                show={showAdsCreate}
                onHide={handleCloseAdsCreate}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Создание объявления</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CreateAdvert handleCloseAdsCreate={handleCloseAdsCreate} />
                </Modal.Body>
              </Modal>
            </>
          )}
        </Col>
      </Row>
    )
  }
)

export default AdvertsContainer
