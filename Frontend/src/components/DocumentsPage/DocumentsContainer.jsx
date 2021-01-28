import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Documents from './Documents'

const DocumentsContainer = (props) => {
  
  return (
    <Row>
      <Col>
        <h3 className="heading">Документы</h3>
        {!props.isAuth 
          ? <h3 className="text-center">Выполните вход для просмотра документов</h3>
          : <Documents /> }
      </Col>
    </Row>
  )
}

export default DocumentsContainer
