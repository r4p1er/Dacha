import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { getNews, fetchAllNews } from '../../redux/index'
import { dateFormater } from '../../common/utils/utils'
import { AppStateType } from '../../redux/store'

const NewsHeadlines = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllNews())
  }, [dispatch])
  const news = useSelector((state: AppStateType) => getNews(state))
  return (
    <div className="news-headlines-container">
      <h5>Заголовки новостей</h5>
      <div className="news-headlines-block">
        {!news.length ? (
          <h5>Новости отсутствуют</h5>
        ) : (
          [...news]
            .slice(-5)
            .reverse()
            .map((someNews) => (
              <div key={someNews.id}>
                <hr />
                <div className="news-card d-flex flex-column">
                  <h6 className="news-headlines">{someNews.title}</h6>
                  <span className="news-date">
                    {dateFormater(someNews.date)}
                  </span>
                </div>
              </div>
            ))
        )}
        {news.length > 5 ? (
          <Button variant="info" className="ml-auto">
            Открыть новости
          </Button>
        ) : null}
      </div>
    </div>
  )
})

export default NewsHeadlines