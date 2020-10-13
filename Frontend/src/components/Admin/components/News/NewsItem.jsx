import React, { useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import UpdateNews from "./UpdateNews";
import deleteIcon from "../../../../additions/deleteIcon.png";
import editIcon from "../../../../additions/editIcon.png";

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
        <td onClick={handleShowFullNews} className="table-news-title cursor-pointer">{title}</td>
        <td onClick={handleShowFullNews} className="table-news-body cursor-pointer">{body}</td>
        <td onClick={handleShowFullNews} className="table-news-date cursor-pointer">{newsDate}</td>
        <td>
          <Image onClick={() => {handleShowNewsUpadate()}} src={editIcon} className="cursor-pointer"/>
        </td>
        <td>
          <Image onClick={handleShow} src={deleteIcon} className="cursor-pointer"/>
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
      <Modal size="lg" show={showNewsUpdate} onHide={handleCloseNewsUpadate}>
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
