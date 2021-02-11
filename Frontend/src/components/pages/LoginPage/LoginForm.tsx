import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { login, hideAlert } from '../../../redux/index'
import { AlertMessage } from '../../index'
import { AuthPropType } from '../../../App'
import { AppStateType } from '../../../redux/store'

const LoginForm: React.FC<AuthPropType> = ({ isAuth }) => {
  const alert = useSelector((state: AppStateType) => state.alerts.alert)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(hideAlert())
  }, [dispatch])

  const [state, setState] = useState({
    login: '',
    password: '',
  })
  const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    dispatch(login(state))
    setState({
      login: '',
      password: '',
    })
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  return (
    <>
      <h3 className="heading">Вход на сайт СНТ «Покровские дачи»</h3>
      {isAuth ? (
        <h3 className="text-center">Вы успешно авторизованы</h3>
      ) : (
        <div>
          {alert && <AlertMessage text={alert} />}
          <Form className="form" onSubmit={onSubmit}>
            <h4 className="text-center">Вход</h4>
            <Form.Control
              placeholder="Введите номер участка"
              maxLength={10}
              value={state.login}
              name="login"
              onChange={handleChange}
            />
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              maxLength={16}
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
