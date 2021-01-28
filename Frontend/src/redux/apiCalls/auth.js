import { Cookies } from 'react-cookie'
import { setAuthorizationToken } from '../../utils'
import { showAlert, hideAlert } from '../alertMessages'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { apiUrl } from '../../utils'
import { setUser } from '../auth'

const cookie = new Cookies()

export function logout() {
  return (dispatch) => {
    cookie.remove('token')
    setAuthorizationToken(false)
    dispatch(setUser({}))
    window.location.pathname = '/signin'
  }
}

export function login(data) {
  return async (dispatch) => {
    try {
      await axios.post(`${apiUrl}/token`, data).then((response) => {
        const token = response.data.token
        const tokenExpDate = response.data.expires
        cookie.set('token', token)
        setAuthorizationToken(token)
        dispatch(setUser(response.data))
        dispatch(hideAlert())
      })
      window.location.href = '/'
    } catch (error) {
      if (error.response.status === 400) {
        dispatch(showAlert('Неверный логин или пароль'))
      }
    }
  }
}
