import React, { useState } from "react";
import CreateAdvert from "../Adverts/CreateAdvert";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Modal,
  NavItem,
  Image,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../additions/logo_dark.png";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const placeNum = props.auth.user.name;
  const isAuthenticated = props.auth.isAuthenticated;
  const role = props.auth.user.role;
  const isAdmin = role === "admin" || role === "moder" ? true : false;

  const [expanded, setExpanded] = useState(false);

  const [showExit, setshowExit] = useState(false);
  const [showAdsCreate, setshowAdsCreate] = useState(false);

  const handleCloseExit = () => setshowExit(false);
  const handleShowExit = () => setshowExit(true);
  const handleCloseAdsCreate = () => setshowAdsCreate(false);
  const handleShowAdsCreate = () => setshowAdsCreate(true);

  function logoutSubmit(e) {
    handleCloseExit();
    e.preventDefault();
    dispatch(logout());
    history("/signin");
  }

  return (
    <>
      <Navbar
        inline="true"
        collapseOnSelect="true"
        expanded={expanded}
        expand="xl"
      >
        <Link
          onClick={() => setExpanded(false)}
          className="navbar-brand d-none d-xl-block"
          to="/"
        >
          <Image
            src={logo}
            width="180"
            height="60"
            className="d-inline-block align-top"
          />
        </Link>
        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : "expanded")}
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav" className="text-center">
          <div className="collapsed-navbar">
            <Nav className="text-center">
              <NavItem onClick={() => setExpanded(false)}>
                <Link to="/">Главная</Link>
              </NavItem>
              <NavItem onClick={() => setExpanded(false)}>
                <NavLink to="/news">Новости</NavLink>
              </NavItem>
              <NavItem onClick={() => setExpanded(false)}>
                <NavLink to="/adverts">Объявления</NavLink>
              </NavItem>
              <NavItem onClick={() => setExpanded(false)}>
                <NavLink to="/documents">Документы</NavLink>
              </NavItem>
              <NavItem onClick={() => setExpanded(false)}>
                <NavLink to="/vote">Голосование</NavLink>
              </NavItem>
            </Nav>
            <Nav className="d-xl-none">
              <NavItem onClick={() => setExpanded(false)}>
                <NavLink to="/adverts/current_adverts">Общий чат</NavLink>
              </NavItem>
              <NavItem onClick={() => setExpanded(false)}>
                <NavLink to="/adverts/current_adverts">
                  Личные сообщения
                </NavLink>
              </NavItem>
              <NavItem onClick={() => setExpanded(false)}>
                <NavLink to="/adverts/current_adverts">Мои объявления</NavLink>
              </NavItem>
              <NavItem
                as="a"
                className="cursor-pointer"
                onClick={handleShowAdsCreate}
              >
                Создать объявление
              </NavItem>
              {isAdmin ? (
                <NavItem onClick={() => setExpanded(false)}>
                  <NavLink to="/admin/news">Комната админа</NavLink>
                </NavItem>
              ) : null}
            </Nav>
          </div>
        </Navbar.Collapse>
        {isAuthenticated ? (
          <span>
            <div className="text-right">{`Участок № ${placeNum}`}</div>
            <Form className="text-right">
              <Button variant="warning" onClick={handleShowExit}>
                Выход
              </Button>
            </Form>
          </span>
        ) : (
          <span>
            <Form className="text-right">
              <Button variant="warning">
                <Link to="/signin">Вход на сайт</Link>
              </Button>
            </Form>
          </span>
        )}
      </Navbar>
      <Modal show={showExit} onHide={handleCloseExit}>
        <Modal.Header closeButton>
          <Modal.Title>Выход</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="text-right">
            <Form.Label className="text-muted mr-3">
              Вы собираетесь выйти?
            </Form.Label>
            <Button onClick={logoutSubmit} variant="outline-danger">
              Да
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showAdsCreate} onHide={handleCloseAdsCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Создание объявления</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateAdvert handleCloseAdsCreate={handleCloseAdsCreate} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
