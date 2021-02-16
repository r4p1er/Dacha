import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { AuthPropType } from '../../components/App/App.component'
import Documents from '../../components/Documents/Documents.component'

const DocumentsContainer: React.FC<AuthPropType> = React.memo((props) => {
  return (
    <Row>
      <Col>
        <div className="component-wrapper">
          <h3 className="heading">Документы</h3>
          {props.isAuth ? (
            <Documents />
          ) : (
            <h3 className="text-center">
              Выполните вход для просмотра документов
            </h3>
          )}
        </div>
      </Col>
    </Row>
  )
})

export default DocumentsContainer
