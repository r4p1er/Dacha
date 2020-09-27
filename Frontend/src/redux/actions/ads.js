import axios from "axios";
import { setAdverts } from "../reducers/ads";

export const getAdverts = () => {
  return async (dispatch) => {
    const adverts = await axios.get("http://localhost:5000/api/adverts")
    dispatch(setAdverts(adverts.data))
  }
}

export function addAdvert (data) {
  return dispatch => {
    return data => axios.post("http://localhost:5000/api/adverts", data)
  }
}