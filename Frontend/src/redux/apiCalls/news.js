import axios from 'axios'
import { showAlert } from '../alertMessages'
import { logout } from './auth'
import { apiUrl } from '../../utils'
import { addNews, deleteNews, editNews, fetchNews, loadingNews } from '../news'

const baseUrl = `${apiUrl}/news`

export const createNews = (news) => {
  if (news.id) {
    const data = {
      id: news.id,
      title: news.title,
      body: news.body,
    }
    return (dispatch) => {
      updateNews(dispatch, data)
    }
  } else {
    const data = {
      title: news.title,
      body: news.body,
    }
    let isLoading = true
    return async (dispatch) => {
      if (isLoading) {
        dispatch(loadingNews(isLoading))
      }
      return await axios
      .post(baseUrl, data)
      .then((response) => {
        const id = response.data.id
        return axios
        .get(`${baseUrl}/${id}`)
        .then((response) => {
          isLoading = false
          dispatch(loadingNews(isLoading))
          dispatch(addNews(response.data))
        })
      })
    }
  }
}

const updateNews = async (dispatch, data) => {
  const id = data.id
  const putData = {
    id: data.id,
    title: data.title,
    body: data.body,
  }
  return await axios
  .put(`${baseUrl}/${id}`, putData)
  .then((response) => {
    return axios
    .get(`${baseUrl}/${id}`)
    .then((response) => {
      dispatch(editNews(response.data))
    })
  })
}

export const delNews = (id) => {
  return async (dispatch) => {
    return await axios
    .delete(`${baseUrl}/${id}`)
    .then(() => {
      dispatch(deleteNews(id))
    })
  }
}

export const fetchAllNews = () => {
  let isLoading = true
  return async (dispatch) => {
    if (isLoading) {
      dispatch(loadingNews(isLoading))
    }
    return await axios
      .get(baseUrl)
      .then((response) => {
        isLoading = false
        dispatch(loadingNews(isLoading))
        const data = response.data
        dispatch(fetchNews(data))
      })
      .catch((error) => {
        isLoading = false
        dispatch(loadingNews(isLoading))
        if (error.response.status === 401) {
          dispatch(logout())
          window.location.pathname = '/signin'
        } else {
          dispatch(showAlert('Упс, что-то пошло не так'))
        }
      })
  }
}
