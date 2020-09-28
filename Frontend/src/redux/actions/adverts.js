import axios from "axios";
import { setAd, addAd, deleteAd, changeAd, setCurrentAd } from "../reducers/adverts";
import { showLoader, hideLoader } from "../reducers/alertMessages";
import { showAlert } from "./AlertMessages";

const baseUrl = "http://localhost:5000/api/adverts";

export const getAdverts = () => {
  return async (dispatch) => {
    dispatch(showLoader())
    const adverts = await axios.get(baseUrl)
      dispatch(setAd(adverts.data))
      dispatch(hideLoader())  
  }
}

export const getCurrentAdverts = () => {
  return async (dispatch) => {
    dispatch(showLoader())
    const adverts = await axios.get(`${baseUrl}/current`)
      dispatch(setCurrentAd(adverts.data))
      dispatch(hideLoader())  
  }
}

export const createAdvert = (advert) => {
  return async (dispatch) => {
    await axios.post(baseUrl, advert)
    dispatch(addAd(advert))
  }
}

export const changeAdvert = (advert) => {
  return async (dispatch) => {
    await axios.put(`${baseUrl}/${advert.id}`, advert)
    dispatch(changeAd(advert))
  }
}

export const deleteAdvert = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${baseUrl}/${id}`)
    dispatch(deleteAd(id))
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(showAlert('Такого объявления не существует'))
      }
        dispatch(showAlert('Упсс, что-то пошло не так'))
    }
  }
}