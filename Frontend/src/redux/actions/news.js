import axios from "axios";
import { setNews } from "../reducers/news";

export const getNews = () => {
  return async (dispatch) => {
    const news = await axios.get("http://localhost:5000/api/news")
    dispatch(setNews(news.data))
  }
}

export function addNews (data) {
  return dispatch => {
    return data => axios.post("http://localhost:5000/api/news", data)
  }
}