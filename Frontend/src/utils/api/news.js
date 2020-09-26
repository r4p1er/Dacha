import axios from "axios";

export default {
  getNews: axios.get("http://localhost:5000/api/news")
};