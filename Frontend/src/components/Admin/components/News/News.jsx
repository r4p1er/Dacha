import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNews, fetchAllNews } from "../../../../redux/actions/news";
import CreateNews from "./CreateNews";
import NewsItem from "./NewsItem";

const News = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);
  const news = useSelector((state) => state.news.news);

  const onDelete = (id) => dispatch(deleteNews(id));

  const [showNewsCreate, setshowNewsCreate] = useState(false);

  const handleCloseNewsCreate = () => setshowNewsCreate(false);
  const handleShowNewsCreate = () => setshowNewsCreate(true);

  return (
    <>
      <Button className="mb-4" onClick={handleShowNewsCreate}>Добавить новость</Button>
      <Table className="admin_table" size="sm" responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Заголовок</th>
            <th>Новость</th>
            <th>Дата</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!news.length ? (
            <tr>
              <td>Новости отсутствуют</td>
            </tr>
          ) : (
            [...news]
              .reverse()
              .map((aNews, index) => (
                <NewsItem
                  key={aNews.id}
                  onDelete={onDelete}
                  index={index}
                  {...aNews}
                />
              ))
          )}
        </tbody>
      </Table>
      <Modal show={showNewsCreate} onHide={handleCloseNewsCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Создание новости</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateNews handleCloseNewsCreate={handleCloseNewsCreate} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default News;
