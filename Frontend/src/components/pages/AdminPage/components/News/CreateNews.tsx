import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert, hideAlert, createNews } from '../../../../../redux/index'
import { AppStateType } from '../../../../../redux/store'
import { AlertMessage } from '../../../../index'

type CreateNewsPropType = {
  handleCloseNewsCreate: () => void
  id?: number
  title?: string
  body?: string
  date?: string
}

const CreateNews: React.FC<CreateNewsPropType> = React.memo(
  ({ handleCloseNewsCreate, id = null, title = '', body = '', date = '' }) => {
    const dispatch = useDispatch()
    const alert = useSelector((state: AppStateType) => state.alerts.alert)

    useEffect(() => {
      dispatch(hideAlert())
    }, [dispatch])

    const [news, setNews] = useState({
      id: id,
      title: title,
      body: body,
      date: date,
    })

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name
      const value = event.target.value
      setNews((prev) => ({
        ...prev,
        ...{
          [name]: value,
        },
      }))
    }

    const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()

      const title = news.title
      const body = news.body

      if (title === '' || body === '') {
        return dispatch(showAlert('Заполните форму'))
      }

      if (id) {
        dispatch(createNews(news))
        handleCloseNewsCreate()
        setNews({
          id: null,
          title: '',
          body: '',
          date: '',
        })
      } else {
        const tzoffset = new Date().getTimezoneOffset() * 60000
        const newDate = new Date(Date.now() - tzoffset).toISOString()
        dispatch(createNews({ title, body, newDate }))
        handleCloseNewsCreate()
        setNews({
          id: null,
          title: '',
          body: '',
          date: '',
        })
      }
    }

    return (
      <Form onSubmit={onSubmit}>
        {alert && <AlertMessage text={alert} />}
        <Form.Group>
          <Form.Label className="mb-1">Введите заголовок новости</Form.Label>
          <Form.Control
            placeholder="Максимум 50 символов"
            value={news.title}
            maxLength={50}
            name="title"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="mb-1">Введите текст новости</Form.Label>
          <Form.Control
            style={{ resize: 'none' }}
            placeholder="Максимум 1500 символов"
            as="textarea"
            rows={8}
            value={news.body}
            maxLength={600}
            name="body"
            onChange={onChange}
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          {!news.id ? "Создать новость" : "Обновить новость"}
        </Button>
      </Form>
    )
  }
)

export default CreateNews
