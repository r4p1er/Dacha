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
    await axios
      .post(`${apiUrl}/token/`, data)
      .then((response) => {
        const token = response.data.token
        const tokenExpDate = new Date(response.data.expires)
        cookie.set('token', token, { expires: tokenExpDate })

        const userData = response.data.account
        cookie.set('id', userData.id, { expires: tokenExpDate })
        cookie.set('login', userData.login, { expires: tokenExpDate })
        cookie.set('name', userData.name, { expires: tokenExpDate })
        cookie.set('lastName', userData.lastName, { expires: tokenExpDate })
        cookie.set('middleName', userData.middleName, { expires: tokenExpDate })
        cookie.set('placeNum', userData.place, { expires: tokenExpDate })
        cookie.set('role', userData.role.name, { expires: tokenExpDate })

        setAuthorizationToken(token)
        dispatch(setUser(userData))
        dispatch(hideAlert())
        window.location.href = '/'
      })
      .catch((error) => {
        dispatch(showAlert('Неверный логин или пароль'))
      })
  }
}
