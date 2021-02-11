import React from 'react'
import { dateFormater, urlify } from '../../../utils'

type NewsCardPropType = {
  title: string
  body: string
  date: string
}

const NewsCard: React.FC<NewsCardPropType> = React.memo(
  ({ title, body, date }) => {
    return (
      <>
        <div className="news-card d-flex flex-column">
          <h5>{title}</h5>
          <p className="news-body">{urlify(body)}</p>
          <span className="news-date align-self-end">{dateFormater(date)}</span>
        </div>
        <hr color="#666666" />
      </>
    )
  }
)
export default NewsCard
