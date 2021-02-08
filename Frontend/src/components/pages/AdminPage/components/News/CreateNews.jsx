import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { showAlert, hideAlert, createNews } from '../../../../../redux/index'
import { AlertMessage } from '../../../../index'

class CreateNews extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      date: '',
    }
  }

  componentDidMount() {
    this.props.onHideAlert()
  }

  onSubmit = (event) => {
    event.preventDefault()

    const title = this.state.title
    const body = this.state.body
    let tzoffset = new Date().getTimezoneOffset() * 60000
    let newState = Object.assign({}, this.state)
    newState.date = new Date(Date.now() - tzoffset).toISOString()
    this.setState(newState)

    if (title === '' || body === '') {
      return this.props.isValid('Заполните форму')
    }
    this.props.onCreateNews(newState)
    this.props.handleCloseNewsCreate()
    this.setState({
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
            maxLength="600"
            name="body"
            onChange={this.onChange}
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Создать новость
        </Button>
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHideAlert: () => dispatch(hideAlert()),
    isValid: (message) => dispatch(showAlert(message)),
    onCreateNews: (news) => dispatch(createNews(news)),
  }
}

const mapStateToProps = (state) => ({
  alert: state.alerts.alert,
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateNews)
