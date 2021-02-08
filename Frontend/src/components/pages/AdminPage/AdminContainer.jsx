import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

const AdminContainer = React.memo(() => {
  return (
    <Container fluid>
      <Row className="text-center">
        <Col col="true" className="text-center">
          <div className="d-flex flex-column align-items-center">
            <Row className="mb-2">
              <NavLink className="btn btn-primary mr-1" to="/admin/news">
                Новости
              </NavLink>
              <NavLink className="btn btn-primary mr-1" to="/admin/adverts">
                Объявления
              </NavLink>
              <NavLink className="btn btn-primary" to="/admin/documents">
                Документы
              </NavLink>
            </Row>
            <Row>
              <NavLink className="btn btn-primary mr-1" to="/admin/vote">
                Голосование
              </NavLink>
              <NavLink className="btn btn-primary" to="/admin/accounts">
                Аккаунты
              </NavLink>
            </Row>
          </div>
          <Container fluid className="text-center">
            <Outlet />
          </Container>
        </Col>
      </Row>
    </Container>
  )
})

export default AdminContainer
