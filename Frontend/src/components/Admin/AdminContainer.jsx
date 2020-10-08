import React from "react";
import { ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const AdminContainer = () => {
  return (
    <Container fluid>
      <Row className="text-center">
        <Col col="true" xl={1} lg={1} md={2} sm={3} xs={12}>
          <ButtonGroup vertical size="lg">
            <Link className="btn btn-primary" to="/admin/news">
              Новости
            </Link>
            <Link className="btn btn-primary" to="/admin/adverts">
              Объявления
            </Link>
            <Link className="btn btn-primary" to="/admin/documents">
              Документы
            </Link>
            <Link className="btn btn-primary" to="/admin/vote">
              Голосование
            </Link>
            <Link className="btn btn-primary" to="/admin/profiles">
              Профили
            </Link>
          </ButtonGroup>
        </Col>

        <Col col="true" xl={11} lg={11} md={10} sm={9} xs={12}>
          <h1>Администрирование сайта</h1>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminContainer;
