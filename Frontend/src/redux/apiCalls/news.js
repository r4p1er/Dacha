import axios from 'axios'
import { apiUrl } from '../../utils'
import { addNews, deleteNews, editNews, fetchNews } from '../reducers/news'

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

    return async (dispatch) => {
      return await axios.post(baseUrl, data).then((response) => {
        const id = response.data.id
        return axios.get(`${baseUrl}/${id}`).then((response) => {
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
  return await axios.put(`${baseUrl}/${id}`, putData).then((response) => {
    return axios.get(`${baseUrl}/${id}`).then((response) => {
      dispatch(editNews(response.data))
    })
  })
}

export const delNews = (id) => {
  return async (dispatch) => {
    return await axios.delete(`${baseUrl}/${id}`).then(() => {
      dispatch(deleteNews(id))
    })
  }
}

export const fetchAllNews = () => {
  return async (dispatch) => {
    return await axios.get(baseUrl).then((response) => {
      const data = response.data
      dispatch(fetchNews(data))
    })
  }
}
