import axios from "axios";

export default {
  signIn: postData => axios.post("http://localhost:5000/api/token", postData),
  getMe: () => axios.get("http://localhost:5000/api/profiles/1")
};