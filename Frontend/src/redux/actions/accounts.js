import axios from "axios";
import { showAlert } from "./AlertMessages";
import {
  ADD_ACCOUNT,
  ADD_ACCOUNT_LOADING,
  DELETE_ACCOUNT,
  EDIT_ACCOUNT,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_LOADING,
} from "./actionTypes";

const baseUrl = "http://localhost:5000/api/accounts";

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

    return (dispatch) => {
      if (isLoading) {
        dispatch(createAccountLoading(isLoading));
      }

      return axios
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
      firstName: account.firstName,
      secondName: account.secondName,
      lastName: account.lastName,
    },
  };
};

export const updateAccount = (dispatch, data) => {
  const id = data.id;
  const putData = {
    id: data.id,
    firstName: data.firstName,
    secondName: data.secondName,
    lastName: data.lastName,
  };
  return axios
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
  return (dispatch) => {
    return axios
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

  return (dispatch) => {
    if (isLoading) {
      dispatch(fetchAllAccountsLoading(isLoading));
    }

    return axios
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
