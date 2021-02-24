import React from 'react'
import CovidInfo from './CovidInfo.component'
import NewsHeadlines from './NewsHeadlines.component'

const SideBar: React.FC = React.memo(() => {
  return (
    <div className="side-bar">
      <NewsHeadlines />
      <CovidInfo />
    </div>
  )
})

export default SideBar
