import React from 'react'
import { dateFormater, urlify } from '../../../common/utils/utils'

type NewsCardPropType = {
  title: string
  body: string
  date: string
}

const NewsCard: React.FC<NewsCardPropType> = React.memo(
  ({ title, body, date }) => {
    return (
      <div className="news-card">
        <span className="news-card-title">{title}</span>
        <p className="news-card-body">{urlify(body)}</p>
        <span className="news-card-date">{dateFormater(date)}</span>
      </div>
    )
  }
)
export default NewsCard
