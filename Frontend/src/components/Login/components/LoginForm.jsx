import React from "react";
import { Form, Button} from "react-bootstrap";
import logo from "../../../additions/logo_dark.png";
import style from "../loginPage.module.css";

const LoginForm = () => {
  return (
    <wrapper className={style.wrapper}>
      <Form className={style.form}>
        <img src={logo} width="200" height="70" className="mb-4" />
        <h3 className="mb-3 font-weight-normal">Вход</h3>
        <Form.Control
          className={style.formControl}
          type="email"
          placeholder="Введите номер участка"
        />
        <Form.Control
          className={style.formControl}
          type="password"
          placeholder="Введите пароль"
        />
        <Button
          variant="primary"
          size="lg"
          type="submit"
          block
        >
          Войти
        </Button>
      </Form>
    </wrapper>
  );
};

export default LoginForm;