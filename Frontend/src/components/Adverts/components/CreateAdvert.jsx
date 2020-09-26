import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Form, Button, Container } from "react-bootstrap";
import { addAdvert } from "../../../redux/actions/ads";

class CreateAdvert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      contact: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    this.props.login(this.state).then((res) => history.push("/adverts"));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { title, body, contact } = this.state;

    return (
      <Container>
        <Form>
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
              placeholder="Максимум 2000 символов"
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
      </Container>
    );
  }
}

export default connect(null, { addAdvert })(CreateAdvert);
