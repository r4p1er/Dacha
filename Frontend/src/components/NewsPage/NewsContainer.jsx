import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getNews } from '../../redux/selectors/newsSelectors'
import { fetchAllNews } from '../../redux/apiCalls/news'
import NewsCard from './NewsCard'
import Loader from '../Loader/Loader'

const NewsContainer = React.memo((props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllNews())
  }, [dispatch])
  const news = useSelector((state) => getNews(state))
  return (
    <Row>
      <Col className="news-container">
        <h3 className="heading">Новости</h3>
        {props.isAuth ? (
          news.length ? (
            news.length ? (
              [...news]
                .reverse()
                .map((someNews) => <NewsCard key={someNews.id} {...someNews} />)
            ) : (
              <h3 className="text-center">Новости отсутствуют</h3>
            )
          ) : (
            <Loader />
          )
        ) : (
          <div className="text-center">
            <h3>Выполните вход для просмотра новостей</h3>
          </div>
        )}
      </Col>
    </Row>
  )
})

export default NewsContainer
