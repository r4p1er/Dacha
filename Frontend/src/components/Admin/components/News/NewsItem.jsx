import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UpdateNews from "./UpdateNews";

const NewsItem = ({
  id,
  index,
  title,
  body,
  date,
  onDelete,
}) => {

  const newsDate = new Date(date).toLocaleString();

  const [showFullNews, setshowFullNews] = useState(false);
  const handleCloseFullNews = () => setshowFullNews(false);
  const handleShowFullNews = () => setshowFullNews(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  const [showNewsUpdate, setshowNewsUpadate] = useState(false);
  const handleCloseNewsUpadate = () => setshowNewsUpadate(false);
  const handleShowNewsUpadate = () => setshowNewsUpadate(true);

  return (
    <>
      <tr>
        <td onClick={handleShowFullNews}>{index + 1}</td>
        <td onClick={handleShowFullNews} className="table-news-title">{title}</td>
        <td onClick={handleShowFullNews} className="table-news-body">{body}</td>
        <td onClick={handleShowFullNews} className="table-news-date">{newsDate}</td>
        <td>
          <span onClick={() => {handleShowNewsUpadate()}}>Изменить</span>
        </td>
        <td>
          <span onClick={handleShow}>Удалить</span>
        </td>
      </tr>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Вы действительно хотите удалить</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Button onClick={() => {onDelete(id)}} variant="outline-danger">Удалить</Button>
        </Modal.Body>
      </Modal>
      <Modal show={showNewsUpdate} onHide={handleCloseNewsUpadate}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование новости</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateNews id={id} title={title} body={body} date={date} handleCloseNewsUpadate={handleCloseNewsUpadate} />
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
          {newsDate}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewsItem;
