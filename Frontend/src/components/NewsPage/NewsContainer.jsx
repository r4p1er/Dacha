import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllNews } from '../../redux/apiCalls/news'
import NewsCard from './NewsCard'
import Loader from "../Loader/Loader";

const NewsContainer = React.memo((props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllNews())
  }, [dispatch])
  const newsState = useSelector((state) => state.news)
  return (
    <Row>
      <Col className="news-container">
        <h3 className="heading">Новости</h3>
        {props.isAuth ? 
        newsState.news.length ? 
        !newsState.isLoading ?
        (
          [...newsState.news]
                .reverse()
                .map((someNews) => <NewsCard key={someNews.id} {...someNews} />)
        ) : <Loader /> : <h3 className="text-center">Новости отсутствуют</h3> : 
        (
          <div className="text-center">
            <h3>Выполните вход для просмотра новостей</h3>
          </div>
        )}
      </Col>
    </Row>
  )
})

export default NewsContainer
