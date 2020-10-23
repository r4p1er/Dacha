import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { showAlert } from "../../redux/actions/AlertMessages";
import { createAdvert } from "../../redux/actions/adverts";
import { AlertMessage } from "../Alerts/Alert";

class CreateAdvert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      contact: "",
      expDate: "",
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const title = this.state.title;
    const body = this.state.body;
    const contact = this.state.contact;
    let tzoffset = new Date().getTimezoneOffset() * 60000;
    const date = new Date(Date.now() - tzoffset);
    date.setMonth(date.getMonth() + 1);
    let newState = Object.assign({}, this.state);
    newState.expDate = date.toISOString();
    this.setState(newState);

    if (title === "" || body === "" || contact === "") {
      return this.props.isValid("Заполните форму");
    }
    this.props.onAdd(newState);
    this.props.handleCloseAdsCreate();
    this.setState({
      title: "",
      body: "",
      contact: "",
      expDate: "",
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
    const { title, body, contact } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        {this.props.alert && <AlertMessage text={this.props.alert} />}
        <Form.Group>
          <Form.Label className="mb-1">Введите заголовок объявления</Form.Label>
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
          <Form.Label className="mb-1">Введите текст объявления</Form.Label>
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
        <Form.Group>
          <Form.Label className="mb-1">Контактная информация</Form.Label>
          <Form.Control
            placeholder="Максимум 50 символов"
            field="contact"
            value={contact}
            name="contact"
            maxLength="50"
            onChange={this.onChange}
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Создать объявление
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  alert: state.app.alert,
});

const mapDispatchToProps = (dispatch) => {
  return {
    isValid: (message) => dispatch(showAlert(message)),
    onAdd: (advert) => dispatch(createAdvert(advert)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdvert);
