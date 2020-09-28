import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../../redux/actions/news";
import { Col } from "react-bootstrap";
import NewsCard from "./NewsCard";
import {Loader} from "../../index";

const NewsBlock = () => {

    const dispatch = useDispatch()
    const news = useSelector(state => state.news.items)
    const loading = useSelector(state => state.app.loading)
    useEffect(()=>{
      dispatch(getNews())
    },[])

    return (
        <Col xl={6} lg={6} md={12} sm={12} xs={12}>
        <h2>Новости</h2>
        {loading ? <Loader/> :!news.length ? <h3>Новости отсутствуют</h3> : news.map((someNews) => ( <NewsCard key={someNews.id} {...someNews} />
        ))} 
        </Col>
    )
}

export default NewsBlock;
