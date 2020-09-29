import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../../../redux/actions/news";
import Loader from "../../../Loader/Loader";



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
      {loading ? (
        <Loader />
      ) : !news.length ? (
        <h3>Объявления отсутствуют</h3>
      ) : (
        news.map((someNews) => <someNews key={someNews.id} {...someNews} />)
      )}
    </>
  );
};

export default News;
