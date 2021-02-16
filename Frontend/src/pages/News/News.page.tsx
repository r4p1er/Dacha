import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { AuthPropType } from '../../components/App/App.component'
import NewsContainer from '../../components/News/News.component'

const NewsPage: React.FC<AuthPropType> = React.memo(({ isAuth }) => {
  return (
    <Row>
      <Col className="news-container">
        <div className="component-wrapper">
          <h3 className="heading">Новости</h3>
          {isAuth ? (
            <NewsContainer />
          ) : (
            <h3 className="text-center">
              Выполните вход для просмотра новостей
            </h3>
          )}
        </div>
      </Col>
    </Row>
  )
})

export default NewsPage
