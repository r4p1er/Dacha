import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/apiCalls/auth'
import { Form, Button } from 'react-bootstrap'
import { AlertMessage } from '../Alerts/Alert'
import { hideAlert } from '../../redux/alertMessages'

const LoginForm = (props) => {
  const alert = useSelector((state) => state.alerts.alert)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(hideAlert())
  },[dispatch])

  const [state, setState] = useState({
    login: '',
    password: '',
  })
  const onSubmit = (e) => {
    e.preventDefault()
    setState({
      login: '',
      password: ''
    })
    dispatch(login(state))
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  return (
    <>
      <h3 className="heading">Вход на сайт СНТ «Покровские дачи»</h3>
      {props.isAuth ? (
        <h3 className="text-center">Вы успешно авторизованы</h3>
      ) : (
        <div>
          {alert && <AlertMessage text={alert} />}
          <Form className="form" onSubmit={onSubmit}>
            <h4 className="text-center">Вход</h4>
            <Form.Control
              placeholder="Введите номер участка"
              field="login"
              maxLength="10"
              value={state.login}
              name="login"
              onChange={handleChange}
            />
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              field="password"
              maxLength="16"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
            <Button variant="primary" size="lg" type="submit" block>
              Войти
            </Button>
          </Form>
        </div>
      )}
    </>
  )
}

export default LoginForm
