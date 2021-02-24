import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AdminNav from '../../components/Admin/Navigation/Navigation.component'

const AdminContainer: React.FC = React.memo(({children}) => {
  return (
    <Container fluid className="page-wrapper">
      <Row className="text-center">
        <Col className="text-center">
          <AdminNav />
          <Container fluid className="text-center">
            {children}
          </Container>
        </Col>
      </Row>
    </Container>
  )
})

export default AdminContainer
