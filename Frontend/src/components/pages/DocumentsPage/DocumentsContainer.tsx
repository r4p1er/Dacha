import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { AuthPropType } from '../../../App'
import Documents from './Documents'

const DocumentsContainer: React.FC<AuthPropType> = React.memo((props) => {
  return (
    <Row>
      <Col>
        <h3 className="heading">Документы</h3>
        {props.isAuth ? <Documents /> : <h3 className="text-center">Выполните вход для просмотра документов</h3>}
      </Col>
    </Row>
  )
})

export default DocumentsContainer
