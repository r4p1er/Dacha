import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "react-bootstrap";
import logo from "../../../additions/logo_light.png";

const Styles = styled.div`
  a,
  .navbar-link,
  .nav-link {
    font-size: 1rem;
    color: #989898;
    text-decoration: none;
    margin: 0 30px;
    &:hover {
      color: #fff;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: #989898;
  }
`;

export default function PageFooter() {
  return (
    <Styles
      className="wrapper"
      style={{ flex: "0 0 auto", "margin-top": "30px" }}
      >
      <Nav
        className="justify-content-center align-items-center"
        style={{
          padding: "1em",
          width: "100%",
          "background-color": "#212122",
        }}
      >
        <img
          src={logo}
          width="100"
          height="40"
          className="d-inline-block align-top"
        />
        <NavItem componentClass="span">
          <Link to="/">Главная</Link>
        </NavItem>
        <NavItem componentClass="span">
          <Link to="/adverts">Объявления</Link>
        </NavItem>
        <NavItem componentClass="span">
          <Link to="/documents">Документы</Link>
        </NavItem>
        <NavItem componentClass="span">
          <Link to="/vote">Голосование</Link>
        </NavItem>
      </Nav>
    </Styles>
  );
}
