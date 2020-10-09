import React from "react";
import { ButtonGroup, Container } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";

const AdminContainer = () => {
  return (
    <Container fluid className="text-center">
      <h1>Администрирование сайта</h1>
      <ButtonGroup>
        <NavLink className="btn btn-primary" to="/admin/news">
          Новости
        </NavLink>
        <NavLink className="btn btn-primary" to="/admin/adverts">
          Объявления
        </NavLink>
        <NavLink className="btn btn-primary" to="/admin/documents">
          Документы
        </NavLink>
        <NavLink className="btn btn-primary" to="/admin/vote">
          Голосование
        </NavLink>
        <NavLink className="btn btn-primary" to="/admin/accounts">
          Аккаунты
        </NavLink>
      </ButtonGroup>
      <Container fluid className="text-center">
        <Outlet />
      </Container>
    </Container>
  );
};

export default AdminContainer;
