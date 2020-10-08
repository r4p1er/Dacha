import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { showAlert } from "../../../../redux/actions/AlertMessages";
import { createNews } from "../../../../redux/actions/news";
import { AlertMessage } from "../../../Alerts/Alert";

class CreateNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      date: "",
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const title = this.state.title;
    const body = this.state.body;
    let tzoffset = new Date().getTimezoneOffset() * 60000;
    this.state.date = new Date(Date.now() - tzoffset).toISOString();

    if (title === "" || body === "") {
      return this.props.showAlert("Заполните форму");
    }
    this.props.createNews(this.state);
    this.props.handleCloseNewsCreate();
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
  createNews,
};

const mapStateToProps = (state) => ({
  alert: state.app.alert,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNews);
