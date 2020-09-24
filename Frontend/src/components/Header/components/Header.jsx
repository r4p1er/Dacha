import React, { useState } from "react";
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';
import {
  Navbar,
  Nav,
  Form,
  Button,
  Modal,
  NavDropdown,
  NavItem,
  Container,
} from "react-bootstrap";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "../../../additions/logo_dark.png";

function Header(props) {
  const HeaderStyle = styled.div`
    .navbar {
      background-color: #ededee;
    }
    a,
    .navbar-link,
    .nav-link {
      font-size: 1.5em;
      color: #1b9ae0;
      text-decoration: none;
      margin-right: 15px;
      &:hover {
        color: #477fe0;
      }
    }
    .active{
      color: #477fe0;
    }
    .dropdown-item:active {
      background-color: #fff;
    }
  `;


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
      <HeaderStyle style={{ position: "sticky", top: "0", "z-index": "10" }}>
        <Navbar className="mb-3" inline collapseOnSelect expand="lg">
          <Navbar.Brand className="mr-5" href="/">
            <img
              src={logo}
              width="200"
              height="70"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto text-center">
              <NavItem componentClass="span">
                <NavLink exact to="/">Главная</NavLink>
              </NavItem>
              <NavItem componentClass="span">
                <NavLink to="/adverts">Объявления</NavLink>
              </NavItem>
              <NavItem componentClass="span">
                <NavLink to="/documents">Документы</NavLink>
              </NavItem>
              <NavItem componentClass="span">
                <NavLink to="/vote">Голосование</NavLink>
              </NavItem>
            </Nav>
            <NavDropdown
              className="text-right"
              alignRight
              title="Участок №242"
              id="nav-dropdown"
            >
              <NavDropdown.Item eventKeropdowy="4.1">Профиль</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Мои объявления</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3" onClick={handleShowAdsCreate}>
                Создать объявление
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="4.4">
                <Form className="text-right">
                  <Button variant="outline-danger" onClick={handleShowExit}>
                    Выход
                  </Button>
                </Form>
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      </HeaderStyle>
      <Modal show={showAdsCreate} onHide={handleCloseAdsCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Создание объявления</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className="mb-1">
                Введите заголовок объявления
              </Form.Label>
              <Form.Control placeholder="Максимум 50 символов" />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-1">Введите текст объявления</Form.Label>
              <Form.Control
                style={{ resize: "none" }}
                placeholder="Максимум 2000 символов"
                as="textarea"
                rows="8"
              />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Создать объявление
            </Button>
          </Form>
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
            <Button onClick={logout} variant="outline-danger">Да</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(Header);