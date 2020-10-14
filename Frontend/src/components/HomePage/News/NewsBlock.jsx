import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNews } from "../../../redux/actions/news";
import { Col } from "react-bootstrap";
import NewsCard from "./NewsCard";
import FullPageLoader from "../../Loader/Loader";

const NewsBlock = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);
  const newsState = useSelector((state) => state.news);
  const loading = newsState.isLoading;
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
            .reverse()
            .map((someNews) => <NewsCard key={someNews.id} {...someNews} />)
        )}
      </Col>
    </>
  );
};

export default NewsBlock;
