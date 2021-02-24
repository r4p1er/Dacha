import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'
import {
  hideAlert,
  showAlert,
  createAccount,
  getUser,
} from '../../../../redux/index'
import { Alert } from '../../../index'
import { AppStateType } from '../../../../redux/store'

type UpdateAccountPropType = {
  handleCloseAccountUpadate?: () => void
  id?: number | null
  login?: string
  password?: string
  lastName?: string
  name?: string
  middleName?: string
  place?: number
  roleId?: number
}

const CreateAccount: React.FC<UpdateAccountPropType> = ({
  handleCloseAccountUpadate,
  id = null,
  login = '',
  password = '',
  lastName = '',
  name = '',
  middleName = '',
  place = 0,
  roleId = 1,
}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(hideAlert())
  }, [dispatch])

  const user = useSelector((state: AppStateType) => getUser(state))
  const alert = useSelector((state: AppStateType) => state.alerts.alert)
  const role = user.role

  const [accountState, setAccount] = useState({
    id: id,
    login: login,
    password: password,
    lastName: lastName,
    name: name,
    middleName: middleName,
    place: place,
    roleId: roleId,
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setAccount((prev) => ({
      ...prev,
      ...{
        [name]: value,
      },
    }))
  }

  const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    dispatch(hideAlert())

    if (
      accountState.login === '' ||
      accountState.lastName === '' ||
      accountState.name === '' ||
      accountState.middleName === '' ||
      accountState.place === null
    ) {
      return dispatch(showAlert('Заполните все поля формы'))
    }

    const id = accountState.id
    const login = accountState.login
    const password = accountState.password
    const lastName = accountState.lastName
    const name = accountState.name
    const middleName = accountState.middleName
    const place = accountState.place
    const roleId = accountState.roleId

    if (id) {
      dispatch(createAccount(accountState))
      handleCloseAccountUpadate!()
    } else {
      dispatch(
        createAccount({
          login,
          password,
          lastName,
          name,
          middleName,
          place,
          roleId,
        })
      )
    }
    
    setAccount({
      id: null,
      login: '',
      password: '',
      lastName: '',
      name: '',
      middleName: '',
      place: 0,
      roleId: 1,
    })
  }

  return (
    <Form onSubmit={onSubmit} className="create-acc-form">
      {alert && <Alert text={alert} />}
      <Form.Row>
        <Col>
          <Form.Group controlId="formGridLogin">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              value={accountState.login}
              onChange={onChange}
              name="login"
              placeholder="Логин"
            />
          </Form.Group>

          <Form.Group controlId="RoleId">
            <Form.Label>Роль</Form.Label>
            <Form.Control
              defaultValue={accountState.roleId}
              onChange={onChange}
              name="roleId"
              as="select"
            >
              <option value={1}>Пользователь</option>
              {role === 'admin' ? (
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
              value={accountState.password}
              onChange={onChange}
              name="password"
              type="password"
              placeholder="Пароль"
            />
          </Form.Group>
          <Form.Group controlId="place">
            <Form.Label>Участок</Form.Label>
            <Form.Control
              value={accountState.place}
              onChange={onChange}
              name="place"
              placeholder="Номер участка"
            />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="lastName">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            value={accountState.lastName}
            onChange={onChange}
            name="lastName"
            placeholder="Фамилию"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="name">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            value={accountState.name}
            onChange={onChange}
            name="name"
            placeholder="Имя"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="middleName">
          <Form.Label>Отчество</Form.Label>
          <Form.Control
            value={accountState.middleName}
            onChange={onChange}
            name="middleName"
            placeholder="Отчество"
          />
        </Form.Group>
      </Form.Row>

      <Button className="w-100" variant="primary" type="submit">
        {!accountState.id ? 'Создать аккаунт' : 'Обновить аккаунт'}
      </Button>
    </Form>
  )
}

export default CreateAccount
