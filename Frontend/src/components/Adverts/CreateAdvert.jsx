import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { showAlert } from "../../redux/actions/AlertMessages";
import { AlertMessage } from "../Alerts/Alert";
import Axios from "axios";

class CreateAdvert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      contact: "",
    };
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    
    const title = this.state.title;
    const body = this.state.body;
    const contact = this.state.contact;

    if (title === "" || body === "" || contact === "") {
      return this.props.showAlert("Заполните форму");
    }

    Axios.post("http://localhost:5000/api/adverts", this.state)
    console.log(this.state)
    this.setState({
      title:"",
      body:"",
      contact:""
    });
  };

  onChange = (event) => {
    event.persist()
    this.setState(prev => ({...prev, ...{
      [event.target.name]: event.target.value
    }}));
  };
  render() {

    const {title, body, contact} = this.state

    return (
        <Form onSubmit={this.onSubmit}>
          {this.props.alert && <AlertMessage text={this.props.alert} />}
          <Form.Group>
            <Form.Label className="mb-1">
              Введите заголовок объявления
            </Form.Label>
            <Form.Control
              placeholder="Максимум 50 символов"
              field="title"
              value={title}
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

const mapDispatchToProps = {
  showAlert,
};

const mapStateToProps = (state) => ({
  alert: state.app.alert,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdvert);
