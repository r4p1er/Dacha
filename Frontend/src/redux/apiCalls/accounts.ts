import axios from 'axios'
import { Dispatch } from 'redux'
import { apiUrl } from '../../utils'
import {
  addAccount,
  editAccount,
  deleteAccount,
  fetchAccounts,
} from '../reducers/accounts'

const baseUrl = `${apiUrl}/accounts`

type CreateAccountType = {
  id?: number | null
  login: string
  password: string
  lastName: string
  name: string
  middleName: string
  place: number
  roleId: number
}

export const createAccount = (account: CreateAccountType) => {
  if (account.id) {
    const data = {
      id: account.id,
      login: account.login,
      password: account.password,
      lastName: account.lastName,
      name: account.name,
      middleName: account.middleName,
      place: account.place,
      roleId: account.roleId,
    }
    return (dispatch: Dispatch) => updateAccount(dispatch, data)
  } else {
    const data = {
      login: account.login,
      password: account.password,
      lastName: account.lastName,
      name: account.name,
      middleName: account.middleName,
      place: account.place,
      roleId: account.roleId,
    }

    return async (dispatch: Dispatch) => {
      return await axios.post(baseUrl, data).then((response) => {
        const id = response.data.id
        return axios.get(`${baseUrl}/${id}`).then((response) => {
          dispatch(addAccount(response.data))
        })
      })
    }
  }
}

const updateAccount = async (dispatch: Dispatch, data: CreateAccountType) => {
  const id = data.id
  const putData = {
    id: data.id,
    login: data.login,
    password: data.password,
    lastName: data.lastName,
    name: data.name,
    middleName: data.middleName,
    place: data.place,
    roleId: data.roleId,
  }
  return await axios.put(`${baseUrl}/${id}`, putData).then((response) => {
    return axios.get(`${baseUrl}/${id}`).then((response) => {
      dispatch(editAccount(response.data))
    })
  })
}

export const deleteAcc = (id: number) => {
  return async (dispatch: Dispatch) => {
    return await axios.delete(`${baseUrl}/${id}`).then(() => {
      dispatch(deleteAccount(id))
    })
  }
}

export const fetchAllAccounts = (id?: number) => {
  return async (dispatch: Dispatch) => {
    if (id) {
      return await axios.get(`${baseUrl}/${id}`).then((response) => {
        const data = response.data
        dispatch(fetchAccounts(data))
      })
    } else {
      return await axios.get(baseUrl).then((response) => {
        const data = response.data
        dispatch(fetchAccounts(data))
      })
    }
  }
}
