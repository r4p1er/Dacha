import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AuthPropType } from '../../components/App/App.component'
import NewsContainer from '../../components/News/News.component'

const NewsPage: React.FC<AuthPropType> = React.memo(({ isAuth }) => {
  return (
    <Row className="page-wrapper">
      <Col className="news-container">
        <h3 className="heading">Новости</h3>
        {isAuth ? (
          <Container>
            <NewsContainer />
          </Container>
        ) : (
          <h3 className="text-center">Выполните вход для просмотра новостей</h3>
        )}
      </Col>
    </Row>
  )
})

export default NewsPage
