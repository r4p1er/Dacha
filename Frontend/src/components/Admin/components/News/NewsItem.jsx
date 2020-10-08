import React, { useState } from "react";
import { Modal } from "react-bootstrap";
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
  const [showNewsUpdate, setshowNewsUpadate] = useState(false);

  const handleCloseNewsUpadate = () => setshowNewsUpadate(false);
  const handleShowNewsUpadate = () => setshowNewsUpadate(true);

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{body}</td>
        <td>{newsDate}</td>
        <td>
          <span onClick={() => {handleShowNewsUpadate()}}>Изменить</span>
        </td>
        <td>
          <span onClick={() => {onDelete(id)}}>Удалить</span>
        </td>
      </tr>

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
