import axios from 'axios'
import { Dispatch } from 'redux'
import { apiUrl } from '../../utils'
import {
  addAdvert,
  editAdvert,
  deleteAdvert,
  fetchAdverts,
} from '../reducers/adverts'

const baseUrl = `${apiUrl}/posts`

type CreateAdvertType = {
  id?: number | null
  title: string
  body: string
  contact: string
  accountId?: number | null
}

export const createAdvert = (advert: CreateAdvertType) => {
  if (advert.id) {
    const data = {
      id: advert.id,
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
      accountId: advert.accountId,
    }

    return (dispatch: Dispatch) => updateAdvert(dispatch, data)
  } else {
    const data = {
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
    }

    return async (dispatch: Dispatch) => {
      return await axios.post(baseUrl, data).then((response) => {
        const id = response.data.id
        return axios.get(`${baseUrl}/${id}`).then((response) => {
          dispatch(addAdvert(response.data))
        })
      })
    }
  }
}

const updateAdvert = async (dispatch: Dispatch, data: CreateAdvertType) => {
  const id = data.id

  return await axios.put(`${baseUrl}/${id}`, data).then((response) => {
    return axios.get(`${baseUrl}/${id}`).then((response) => {
      dispatch(editAdvert(response.data))
    })
  })
}

export const deleteAd = (id: number) => {
  return async (dispatch: Dispatch) => {
    return await axios.delete(`${baseUrl}/${id}`).then(() => {
      dispatch(deleteAdvert(id))
    })
  }
}

export const fetchAllAdverts = () => {
  return async (dispatch: Dispatch) => {
    return await axios.get(baseUrl).then((response) => {
      const data = response.data
      dispatch(fetchAdverts(data))
    })
  }
}
