import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNews, fetchAllNews } from '../../redux/index'
import { Loader } from '../index'
import NewsCard from './News-card/News-item.component'
import { AppStateType } from '../../redux/store'
import { NewsType } from '../../common/types/types'

const NewsContainer: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllNews())
  }, [dispatch])
  const news = useSelector((state: AppStateType) => getNews(state))
  return (
    <>
      {news.length ? (
        news.length ? (
          [...news]
            .reverse()
            .map((someNews: NewsType) => (
              <NewsCard key={someNews.id} {...someNews} />
            ))
        ) : (
          <h3 className="text-center">Новости отсутствуют</h3>
        )
      ) : (
        <Loader />
      )}
    </>
  )
})

export default NewsContainer
