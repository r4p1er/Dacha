import React from 'react'
import CovidInfo from './CovidInfo'
import NewsHeadlines from './NewsHeadlines'

const SideBar = React.memo(() => {
  return (
    <div className="side-bar">
      <NewsHeadlines />
      <CovidInfo />
    </div>
  )
})

export default SideBar
