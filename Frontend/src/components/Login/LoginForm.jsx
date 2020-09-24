import React, { Component } from "react";
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { Form, Button, Alert} from "react-bootstrap";
import logo from "./../../additions/logo_dark.png";
import style from "./loginPage.module.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();
      this.props.login(this.state).then(
        (res) => this.context.router.push('/')
      );
    }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render(){
    const { login, password} = this.state;

    return (
      <wrapper className={style.wrapper}>
        <Form className={style.form} onSubmit={this.onSubmit}>

    {/* { errors.form && <Alert variant={"danger"}>{errors.form}</Alert> } */}

          <img src={logo} width="200" height="70" className="mb-4" />
          <h3 className="mb-3 font-weight-normal">Вход</h3>
          <Form.Control
            className={style.formControl}
            type="email"
            placeholder="Введите номер участка"
            field="login"
            value={login}
            // error={errors.login}
            onChange={this.onChange}
          />
          <Form.Control
            className={style.formControl}
            type="password"
            placeholder="Введите пароль"
            field="password"
            value={password}
            // error={errors.password}
            onChange={this.onChange}
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
  }
}

export default connect(null, { login })(LoginForm);