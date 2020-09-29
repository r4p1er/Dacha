import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { Form, Button, Container, Image } from "react-bootstrap";
import logo from "./../../additions/logo_dark.png";
// import style from "./loginPage.module.css";
import { AlertMessage } from "../Alerts/Alert";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const alert = useSelector((state) => state.app.alert);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [state, setState] = useState({
    login: "",
    password: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(state)).then((res) => {
      return history("/");
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Container fluid className="login_wrapper">
      <Form className="form" onSubmit={onSubmit}>
        <Image src={logo} width="200" height="70" className="mb-4" />
        <h3 className="mb-3 font-weight-normal">Вход</h3>
        {alert && <AlertMessage text={alert} />}
        <Form.Control
          placeholder="Введите номер участка"
          field="login"
          value={state.login}
          name="login"
          onChange={handleChange}
        />
        <Form.Control
          type="password"
          placeholder="Введите пароль"
          field="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <Button variant="primary" size="lg" type="submit" block>
          Войти
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
