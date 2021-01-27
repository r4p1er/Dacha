import { setAuthorizationToken } from '../../utils'
import { showAlert, hideAlert } from '../alertMessages'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { apiUrl } from '../../utils'
import { setUser } from '../auth'

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken')
    setAuthorizationToken(false)
    dispatch(setUser({}))
  }
}

export function login(data) {
  return async (dispatch) => {
    try {
      await axios
      .post(`${apiUrl}/token`, data)
      .then((response) => {
        const token = response.data.access_token
        localStorage.setItem('jwtToken', token)
        setAuthorizationToken(token)
        dispatch(setUser(jwt.decode(token)))
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
