import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
      <h5 className="section-title">Заголовки новостей</h5>
      <div className="news-headlines-block">
        {!news.length ? (
          <h5>Новости отсутствуют</h5>
        ) : (
          [...news]
            .slice(-3)
            .reverse()
            .map((someNews) => (
              <div key={someNews.id} className="news-card--aside">
                <span className="news-card-title--aside">{someNews.title}</span>
                <span className="news-card-date--aside">
                  {dateFormater(someNews.date)}
                </span>
              </div>
            ))
        )}
        <Link to="/news" className="all-news-btn">
          Открыть новости
        </Link>
      </div>
    </div>
  )
})

export default NewsHeadlines
