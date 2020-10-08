import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
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
      roleId: "",
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

    if (login === "" || password === "" || lastName === "" || name === "" || middleName === "" || place === "" || roleId === "") {
      return this.props.showAlert("Заполните форму");
    }
    this.props.createAccount(this.state);
    this.setState({
      title: "",
      body: "",
      date: "",
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
    const { title, body } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        {this.props.alert && <AlertMessage text={this.props.alert} />}
        <Form.Group>
          <Form.Label className="mb-1">Введите заголовок новости</Form.Label>
          <Form.Control
            placeholder="Максимум 50 символов"
            field="title"
            value={title}
            maxLength="50"
            name="title"
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="mb-1">Введите текст новости</Form.Label>
          <Form.Control
            style={{ resize: "none" }}
            placeholder="Максимум 1500 символов"
            as="textarea"
            rows="8"
            field="body"
            value={body}
            maxLength="1500"
            name="body"
            onChange={this.onChange}
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Создать новость
        </Button>
      </Form>
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
