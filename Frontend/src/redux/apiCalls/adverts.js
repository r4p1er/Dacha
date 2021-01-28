import axios from 'axios'
import { apiUrl } from '../../utils'
import {
  addAdvert,
  editAdvert,
  deleteAdvert,
  fetchAdverts,
  loadingAdverts,
} from '../adverts'

const baseUrl = `${apiUrl}/posts`

export const createAdvert = (advert) => {
  if (advert.id) {
    const data = {
      id: advert.id,
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
      accountId: advert.accountId,
    }

    return (dispatch) => {
      updateAdvert(dispatch, data)
    }
  } else {
    const data = {
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
    }
    let isLoading = true

    return async (dispatch) => {
      if (isLoading) {
        dispatch(loadingAdverts(isLoading))
      }

      return await axios
      .post(baseUrl, data)
      .then((response) => {
        const id = response.data.id
        return axios
        .get(`${baseUrl}/${id}`)
        .then((response) => {
          isLoading = false
          dispatch(loadingAdverts(isLoading))
          dispatch(addAdvert(response.data))
        })
      })
    }
  }
}

const updateAdvert = async (dispatch, data) => {
  const id = data.id

  return await axios
  .put(`${baseUrl}/${id}`, data)
  .then((response) => {
    return axios
    .get(`${baseUrl}/${id}`)
    .then((response) => {
      dispatch(editAdvert(response.data))
    })
  })
}

export const deleteAd = (id) => {
  return async (dispatch) => {
    return await axios
    .delete(`${baseUrl}/${id}`)
    .then(() => {
      dispatch(deleteAdvert(id))
    })
  }
}

export const fetchAllAdverts = () => {
  let isLoading = true

  return async (dispatch) => {
    if (isLoading) {
      dispatch(loadingAdverts(isLoading))
    }

    return await axios
    .get(baseUrl)
    .then((response) => {
      isLoading = false
      dispatch(loadingAdverts(isLoading))
      const data = response.data
      dispatch(fetchAdverts(data))
    })
  }
}

export const fetchCurrentAdverts = () => {
  let isLoading = true

  return async (dispatch) => {
    if (isLoading) {
      dispatch(loadingAdverts(isLoading))
    }

    return await axios
    .get(`${baseUrl}/current`)
    .then((response) => {
      isLoading = false
      dispatch(loadingAdverts(isLoading))
      const data = response.data
      dispatch(fetchAdverts(data))
    })
  }
}
