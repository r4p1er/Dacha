import React from 'react'
import { dateFormater, urlify } from '../../../utils'

const NewsCard = React.memo(({ title, body, date }) => {
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
})
export default NewsCard
