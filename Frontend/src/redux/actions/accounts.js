import axios from "axios";
import { apiUrl } from "../../utils/api";
import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  EDIT_ACCOUNT,
  FETCH_ACCOUNTS,
  ACCOUNTS_LOADING,
} from "./actionTypes";

const baseUrl = `${apiUrl}/accounts`;

const accountsLoading = (isLoading) => {
  return {
    type: ACCOUNTS_LOADING,
    payload: isLoading,
  };
};

const createAccountSuccess = (account) => {
  return {
    type: ADD_ACCOUNT,
    payload: {
      id: account.id,
      login: account.login,
      lastName: account.lastName,
      name: account.name,
      middleName: account.middleName,
      place: account.place,
      roleId: account.roleId,
    },
  };
};

const updateAccountSuccess = (account) => {
  return {
    type: EDIT_ACCOUNT,
    payload: {
      id: account.id,
      name: account.name,
      middleName: account.middleName,
      lastName: account.lastName,
      place: account.place,
      roleId: account.roleId,
    },
  };
};

const deleteAccountSuccess = (id) => {
  return {
    type: DELETE_ACCOUNT,
    payload: {
      id: id,
    },
  };
};

const fetchAccountsSuccess = (accounts) => {
  return {
    type: FETCH_ACCOUNTS,
    payload: accounts,
  };
};

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
    };

    return (dispatch) => {
      updateAccount(dispatch, data);
    };
  } else {
    const data = {
      login: account.login,
      password: account.password,
      lastName: account.lastName,
      name: account.name,
      middleName: account.middleName,
      place: account.place,
      roleId: account.roleId,
    };
    let isLoading = true;

    return async (dispatch) => {
      if (isLoading) {
        dispatch(accountsLoading(isLoading));
      }

      return await axios
      .post(baseUrl, data)
      .then((response) => {
        const id = response.data.id;

        return axios
        .get(`${baseUrl}/${id}`)
        .then((response) => {
          isLoading = false;
          dispatch(accountsLoading(isLoading));
          dispatch(createAccountSuccess(response.data));
        });
      });
    };
  }
};

export const updateAccount = async (dispatch, data) => {
  const id = data.id;
  const putData = {
    id: data.id,
    login: data.login,
    password: data.password,
    lastName: data.lastName,
    name: data.name,
    middleName: data.middleName,
    place: data.place,
    roleId: data.roleId,
  };
  return await axios
  .put(`${baseUrl}/${id}`, putData)
  .then((response) => {
    return axios
    .get(`${baseUrl}/${id}`)
    .then((response) => {
      dispatch(updateAccountSuccess(response.data));
    });
  });
};

export const deleteAccount = (id) => {
  return async (dispatch) => {
    return await axios
    .delete(`${baseUrl}/${id}`)
    .then(() => {
      dispatch(deleteAccountSuccess(id));
    });
  };
};

export const fetchAllAccounts = () => {
  let isLoading = true;

  return async (dispatch) => {
    if (isLoading) {
      dispatch(accountsLoading(isLoading));
    }

    return await axios
      .get(baseUrl)
      .then((response) => {
        isLoading = false;
        dispatch(accountsLoading(isLoading));
        const data = response.data;
        dispatch(fetchAccountsSuccess(data));
      })
      .catch((error) => {
        isLoading = false;
        dispatch(accountsLoading(isLoading));
      });
  };
};
