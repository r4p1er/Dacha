import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNews } from "../../../redux/actions/news";
import { Button, Col, Modal } from "react-bootstrap";
import NewsCard from "./NewsCard";
import FullPageLoader from "../../Loader/Loader";

const NewsBlock = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);
  const newsState = useSelector((state) => state.news);
  const loading = newsState.isLoading;

  function urlify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} rel="noopener noreferrer" target="_blank">
            {part}
          </a>
        );
      }
      return part;
    });
  }

  const [showAllNews, setShowAllNews] = useState(false);
  const handleClose = () => setShowAllNews(false);
  const handleShow = () => setShowAllNews(true);

  return (
    <>
      <Col xl={6} lg={6} md={12} sm={12} xs={12}>
        <h2>Новости</h2>
        {loading ? (
          <FullPageLoader />
        ) : !newsState.news.length ? (
          <h3>Новости отсутствуют</h3>
        ) : (
          newsState.news
            .slice(-3)
            .reverse()
            .map((someNews) => <NewsCard key={someNews.id} {...someNews} />)
        )}
      </Col>
      {newsState.news.length > 3 ? (
        <>
          <Button
            variant="info"
            className="ml-auto"
            onClick={handleShow}
          >
            Показать все новости
          </Button>
          <Modal size="lg" show={showAllNews} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Новости</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {newsState.news
                .map((someNews) => (
                  <div key={someNews.id}>
                    <div className="news-card d-flex flex-column">
                      <h5>{someNews.title}</h5>
                      <p className="home_post_text">{urlify(someNews.body)}</p>
                      <span className="align-self-end">
                        {new Date(someNews.date).getHours()}:
                        {new Date(someNews.date).getMinutes()}{" "}
                        {new Date(someNews.date).toLocaleDateString()}г
                      </span>
                    </div>
                    <hr />
                  </div>
                ))}
            </Modal.Body>
          </Modal>
        </>
      ) : null}
    </>
  );
};

export default NewsBlock;
