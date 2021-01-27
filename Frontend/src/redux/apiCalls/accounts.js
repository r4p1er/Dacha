import axios from 'axios'
import { apiUrl } from '../../utils'
import {
  addAccount,
  editAccount,
  deleteAccount,
  fetchAccounts,
  loadingAccounts,
} from '../accounts'

const baseUrl = `${apiUrl}/accounts`

export const createAccount = (account) => {
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

    return (dispatch) => {
      updateAccount(dispatch, data)
    }
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
    let isLoading

    return async (dispatch) => {
      if (isLoading) {
        dispatch(loadingAccounts(isLoading))
      }

      return await axios
      .post(baseUrl, data)
      .then((response) => {
        const id = response.data.id

        return axios
        .get(`${baseUrl}/${id}`)
        .then((response) => {
          isLoading = false
          dispatch(loadingAccounts(isLoading))
          dispatch(addAccount(response.data))
        })
      })
    }
  }
}

const updateAccount = async (dispatch, data) => {
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
  return await axios
  .put(`${baseUrl}/${id}`, putData)
  .then((response) => {
    return axios
    .get(`${baseUrl}/${id}`)
    .then((response) => {
      dispatch(editAccount(response.data))
    })
  })
}

export const deleteAcc = (id) => {
  return async (dispatch) => {
    return await axios
    .delete(`${baseUrl}/${id}`)
    .then(() => {
      dispatch(deleteAccount(id))
    })
  }
}

export const fetchAllAccounts = (id) => {
  let isLoading

  return async (dispatch) => {
    if (isLoading) {
      dispatch(loadingAccounts(isLoading))
    }

    if (id) {
      return await axios
      .get(`${baseUrl}/${id}`)
      .then((response) => {
        isLoading = false
        dispatch(loadingAccounts(isLoading))
        const data = response.data
        dispatch(fetchAccounts(data))
      })
    } else {
      return await axios
      .get(baseUrl)
      .then((response) => {
        isLoading = false
        dispatch(loadingAccounts(isLoading))
        const data = response.data
        dispatch(fetchAccounts(data))
      })
    }
  }
}
