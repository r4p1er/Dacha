import React, { useState } from 'react'
import { Button, Card, Col, Image, Modal, Row } from 'react-bootstrap'
import deleteIcon from '../../../additions/deleteIcon.png'
import editIcon from '../../../additions/editIcon.png'
import { dateFormater } from '../../../utils'
import CreateAdvert from './CreateAdvert'

type AdCardPropType = {
  onDelete?: (id: number) => void
  id: number
  title: string
  body: string
  contact: string
  place?: number
  date: number | string
  accountId: number
}

const AdCard: React.FC<AdCardPropType> = React.memo(
  ({ title, body, contact, place, id, onDelete, date, accountId }) => {
    const [showAdsCreate, setShowAdsCreate] = useState(false)
    const handleCloseAdsCreate = () => setShowAdsCreate(false)
    const handleShowAdsCreate = () => setShowAdsCreate(true)

    const [showFullAd, setshowFullAd] = useState(false)
    const handleCloseFullAd = () => setshowFullAd(false)
    const handleShowFullAd = () => setshowFullAd(true)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const handleClose = () => setShowDeleteModal(false)
    const handleShow = () => setShowDeleteModal(true)
    return (
      <Col xl={4} lg={6} md={6} sm={12} xs={12}>
        <Card>
          <Card.Header>
            <Card.Title>{title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>{body}</Card.Text>
          </Card.Body>

          <div className="d-flex align-items-center p-2">
            <Button
              onClick={handleShowFullAd}
              className="mr-auto"
              block
              variant="outline-primary"
            >
              Смотреть объявление
            </Button>
            {!onDelete ? null : (
              <>
                <Image
                  className="mx-2 cursor-pointer"
                  height="24"
                  src={editIcon}
                  onClick={() => {
                    handleShowAdsCreate()
                  }}
                  alt="Редактировать"
                />
                <Image
                  className="cursor-pointer"
                  height="24"
                  src={deleteIcon}
                  onClick={handleShow}
                  alt="Удалить"
                />
              </>
            )}
          </div>
          <Card.Footer>
            <div>
              <span className="text-muted mr-4">Участок №{place}</span>
              <span>{dateFormater(date)}</span>
            </div>
          </Card.Footer>
        </Card>
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
              <Col className="advert-date">
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
        <Modal size="xl" show={showAdsCreate} onHide={handleCloseAdsCreate}>
          <Modal.Header closeButton>
            <Modal.Title>Редактирование объявления</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateAdvert
              id={id}
              title={title}
              body={body}
              contact={contact}
              accountId={accountId}
              handleCloseAdsCreate={handleCloseAdsCreate}
            />
          </Modal.Body>
        </Modal>
        {!onDelete ? null : (
          <Modal show={showDeleteModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Вы действительно хотите удалить</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button
                onClick={() => {
                  onDelete(id)
                  handleClose()
                }}
                variant="outline-danger"
              >
                Удалить
              </Button>
            </Modal.Body>
          </Modal>
        )}
      </Col>
    )
  }
)
export default AdCard
