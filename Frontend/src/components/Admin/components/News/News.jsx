import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../../../redux/actions/news";
import Loader from "../../../Loader/Loader";
import NewsItem from "./NewsItem";

const News = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.items);
  const loading = useSelector((state) => state.app.loading);
  useEffect(() => {
    dispatch(getNews());
  }, []);
  return (
    <>
      <h2>Новости</h2>
      <Button>Добавить</Button>
      {loading ? (
        <Loader />
      ) : (
        <Table size="sm" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Заголовок</th>
              <th>Новость</th>
            </tr>
          </thead>
          <tbody>
            {!news.length ? (
              <tr>
                <td>Новости отсутствуют</td>
              </tr>
            ) : (
              news.map((aNews) => <NewsItem key={aNews.id} {...aNews} />)
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default News;
