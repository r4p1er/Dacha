import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { showAlert, hideAlert, createAdvert } from '../../../redux/index'
import { AlertMessage } from '../../index'
import { AppStateType } from '../../../redux/store'

type CreateAdvertPropType = {
  handleCloseAdsCreate: () => void
  id?: number
  title?: string
  body?: string
  contact?: string
  accountId?: number
}

const CreateAdvert: React.FC<CreateAdvertPropType> = ({
  handleCloseAdsCreate,
  id = null,
  title = '',
  body = '',
  contact = '',
  accountId = null,
}) => {
  const dispatch = useDispatch()
  const alert = useSelector((state: AppStateType) => state.alerts.alert)

  useEffect(() => {
    dispatch(hideAlert())
  }, [dispatch])

  const [advert, setAdvert] = useState({
    id: id,
    title: title,
    body: body,
    contact: contact,
    accountId: accountId,
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setAdvert((prev) => ({
      ...prev,
      ...{
        [name]: value,
      },
    }))
  }

  const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const id = advert.id
    const title = advert.title
    const body = advert.body
    const contact = advert.contact

    if (title === '' || body === '' || contact === '') {
      return dispatch(showAlert('Заполните форму'))
    }
    if (id) {
      dispatch(createAdvert(advert))
      handleCloseAdsCreate()
      setAdvert({
        id: null,
        title: '',
        body: '',
        contact: '',
        accountId: null,
      })
    } else {
      dispatch(createAdvert({ title, body, contact }))
      handleCloseAdsCreate()
      setAdvert({
        id: null,
        title: '',
        body: '',
        contact: '',
        accountId: null,
      })
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      {alert && <AlertMessage text={alert} />}
      <Form.Group>
        <Form.Label className="mb-1">Введите заголовок объявления</Form.Label>
        <Form.Control
          placeholder="Максимум 50 символов"
          value={advert.title}
          maxLength={50}
          name="title"
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="mb-1">Введите текст объявления</Form.Label>
        <Form.Control
          style={{ resize: 'none' }}
          placeholder="Максимум 1500 символов"
          as="textarea"
          rows={8}
          value={advert.body}
          maxLength={1500}
          name="body"
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="mb-1">Контактная информация</Form.Label>
        <Form.Control
          placeholder="Максимум 50 символов"
          value={advert.contact}
          name="contact"
          maxLength={50}
          onChange={onChange}
        />
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        {!advert.id ? "Создать объявление" : "Обновить объявление"}
      </Button>
    </Form>
  )
}

export default CreateAdvert
