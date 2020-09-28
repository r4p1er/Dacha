import axios from "axios";
import { setAd, addAd, deleteAd, changeAd } from "../reducers/adverts";

export const getAdverts = () => {
  return async (dispatch) => {
    const adverts = await axios.get("http://localhost:5000/api/adverts")
    dispatch(setAd(adverts.data))
  }
}

export const createAdvert = (advert) => {
  return async (dispatch) => {
    await axios.post("http://localhost:5000/api/adverts", advert)
    dispatch(addAd(advert))
  }
}

export const changeAdvert = (advert) => {
  return async (dispatch) => {
    await axios.put(`http://localhost:5000/api/adverts${advert.id}`, advert)
    dispatch(changeAd(advert))
  }
}

export const deleteAdvert = (id) => {
  return async (dispatch) => {
    await axios.delete(`http://localhost:5000/api/adverts${id}`)
    dispatch(deleteAd(id))
  }
}