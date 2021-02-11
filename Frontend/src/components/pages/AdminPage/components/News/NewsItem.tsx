import React, { useState } from 'react'
import { Image, Modal } from 'react-bootstrap'
import deleteIcon from '../../../../../additions/deleteIcon.png'
import editIcon from '../../../../../additions/editIcon.png'
import { dateFormater, urlify } from '../../../../../utils'
import { ConfirmModal } from '../../../../common'
import CreateNews from './CreateNews'

type NewsPropTypes = {
  onDelete: (id: number) => void
  id: number
  index: number
  title: string
  body: string
  date: string
}

const NewsItem: React.FC<NewsPropTypes> = React.memo(
  ({ id, index, title, body, date, onDelete }) => {
    const [showFullNews, setshowFullNews] = useState(false)
    const handleCloseFullNews = () => setshowFullNews(false)
    const handleShowFullNews = () => setshowFullNews(true)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const handleClose = () => setShowDeleteModal(false)
    const handleShow = () => setShowDeleteModal(true)

    const [showNewsCreate, setShowNewsCreate] = useState(false)
    const handleCloseNewsCreate = () => setShowNewsCreate(false)
    const handleShowNewsCreate = () => setShowNewsCreate(true)

    return (
      <>
        <tr>
          <td onClick={handleShowFullNews}>{index + 1}</td>
          <td
            onClick={handleShowFullNews}
            className="table-news-title cursor-pointer"
          >
            {title}
          </td>
          <td
            onClick={handleShowFullNews}
            className="table-news-body cursor-pointer"
          >
            {urlify(body)}
          </td>
          <td
            onClick={handleShowFullNews}
            className="table-news-date cursor-pointer"
          >
            {dateFormater(date)}
          </td>
          <td>
            <Image
              onClick={() => {
                handleShowNewsCreate()
              }}
              src={editIcon}
              className="cursor-pointer"
              alt="Редактировать"
            />
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
        <ConfirmModal
          show={showDeleteModal}
          onHide={handleClose}
          title="Удалить новость"
          onDelete={onDelete}
          id={id}
        />
        <Modal size="xl" show={showNewsCreate} onHide={handleCloseNewsCreate}>
          <Modal.Header closeButton>
            <Modal.Title>Редактирование новости</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateNews
              id={id}
              title={title}
              body={body}
              date={date}
              handleCloseNewsCreate={handleCloseNewsCreate}
            />
          </Modal.Body>
        </Modal>
        <Modal show={showFullNews} onHide={handleCloseFullNews} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{body}</p>
          </Modal.Body>
          <Modal.Footer className="justify-content-start">
            <span>Дата: {dateFormater(date)}</span>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
)

export default NewsItem
