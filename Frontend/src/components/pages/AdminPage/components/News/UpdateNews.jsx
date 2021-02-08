import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { createNews, showAlert, hideAlert } from '../../../../../redux/index'
import { AlertMessage } from '../../../../index'

class UpdateNews extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      title: this.props.title,
      body: this.props.body,
      date: this.props.date,
    }
  }

  componentDidMount() {
    this.props.onHideAlert()
  }

  onSubmit = (event) => {
    event.preventDefault()

    const title = this.state.title
    const body = this.state.body

    if (title === '' || body === '') {
      return this.props.isValid('Заполните форму')
    }
    this.props.onCreateNews(this.state)
    this.props.handleCloseNewsUpadate()
    this.setState({
      id: '',
      title: '',
      body: '',
      date: '',
    })
  }

  onChange = (event) => {
    event.persist()
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }))
  }
  render() {
    const { title, body } = this.state
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
            style={{ resize: 'none' }}
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
          Изменить новость
        </Button>
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isValid: (message) => dispatch(showAlert(message)),
    onHideAlert: () => dispatch(hideAlert()),
    onCreateNews: (news) => dispatch(createNews(news)),
  }
}

const mapStateToProps = (state) => ({
  alert: state.alerts.alert,
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNews)
