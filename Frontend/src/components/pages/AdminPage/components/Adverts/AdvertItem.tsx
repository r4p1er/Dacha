import React, { useState } from 'react'
import { Button, Col, Image, Modal, Row } from 'react-bootstrap'
import deleteIcon from '../../../../../additions/deleteIcon.png'
import { dateFormater } from '../../../../../utils'

type AdvertItemPropType = {
  onDelete: (id: number) => void
  index: number
  id: number
  title: string
  body: string
  contact: string
  place?: number
  date: number
}

const AdvertItem: React.FC<AdvertItemPropType> = React.memo(
  ({ id, onDelete, index, place, title, body, contact, date }) => {
    const [showFullAd, setshowFullAd] = useState(false)
    const handleCloseFullAd = () => setshowFullAd(false)
    const handleShowFullAd = () => setshowFullAd(true)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const handleClose = () => setShowDeleteModal(false)
    const handleShow = () => setShowDeleteModal(true)
    return (
      <>
        <tr>
          <td onClick={handleShowFullAd}>{index + 1}</td>
          <td
            onClick={handleShowFullAd}
            className="table-ad-place cursor-pointer"
          >
            {place}
          </td>
          <td
            onClick={handleShowFullAd}
            className="table-ad-title cursor-pointer"
          >
            {title}
          </td>
          <td
            onClick={handleShowFullAd}
            className="table-ad-body cursor-pointer"
          >
            {body}
          </td>
          <td
            onClick={handleShowFullAd}
            className="table-ad-contact cursor-pointer"
          >
            {contact}
          </td>
          <td
            onClick={handleShowFullAd}
            className="table-ad-contact cursor-pointer"
          >
            {dateFormater(date)}
          </td>
          <td>
            <Image
              onClick={handleShow}
              src={deleteIcon}
              className="cursor-pointer"
              alt="Удалить"
            />
          </td>
        </tr>
        <Modal show={showDeleteModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Вы действительно хотите удалить</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              onClick={() => {
                onDelete(id)
              }}
              variant="outline-danger"
            >
              Удалить
            </Button>
          </Modal.Body>
        </Modal>
        <Modal size="xl" show={showFullAd} onHide={handleCloseFullAd}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{body}</p>
          </Modal.Body>
          <Modal.Footer className="justify-content-start">
            <Row className="w-100">
              <Col>
                <span className="mr-2">Контакты:</span>
                <span>{contact}</span>
              </Col>
              <Col>
                <span>Участок №</span>
                <span>{place}</span>
              </Col>
              <Col>
                <span>Дата: </span>
                <span>{dateFormater(date)}</span>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
)

export default AdvertItem
