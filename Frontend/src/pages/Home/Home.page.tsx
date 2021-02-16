import React from 'react'
import { Row } from 'react-bootstrap'
import About from '../../components/Home/About/About.component'
import YMap from '../../components/Home/Map/YMap.component'
import Contacts from '../../components/Home/Contacts/Contacts.component'

const HomeContainer: React.FC = () => {
  return (
    <div className="home-container">
      <Row>
        <About />
        <Contacts />
      </Row>
      <Row className="mt-4">
        <YMap />
      </Row>
    </div>
  )
}

export default HomeContainer
