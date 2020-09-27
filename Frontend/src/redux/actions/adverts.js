import axios from "axios";
import { setAdverts } from "../reducers/adverts";

export const getAdverts = () => {
  return async (dispatch) => {
    const adverts = await axios.get("http://localhost:5000/api/adverts")
    dispatch(setAdverts(adverts.data))
  }
}
