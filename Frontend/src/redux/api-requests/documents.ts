import axios from 'axios'
import { apiUrl } from '../../common/utils/utils'
import { Cookies } from 'react-cookie'
import {
  fetchDocuments,
  deleteDocument,
  downloadDocument,
} from '../reducers/documets'
import { Dispatch } from 'redux'

const cookie = new Cookies()
const baseUrl = `${apiUrl}/documents`
const downloadUrl = `http://${window.location.hostname}:5000/StaticFiles`

export const addDocument = (document: object) => {
  const data = document

  return async (dispatch: Dispatch) => {
    return await axios.post(baseUrl, data).then((response) => {
      return axios.get(`${baseUrl}`).then((response) => {
        dispatch(fetchDocuments(response.data))
      })
    })
  }
}

export const deleteDoc = (id: number) => {
  return async (dispatch: Dispatch) => {
    return await axios.delete(`${baseUrl}/${id}`).then(() => {
      dispatch(deleteDocument(id))
    })
  }
}

export const fetchAllDocuments = () => {
  return async (dispatch: Dispatch) => {
    return await axios.get(baseUrl).then((response) => {
      const data = response.data
      dispatch(fetchDocuments(data))
    })
  }
}

export const downloadDoc = (id: number, name: string) => {
  const token = cookie.get('token')
  const AuthStr = `Bearer ${token}`
  return async (dispatch: Dispatch) => {
    dispatch(downloadDocument())
    await axios
      .get(`${downloadUrl}/${encodeURIComponent(name)}`, {
        responseType: 'blob',
        headers: { Authorization: AuthStr },
      })
      .then((response) => {
        if (name.substring(name.lastIndexOf('.') + 1, name.length) === 'pdf') {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: 'application/pdf' })
          )
          const link: HTMLAnchorElement = document.createElement('a')
          link.classList.add('d-none')
          document.body.appendChild(link)
          link.href = url
          link.setAttribute('target', '_blank')
          link.click()
        } else {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: 'application/octet-stream' })
          )
          const link: HTMLAnchorElement = document.createElement('a')
          link.classList.add('d-none')
          document.body.appendChild(link)
          link.href = url
          link.setAttribute('download', `${name}`)
          link.click()
        }
      })
  }
}
