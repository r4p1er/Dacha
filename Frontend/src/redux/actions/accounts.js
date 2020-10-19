import axios from "axios";
import { showAlert } from "./AlertMessages";
import apiUrl from "../../utils/api";
import {
  ADD_ACCOUNT,
  ADD_ACCOUNT_LOADING,
  DELETE_ACCOUNT,
  EDIT_ACCOUNT,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_LOADING,
} from "./actionTypes";

const baseUrl = `${apiUrl}/accounts`;

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
        dispatch(createAccountLoading(isLoading));
      }

      return await axios
        .post(baseUrl, data)
        .then((response) => {
          const id = response.data.id;

          return axios
            .get(`${baseUrl}/${id}`)
            .then((response) => {
              isLoading = false;
              dispatch(createAccountLoading(isLoading));
              dispatch(createAccountSuccess(response.data));
            })
            .catch((error) => {
              isLoading = false;
              dispatch(createAccountLoading(isLoading));
              dispatch(showAlert("Упс, что-то пошло не так"));
            });
        })
        .catch((error) => {
          dispatch(showAlert("Упс, что-то пошло не так"));
        });
    };
  }
};

export const createAccountSuccess = (account) => {
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

export const createAccountLoading = (isLoading) => {
  return {
    type: ADD_ACCOUNT_LOADING,
    payload: isLoading,
  };
};

export const updateAccountSuccess = (account) => {
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
        })
        .catch((error) => {
          dispatch(showAlert("Упс, что-то пошло не так"));
        });
    })
    .catch((error) => {
      dispatch(showAlert("Упс, что-то пошло не так"));
    });
};

export const deleteAccount = (id) => {
  return async (dispatch) => {
    return await axios
      .delete(`${baseUrl}/${id}`)
      .then(() => {
        dispatch(deleteAccountSuccess(id));
      })
      .catch((error) => {
        dispatch(showAlert("Упс, что-то пошло не так"));
      });
  };
};

export const deleteAccountSuccess = (id) => {
  return {
    type: DELETE_ACCOUNT,
    payload: {
      id: id,
    },
  };
};

export const fetchAccountsSuccess = (accounts) => {
  return {
    type: FETCH_ACCOUNTS,
    payload: accounts,
  };
};

const fetchAllAccountsLoading = (isLoading) => {
  return {
    type: FETCH_ACCOUNTS_LOADING,
    payload: isLoading,
  };
};

export const fetchAllAccounts = () => {
  let isLoading = true;

  return async (dispatch) => {
    if (isLoading) {
      dispatch(fetchAllAccountsLoading(isLoading));
    }

    return await axios
      .get(baseUrl)
      .then((response) => {
        isLoading = false;
        dispatch(fetchAllAccountsLoading(isLoading));
        const data = response.data;
        dispatch(fetchAccountsSuccess(data));
      })
      .catch((error) => {
        isLoading = false;
        dispatch(fetchAllAccountsLoading(isLoading));
        dispatch(showAlert("Упс, что-то пошло не так"));
      });
  };
};
