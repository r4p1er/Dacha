import React from 'react'
import { Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const AdminNav: React.FC = React.memo(() => {
  return (
    <div className="d-flex flex-column align-items-center">
      <Row className="mb-2">
        <NavLink className="btn btn-primary mr-1" to="/admin/news">
          Новости
        </NavLink>
        <NavLink className="btn btn-primary mr-1" to="/admin/adverts">
          Объявления
        </NavLink>
        <NavLink className="btn btn-primary" to="/admin/documents">
          Документы
        </NavLink>
      </Row>
      <Row>
        <NavLink className="btn btn-primary mr-1" to="/admin/vote">
          Голосование
        </NavLink>
        <NavLink className="btn btn-primary" to="/admin/accounts">
          Аккаунты
        </NavLink>
      </Row>
    </div>
  )
})

export default AdminNav
