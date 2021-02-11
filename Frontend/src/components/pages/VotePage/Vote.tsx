import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { AuthPropType } from '../../../App'

const Vote: React.FC<AuthPropType> = (props) => {
  return (
    <Row>
      <Col>
        <h3 className="heading">Голосование</h3>
        {!props.isAuth ? (
          <h3 className="text-center">
            Выполните вход для доступа к голосованию
          </h3>
        ) : (
          <h2 className="text-center">Страница голосования в разработке</h2>
        )}
      </Col>
    </Row>
  )
}

export default Vote
