import axios from "axios";
import { setAdverts, addAdvert } from "../reducers/adverts";

export const getAdverts = () => {
  return async (dispatch) => {
    const adverts = await axios.get("http://localhost:5000/api/adverts")
    dispatch(setAdverts(adverts.data))
  }
}


export const createAdvert = (advert) => {
  return async (dispatch) => {
    await axios.post("http://localhost:5000/api/adverts", advert)
    dispatch(addAdvert(advert))
  }
}