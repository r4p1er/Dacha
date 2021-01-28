import React from 'react'
import { Col } from 'react-bootstrap'

const Contacts = () => {
  return (
    <Col className="contacts-block" xl={6} lg={6} md={12} sm={12} xs={12}>
      <h3 className="heading">Контакты</h3>
      <h5 className="pl-2">СНТ «Покровские дачи»</h5>
      <p>
        <strong>Адрес:</strong>&nbsp;143322, Московская область, Наро-Фоминский
        район, деревня Покровка, территория СНТ «Покровские дачи»
      </p>
      <p>
        <strong>Телефон:</strong>&nbsp;+7 ( ) ____________ (председатель)
      </p>
      <p>
        <strong>Email:</strong>&nbsp;pokrovskie-dachi@yandex.ru
      </p>
      <p>
        <strong>Режим работы:</strong>
      </p>
      <p>
        <strong>Председатель:</strong>&nbsp;часы приема — по согласованию или
        звонку.
      </p>
    </Col>
  )
}

export default Contacts
