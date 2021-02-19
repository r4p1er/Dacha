import React from 'react'
import { Container, Row } from 'react-bootstrap'
import About from '../../components/Home/About/About.component'
import YMap from '../../components/Home/Map/YMap.component'
import Contacts from '../../components/Home/Contacts/Contacts.component'

const HomeContainer: React.FC = () => {
  return (
    <div className="page-wrapper">
      <Container fluid className="pt-0">
        <Row>
          <About />
          <Contacts />
        </Row>
        <Row className="mt-4">
          <YMap />
        </Row>
      </Container>
    </div>
  )
}

export default HomeContainer
