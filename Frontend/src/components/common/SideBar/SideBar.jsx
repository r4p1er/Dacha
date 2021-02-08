import React from 'react'
import CovidInfo from './CovidInfo'
import NewsHeadlines from './NewsHeadlines'

export const SideBar = React.memo(() => {
  return (
    <div className="side-bar">
      <NewsHeadlines />
      <CovidInfo />
    </div>
  )
})
