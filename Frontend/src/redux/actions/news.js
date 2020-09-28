import axios from "axios";
import { setNews } from "../reducers/news";
import { showLoader, hideLoader } from "../reducers/alertMessages";


export const getNews = () => {
  return async (dispatch) => {
    dispatch(showLoader())
    const news = await axios.get("http://localhost:5000/api/news")
    dispatch(setNews(news.data))
    dispatch(hideLoader())
  }
}
