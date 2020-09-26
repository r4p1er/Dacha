import axios from "axios";

export default {
  signIn: data => axios.post("http://localhost:5000/api/token", data)
};