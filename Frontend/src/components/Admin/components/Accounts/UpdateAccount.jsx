import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { showAlert } from "../../../../redux/actions/AlertMessages";
import { createAccount } from "../../../../redux/actions/accounts";
import { AlertMessage } from "../../../Alerts/Alert";

class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      login: this.props.login,
      password: "",
      lastName: this.props.lastName,
      name: this.props.name,
      middleName: this.props.middleName,
      place: this.props.place,
      roleId: this.props.roleId,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const id = this.state.id;
    const login = this.state.login;
    const password = this.state.password;
    const lastName = this.state.lastName;
    const name = this.state.name;
    const middleName = this.state.middleName;
    const place = this.state.place;
    const roleId = this.state.roleId;

    if (
      login === "" ||
      lastName === "" ||
      name === "" ||
      middleName === "" ||
      place === ""
    ) {
      return this.props.showAlert("Заполните форму");
    }

    if (password) {
      const submitData = {
        id: id,
        login: login,
        password: password,
        lastName: lastName,
        name: name,
        middleName: middleName,
        place: +place,
        roleId: +roleId,
      };
      this.props.createAccount(submitData);
      this.props.handleCloseAccountUpadate();
    } else {
      const submitData = {
        id: id,
        login: login,
        lastName: lastName,
        name: name,
        middleName: middleName,
        place: +place,
        roleId: +roleId,
      };
      this.props.createAccount(submitData);
      this.props.handleCloseAccountUpadate();
    }

    this.setState({
      id: "",
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
    const { login, password, lastName, name, middleName, place } = this.state;
    const role = this.props.auth.user.role;
    return (
      <>
        <Form onSubmit={this.onSubmit} className="create-acc-form text-center">
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
                  as="select"
                  onChange={this.onChange}
                  name="roleId"
                  defaultValue={this.state.roleId}
                >
                  <option value={1}>Пользователь</option>
                  {role === "admin" ? (
                    <>
                      <option value={2}>Модератор</option>
                      <option value={3}>Админ</option>
                    </>
                  ) : null}
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
            Изменить аккаунт
          </Button>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  alert: state.app.alert,
  auth: state.auth,
});

const mapDispatchToProps = {
  showAlert,
  createAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccount);
