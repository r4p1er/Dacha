import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { showAlert } from "../../../../redux/actions/AlertMessages";
import { createAccount } from "../../../../redux/actions/accounts";
import { AlertMessage } from "../../../Alerts/Alert";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      lastName: "",
      name: "",
      middleName: "",
      place: "",
      roleId: 1,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const login = this.state.login;
    const password = this.state.password;
    const lastName = this.state.lastName;
    const name = this.state.name;
    const middleName = this.state.middleName;
    const place = this.state.place;
    const roleId = this.state.roleId;

    const submitData = {
      login: login,
      password: password,
      lastName: lastName,
      name: name,
      middleName: middleName,
      place: +place,
      roleId: +roleId,
    }

    if (
      login === "" ||
      password === "" ||
      lastName === "" ||
      name === "" ||
      middleName === "" ||
      place === ""
    ) {
      return this.props.showAlert("Заполните форму");
    }
    this.props.createAccount(submitData);
    this.setState({
      login: "",
      password: "",
      lastName: "",
      name: "",
      middleName: "",
      place: "",
      roleId: 1,
    });
  };

  onChange = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };
  render() {
    const {
      login,
      password,
      lastName,
      name,
      middleName,
      place,
    } = this.state;

    return (
      <>
        <Form onSubmit={this.onSubmit} className="create-acc-form">
          {this.props.alert && <AlertMessage text={this.props.alert} />}
          <Form.Row>
            <Col>
              <Form.Group controlId="formGridLogin">
                <Form.Label>Логин</Form.Label>
                <Form.Control
                  value={login}
                  onChange={this.onChange}
                  name="login"
                  placeholder="Введите логин"
                />
              </Form.Group>

              <Form.Group controlId="RoleId">
                <Form.Label>Роль</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  name="roleId"
                  as="select"
                >
                  <option value={1}>Пользователь</option>
                  <option value={2}>Модератор</option>
                  <option value={3}>Админ</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGridPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  value={password}
                  onChange={this.onChange}
                  name="password"
                  type="password"
                  placeholder="Введите пароль"
                />
              </Form.Group>
              <Form.Group controlId="place">
                <Form.Label>Участок</Form.Label>
                <Form.Control
                  value={place}
                  onChange={this.onChange}
                  name="place"
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                value={lastName}
                onChange={this.onChange}
                name="lastName"
                placeholder="Введите фамилию"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="name">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                value={name}
                onChange={this.onChange}
                name="name"
                placeholder="Введите имя"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="middleName">
              <Form.Label>Отчество</Form.Label>
              <Form.Control
                value={middleName}
                onChange={this.onChange}
                name="middleName"
                placeholder="Введите отчество"
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Создать аккаунт
          </Button>
        </Form>
      </>
    );
  }
}

const mapDispatchToProps = {
  showAlert,
  createAccount,
};

const mapStateToProps = (state) => ({
  alert: state.app.alert,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
