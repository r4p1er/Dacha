import { Cookies } from 'react-cookie'
import { setAuthorizationToken } from '../../utils'
import { showAlert, hideAlert } from '../alertMessages'
import axios from 'axios'
import { apiUrl } from '../../utils'
import { setUser } from '../auth'

const cookie = new Cookies()

export function logout() {
  return (dispatch) => {
    cookie.remove('token')
    cookie.remove('id')
    cookie.remove('login')
    cookie.remove('name')
    cookie.remove('lastName')
    cookie.remove('middleName')
    cookie.remove('placeNum')
    cookie.remove('role')
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
        cookie.set('token', token, {expires: tokenExpDate})
        const userData = response.data.account
        cookie.set('id', response.data.id)
        cookie.set('login', response.data.login)
        cookie.set('name', response.data.name)
        cookie.set('lastName', response.data.last_name)
        cookie.set('middleName', response.data.middle_name)
        cookie.set('placeNum', response.data.place)
        cookie.set('role', response.data.role)
        setAuthorizationToken(token)
        dispatch(setUser(userData))
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
