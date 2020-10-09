import React, { useState } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import CreateAdvert from "../Adverts/CreateAdvert";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Modal,
  NavDropdown,
  NavItem,
  Image,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../additions/logo_dark.png";

function Header(props) {
  const role = props.auth.user.role;
  const isAdmin = role === "admin" || role === "moder" ? true : false;

  const [showExit, setshowExit] = useState(false);
  const [showAdsCreate, setshowAdsCreate] = useState(false);

  const handleCloseExit = () => setshowExit(false);
  const handleShowExit = () => setshowExit(true);
  const handleCloseAdsCreate = () => setshowAdsCreate(false);
  const handleShowAdsCreate = () => setshowAdsCreate(true);

  function logout(e) {
    e.preventDefault();
    props.logout();
  }

  return (
    <>
      <Navbar inline="true" collapseOnSelect expand="xl">
        <Link className="mr-5 navbar-brand" to="/">
          <Image
            src={logo}
            width="200"
            height="70"
            className="d-inline-block align-top"
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto text-center">
            <NavItem>
              <Link to="/">Главная</Link>
            </NavItem>
            <NavItem>
              <NavLink to="/adverts">Объявления</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/documents">Документы</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/vote">Голосование</NavLink>
            </NavItem>
          </Nav>
          <NavDropdown
            className="text-right"
            alignRight
            title={`Участок № ${props.auth.user.name}`}
            id="nav-dropdown"
          >
            <Link className="dropdown-item" to="/adverts/current_adverts">
              Мои объявления
            </Link>
            <NavDropdown.Item onClick={handleShowAdsCreate}>
              Создать объявление
            </NavDropdown.Item>
            {isAdmin ? (
              <Link className="dropdown-item" to="/admin/news">
                Комната админа
              </Link>
            ) : null}
            <NavDropdown.Divider />
            <Form className="text-right dropdown-item">
              <Button variant="outline-danger" onClick={handleShowExit}>
                Выход
              </Button>
            </Form>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={showAdsCreate} onHide={handleCloseAdsCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Создание объявления</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateAdvert handleCloseAdsCreate={handleCloseAdsCreate} />
        </Modal.Body>
      </Modal>
      <Modal show={showExit} onHide={handleCloseExit}>
        <Modal.Header closeButton>
          <Modal.Title>Выход</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="text-right">
            <Form.Label className="text-muted mr-3">
              Вы собираетесь выйти?
            </Form.Label>
            <Button onClick={logout} variant="outline-danger">
              Да
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(Header);
