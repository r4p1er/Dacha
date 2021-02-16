import React from 'react'
import { Outlet } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import AdminNav from '../../components/Admin/Navigation/Navigation.component'

const AdminContainer: React.FC = React.memo(() => {
  return (
    <Container fluid>
      <Row className="text-center">
        <Col className="text-center">
          <AdminNav />
          <Container fluid className="text-center">
            <Outlet />
          </Container>
        </Col>
      </Row>
    </Container>
  )
})

export default AdminContainer
