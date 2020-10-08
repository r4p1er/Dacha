import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNews } from "../../../redux/actions/news";
import { Col } from "react-bootstrap";
import NewsCard from "./NewsCard";

const NewsBlock = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  useEffect(() => {
    dispatch(fetchAllNews());
  }, []);
  return (
    <Col xl={6} lg={6} md={12} sm={12} xs={12}>
      <h2>Новости</h2>
      {!news.length ? (
        <h3>Новости отсутствуют</h3>
      ) : (
        news
          .reverse()
          .map((someNews) => <NewsCard key={someNews.id} {...someNews} />)
      )}
    </Col>
  );
};

export default NewsBlock;
