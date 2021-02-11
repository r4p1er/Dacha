import { Cookies } from 'react-cookie'
import { setAuthorizationToken } from '../../utils'
import { showAlert, hideAlert } from '../reducers/alertMessages'
import axios from 'axios'
import { apiUrl } from '../../utils'
import { setUser } from '../reducers/auth'
import { Dispatch } from 'redux'

type AuthorizationType = {
  login: string
  password: string
}

export const cookie = new Cookies()

export const logout = () => (dispatch: Dispatch) => {
  cookie.remove('token')
  cookie.remove('id')
  cookie.remove('login')
  cookie.remove('name')
  cookie.remove('lastName')
  cookie.remove('middleName')
  cookie.remove('placeNum')
  cookie.remove('role')
  setAuthorizationToken('')
  dispatch(setUser({}))
  window.location.pathname = '/signin'
}

export const login = (data: AuthorizationType) => {
  return async (dispatch: Dispatch) => {
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
