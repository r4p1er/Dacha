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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  const [showNewsUpdate, setshowNewsUpadate] = useState(false);
  const handleCloseNewsUpadate = () => setshowNewsUpadate(false);
  const handleShowNewsUpadate = () => setshowNewsUpadate(true);

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td className="table-news-title">{title}</td>
        <td className="table-news-body">{body}</td>
        <td className="table-news-date">{newsDate}</td>
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
    </>
  );
};

export default NewsItem;
