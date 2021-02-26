import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminNav: React.FC = React.memo(() => {
  return (
    <div className="d-flex justify-content-center flex-wrap align-items-center">
      <NavLink className="btn btn-primary mr-1 mb-1" to="/admin/news">
        Новости
      </NavLink>
      <NavLink className="btn btn-primary mr-1 mb-1" to="/admin/adverts">
        Объявления
      </NavLink>
      <NavLink className="btn btn-primary mr-1 mb-1" to="/admin/documents">
        Документы
      </NavLink>
      <NavLink className="btn btn-primary mr-1 mb-1" to="/admin/vote">
        Голосование
      </NavLink>
      <NavLink className="btn btn-primary mr-1 mb-1" to="/admin/accounts">
        Аккаунты
      </NavLink>
    </div>
  )
})

export default AdminNav
